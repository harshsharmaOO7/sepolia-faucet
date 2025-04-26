import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { JsonRpcProvider, Wallet, isAddress, parseEther } from 'ethers';
import { createClient } from '@supabase/supabase-js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Setup __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend from Vite's build output
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Faucet logic
const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

// Endpoint to send Sepolia ETH
app.post('/send', async (req, res) => {
  const { address } = req.body;

  if (!isAddress(address)) {
    return res.status(400).json({ success: false, message: 'Invalid Ethereum address' });
  }

  // Step 1: Check recent requests from this address
  const { data, error } = await supabase
    .from('wallets')
    .select('created_at')
    .eq('wallet_address', address)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ success: false, message: 'Database error' });
  }

  if (data.length > 0) {
    const lastRequestTime = new Date(data[0].created_at);
    const now = new Date();
    const hoursSinceLastRequest = (now - lastRequestTime) / (1000 * 60 * 60);

    if (hoursSinceLastRequest < 24) {
      return res.status(429).json({
        success: false,
        message: 'You can only request once every 24 hours.',
      });
    }
  }

  // Step 2: Send ETH
  try {
    const tx = await wallet.sendTransaction({
      to: address,
      value: parseEther("0.05")
    });

    // Step 3: Store request in Supabase
    await supabase.from('wallets').insert([
      { wallet_address: address }
    ]);

    return res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("Transaction Error: ", err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Serve frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Faucet server running at http://localhost:${PORT}`);
});
