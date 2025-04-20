const express = require('express');
const path = require('path');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve built frontend (React output from Vite)
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

// Faucet logic
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

app.post('/send', async (req, res) => {
  const { address } = req.body;

  if (!ethers.isAddress(address)) {
    return res.status(400).json({ success: false, message: 'Invalid address' });
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

// For frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Faucet server running at http://localhost:${PORT}`);
});
