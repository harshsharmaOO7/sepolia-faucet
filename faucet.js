async function requestEth() {
  const address = document.getElementById("walletaddress").value;
  const status = document.getElementById("status");

  // Check if the wallet address has a cooldown
  const lastRequestTime = localStorage.getItem(address);
  const now = Date.now();
  
  if (lastRequestTime) {
    const cooldownTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if (now - lastRequestTime < cooldownTime) {
      const remainingTime = cooldownTime - (now - lastRequestTime);
      status.textContent = `You can request again in ${Math.ceil(remainingTime / (1000 * 60))} minutes.`;
      return;
    }
  }

  status.textContent = "Sending request...";

  try {
    const res = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address }),
    });

    const data = await res.json();
    if (data.success) {
      status.textContent = `Success! Tx Hash: ${data.txHash}`;
      
      // Store the current time as the last request time for this wallet
      localStorage.setItem(address, now);
    } else {
      status.textContent = `Error: ${data.message}`;
    }
  } catch (err) {
    status.textContent = "Failed to request ETH.";
  }
}
