import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { JsonRpcProvider, Wallet, isAddress, parseEther } from 'ethers';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit'; // NEW

dotenv.config();

const app = express();

// Redirect www to non-www
app.use((req, res, next) => {
  const host = req.headers.host;
  if (host.startsWith('www.')) {
    const newHost = host.replace(/^www\./, '');
    return res.redirect(301, `https://${newHost}${req.url}`);
  }
  next();
});

const PORT = process.env.PORT || 3000;

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Serve static files from dist/
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// Setup Ethers wallet
const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

// NEW: Rate limit - max 3 requests per IP per 24 hours
const faucetLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  },
  message: { success: false, message: 'Too many requests from this IP. Try again in 24 hours.' }
});
app.use('/send', faucetLimiter);

// POST /send => Send Sepolia ETH
app.post('/send', async (req, res) => {
  const { address } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // NEW

  if (!isAddress(address)) {
    return res.status(400).json({ success: false, message: 'Invalid Ethereum address.' });
  }

  try {
    // NEW: Check faucet balance
    const balance = await wallet.getBalance();
    if (balance.lt(parseEther('0.1'))) {
      return res.status(503).json({ success: false, message: 'Faucet is low on funds. Please try later.' });
    }

    // Check if this address already requested in last 24 hours
    const { data: previous, error } = await supabase
      .from('wallets')
      .select('created_at')
      .eq('wallet_address', address)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Supabase select error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }

    if (previous && previous.length > 0) {
      const lastRequestTime = new Date(previous[0].created_at);
      const now = new Date();
      const hoursPassed = (now.getTime() - lastRequestTime.getTime()) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        return res.status(429).json({ success: false, message: 'You can only request once every 24 hours.' });
      }
    }

    // Send 0.05 Sepolia ETH
    const tx = await wallet.sendTransaction({
      to: address,
      value: parseEther('0.05'),
    });

    // Save request to Supabase
    const { error: insertError } = await supabase
      .from('wallets')
      .insert([{
        wallet_address: address,
        tx_hash: tx.hash,
        ip_address: ip // NEW: Log IP
      }]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('Transaction error:', err);
    res.status(500).json({ success: false, message: 'Transaction failed.' });
  }
});

// GET /api/transactions => Fetch recent 10 transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('wallet_address, tx_hash, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Supabase fetch error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }

    const transactions = data.map((tx) => ({
      id: tx.tx_hash,
      address: tx.wallet_address,
      amount: '0.05 ETH',
      timestamp: new Date(tx.created_at).toLocaleString(),
      txHash: tx.tx_hash,
    }));

    res.json(transactions);
  } catch (err) {
    console.error('Transaction fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to load transactions.' });
  }
});

// Serve frontend for root/index
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 404 fallback
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Faucet server running at http://localhost:${PORT}`);
});
