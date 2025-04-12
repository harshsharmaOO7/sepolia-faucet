const express = require('express');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const PORT = 3000;
app.use(express.json());

const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

app.post('/send', async (req, res) => {
  const { address } = req.body;

  if (!ethers.isAddress(address)) {
    return res.json({ success: false, message: "Invalid address" });
  }

  try {
    const tx = await wallet.sendTransaction({
      to: address,
      value: ethers.parseEther("0.05"),
    });

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Faucet running on http://localhost:${PORT}`);
});