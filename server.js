import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
import { JsonRpcProvider, Wallet, isAddress, parseEther } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

// Setup __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve built frontend (React output from Vite)
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// Faucet logic
const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);

app.post('/send', async (req, res) => {
  const { address } = req.body;

  // Validate address using ethers v6 (for ethers v5, use ethers.utils.isAddress())
  if (!isAddress(address)) {
    return res.status(400).json({ success: false, message: 'Invalid address' });
  }

  try {
    const tx = await wallet.sendTransaction({
      to: address,
      value: parseEther("0.05") // Ensure you are using ethers.v6 or update for ethers.v5
    });

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error("Transaction Error: ", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// For frontend routing (catch-all)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Faucet server running at http://localhost:${PORT}`);
});
