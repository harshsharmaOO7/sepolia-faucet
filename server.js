import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { JsonRpcProvider, Wallet, isAddress, parseEther } from 'ethers';
import rateLimit from 'express-rate-limit';

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  await dotenv.config();
}

// Create Express app
const app = express();

// Debug environment variables
console.log("🟢 SUPABASE_URL:", process.env.SUPABASE_URL ? "loaded" : "❌ missing");
console.log("🟢 SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY ? "loaded" : "❌ missing");
console.log("🟢 RPC_URL:", process.env.RPC_URL ? "loaded" : "❌ missing");
console.log("🟢 PRIVATE_KEY:", process.env.PRIVATE_KEY ? "loaded" : "❌ missing");

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// 🔁 Redirect www to non-www
app.use((req, res, next) => {
  const host = req.headers.host;
  if (host && host.startsWith('www.')) {
    const newHost = host.replace(/^www\./, '');
    return res.redirect(301, `https://${newHost}${req.url}`);
  }
  next();
});

// 📄 Serve sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

// 📁 Serve static frontend and parse JSON
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// ⚙️ Ethereum provider and faucet wallet
const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

// 🚫 Rate limiting per IP (3 requests per 24 hours)
const faucetLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  keyGenerator: (req) => {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  },
  message: {
    success: false,
    message: 'Too many requests from this IP. Try again in 24 hours.'
  }
});
app.use('/send', faucetLimiter);

// 🚀 POST /send (Send ETH to a wallet)
app.post('/send', async (req, res) => {
  const { address } = req.body;

  if (!isAddress(address)) {
    return res.status(400).json({ success: false, message: 'Invalid Ethereum address.' });
  }

  try {
    const balance = await provider.getBalance(wallet.address);
    if (balance.lt(parseEther('0.1'))) {
      return res.status(503).json({ success: false, message: 'Faucet is low on funds. Please try later.' });
    }

    const { data: previous, error } = await supabase
      .from('wallets')
      .select('created_at')
      .eq('wallet_address', address)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('🛑 Supabase SELECT error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }

    if (previous?.length > 0) {
      const lastRequestTime = new Date(previous[0].created_at);
      const now = new Date();
      const hoursPassed = (now - lastRequestTime) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        return res.status(429).json({
          success: false,
          message: 'You can only request once every 24 hours.'
        });
      }
    }

    const tx = await wallet.sendTransaction({
      to: address,
      value: parseEther('0.05'),
    });

    const { error: insertError } = await supabase
      .from('wallets')
      .insert([{ wallet_address: address, tx_hash: tx.hash }]);

    if (insertError) {
      console.error('🛑 Supabase INSERT error:', insertError);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('🛑 Transaction error:', err);
    res.status(500).json({ success: false, message: 'Transaction failed.' });
  }
});

// 📦 GET /api/transactions (Recent faucet transactions)
app.get('/api/transactions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('wallet_address, tx_hash, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('🛑 Supabase fetch error:', error);
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
    console.error('🛑 Fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to load transactions.' });
  }
});

// 🌐 Serve frontend entry point
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ⚠️ 404 fallback
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// 🟢 Start the server
app.listen(PORT, () => {
  console.log(`✅ Faucet server running at http://localhost:${PORT}`);
});
