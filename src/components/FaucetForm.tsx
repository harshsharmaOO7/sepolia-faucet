import React, { useState } from 'react';
import axios from 'axios';

const FaucetForm = () => {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!address) {
      setMessage('Please enter your wallet address');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post('/api/claim', { address });

      if (res.data && res.data.txHash) {
        setMessage(`✅ Claimed! TX: ${res.data.txHash}`);
      } else {
        setMessage(`❌ ${res.data.message || 'Failed to claim ETH'}`);
      }
    } catch (err: any) {
      setMessage(`❌ ${err.response?.data?.message || err.message}`);
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#121c2c] p-8 rounded-xl shadow-md max-w-md mx-auto text-white">
      <h2 className="text-xl font-semibold mb-3">Request Sepolia ETH</h2>
      <p className="text-sm mb-4">Get up to 0.05 ETH every 24 hours for testing</p>

      <input
        type="text"
        placeholder="0x..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-3 rounded-md text-black mb-4"
      />

      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          I'm not a robot
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-[#1abc9c] hover:bg-[#16a085] text-white py-2 px-4 rounded-lg w-full font-semibold"
      >
        {loading ? 'Claiming...' : 'Request 0.05 Sepolia ETH'}
      </button>

      {message && <p className="text-sm mt-4 text-center">{message}</p>}

      <p className="text-xs mt-2 text-gray-400 text-center">
        Limited to 1 request per wallet every 24 hours
      </p>
    </div>
  );
};

export default FaucetForm;
