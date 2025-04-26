import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { JsonRpcProvider, Wallet, isAddress, parseEther } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Serve static files (dist folder)
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// Faucet setup
const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

app.post('/send', async (req, res) => {
  const { address } = req.body;

  if (!isAddress(address)) {
    return res.status(400).json({ success: false, message: 'Invalid Ethereum address' });
  }

  try {
    // Check if this wallet has already requested in the last 24 hours
    const { data, error } = await supabase
      .from('wallets')
      .select('created_at')
      .eq('wallet_address', address)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error("Supabase select error:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (data && data.length > 0) {
      const lastRequestTime = new Date(data[0].created_at);
      const now = new Date();
      const timeDiff = (now.getTime() - lastRequestTime.getTime()) / (1000 * 60 * 60); // hours

      if (timeDiff < 24) {
        return res.status(429).json({ success: false, message: "You can request only once every 24 hours." });
      }
    }

    // Send ETH
    const tx = await wallet.sendTransaction({
      to: address,
      value: parseEther("0.05"),
    });

    // Save the request to Supabase
    const { error: insertError } = await supabase
      .from('wallets')
      .insert([{ wallet_address: address }]);

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("Transaction Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// For frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Faucet server running at http://localhost:${PORT}`);
});
