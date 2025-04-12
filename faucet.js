async function requestEth() {
  const address = document.getElementById("walletAddress").value;
  const status = document.getElementById("status");

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
    } else {
      status.textContent = `Error: ${data.message}`;
    }
  } catch (err) {
    status.textContent = "Failed to request ETH.";
  }
}