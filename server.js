
const express = require('express');
const { ethers } = require('ethers');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// JSON body parser
app.use(express.json());

// Serve static files from the dist directory (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Faucet endpoint
app.post('/api/claim', async (req, res) => {
  const { address } = req.body;
  
  // Validate Ethereum address
  if (!ethers.isAddress(address)) {
    return res.status(400).json({ 
      success: false, 
      message: "Invalid Ethereum address" 
    });
  }

  // This is where you would implement the actual ETH sending logic
  // For security reasons, we're not implementing it directly in the server code
  // You should use environment variables or a secure key management service
  res.status(501).json({ 
    success: false, 
    message: "Faucet functionality requires secure configuration. Please set up private keys securely." 
  });
});

// For any request that doesn't match a static file or API route, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
-
