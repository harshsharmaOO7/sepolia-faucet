import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { JsonRpcProvider, Wallet, isAddress, parseUnits } from 'ethers';

// Load environment variables in development
if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv');
  await dotenv.config();
}

console.log("🟢 SUPABASE_URL:", process.env.SUPABASE_URL ? "loaded" : "❌ missing");
console.log("🟢 SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY ? "loaded" : "❌ missing");
console.log("🟢 RPC_URL:", process.env.RPC_URL ? "loaded" : "❌ missing");
console.log("🟢 PRIVATE_KEY:", process.env.PRIVATE_KEY ? "loaded" : "❌ missing");

const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
const app = express();

app.use(compression());
app.use(express.json());

// Redirect www to non-www
app.use((req, res, next) => {
  const host = req.headers.host;
  if (host?.startsWith('www.')) {
    return res.redirect(301, `https://${host.slice(4)}${req.url}`);
  }
  next();
});

// Serve sitemap
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

// Cache static assets for 30 days
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=2592000'); // 30 days
    }
  }
}));

const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

// POST /send
app.post('/send', async (req, res) => {
  const { address } = req.body;
  const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  if (!isAddress(address)) {
    return res.status(400).json({ success: false, message: 'Invalid Ethereum address.' });
  }

  try {
    const balance = await provider.getBalance(wallet.address);
    if (balance < parseUnits('0.05', 'ether')) {
      return res.status(503).json({ success: false, message: 'Faucet is low on funds. Try later.' });
    }

    // Wallet check
    const { data: walletCheck, error: walletError } = await supabase
      .from('wallets')
      .select('created_at')
      .eq('wallet_address', address)
      .order('created_at', { ascending: false })
      .limit(1);

    if (walletError) {
      console.error('🛑 Supabase SELECT (wallet) error:', walletError);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }

    if (walletCheck?.length) {
      const hoursPassed = (Date.now() - new Date(walletCheck[0].created_at).getTime()) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        return res.status(429).json({ success: false, message: 'You can only request once every 24 hours per wallet.' });
      }
    }

    // IP check
    const { data: ipCheck, error: ipError } = await supabase
      .from('wallets')
      .select('created_at')
      .eq('ip_address', ipAddress)
      .order('created_at', { ascending: false })
      .limit(1);

    if (ipError) {
      console.error('🛑 Supabase SELECT (IP) error:', ipError);
      return res.status(500).json({ success: false, message: 'Database error.' });
    }

    if (ipCheck?.length) {
      const hoursPassed = (Date.now() - new Date(ipCheck[0].created_at).getTime()) / (1000 * 60 * 60);
      if (hoursPassed < 24) {
        return res.status(429).json({ success: false, message: 'You can only request once every 24 hours per IP.' });
      }
    }

    // Send ETH
    const tx = await wallet.sendTransaction({ to: address, value: parseUnits('0.05', 'ether') });

    const { error: insertError } = await supabase
      .from('wallets')
      .insert([{ wallet_address: address, tx_hash: tx.hash, ip_address: ipAddress }]);

    if (insertError) {
      console.error('🛑 Supabase INSERT error:', insertError);
      return res.status(500).json({ success: false, message: 'Database write error.' });
    }

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('🛑 Transaction error:', err);
    res.status(500).json({ success: false, message: 'Transaction failed.' });
  }
});

// GET /api/transactions
app.get('/api/transactions', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('wallet_address, tx_hash, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('🛑 Supabase fetch error:', error);
      return res.status(500).json({ success: false, message: 'Database error.' });
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

// Serve ads.txt
app.get('/ads.txt', (req, res) => {
  res.type('text/plain');
  res.send('google.com, pub-1003334895524660, DIRECT, f08c47fec0942fa0');
});

// Serve index.html for React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
// Serve index.html for React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Faucet server running on http://localhost:${PORT}`);
});
