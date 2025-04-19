const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// JSON body parser
app.use(express.json());

// ✅ Serve static files from dist (Vite frontend build output)
app.use(express.static(__dirname));

// ✅ Faucet config (RPC + private key)
const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/48b1a4de8f8748e888ab17b21df90dbb");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ✅ Faucet endpoint
app.post('/send', async (req, res) => {
  const { address } = req.body;

  if (!ethers.isAddress(address)) {
    return res.status(400).json({ success: false, message: "Invalid address" });
  }

  try {
    const tx = await wallet.sendTransaction({
      to: address,
      value: ethers.parseEther("0.05"),
    });

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Serve index.html for any other route (client-side routing fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

