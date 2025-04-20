import React from "react";
import FaucetForm from "./components/FaucetForm"; // ✅ Import the actual component

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Sepolia Faucet</h1>
      <FaucetForm /> {/* ✅ Use the correct component */}
    </div>
  );
}

export default App;
