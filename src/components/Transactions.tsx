// transaction.tsx

'use client';

import React, { useState, useEffect } from 'react';

const supabaseUrl = 'https://npgojsqtobjizdbcxwgq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZ29qc3F0b2JqaXpkYmN4d2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MzUzNDQsImV4cCI6MjA2MTIxMTM0NH0.gDuHb9s-aIg8qs3b8cpkACOTjihEJddpJTTLkFSkS_Y';

const etherscanApiKey = 'CXTB4IUT31N836G93ZI3YQBEWBQEGGH5QS';

const Transaction: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [lastRequestTime, setLastRequestTime] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchLastRequestTime = async (wallet: string) => {
    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/wallets?select=created_at&wallet_address=eq.${wallet}`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        }
      );

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setLastRequestTime(data[0].created_at);
      } else {
        setLastRequestTime('No previous request found');
      }
    } catch (err) {
      setError('Failed to fetch last request time');
    }
  };

  const fetchTransactions = async (wallet: string) => {
    try {
      const response = await fetch(
        `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanApiKey}`
      );
      const data = await response.json();

      if (data.status === '1') {
        setTransactions(data.result.slice(0, 5)); // limit to 5 recent transactions
      } else {
        setError('Failed to fetch transactions');
      }
    } catch (err) {
      setError('Failed to fetch transactions');
    }
  };

  const handleSearch = async () => {
    setError(null);
    setLastRequestTime(null);
    setTransactions([]);

    if (!walletAddress) {
      setError('Please enter a wallet address');
      return;
    }

    await fetchLastRequestTime(walletAddress);
    await fetchTransactions(walletAddress);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Wallet Activity</h1>

      <input
        type="text"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        placeholder="Enter Wallet Address"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check Activity
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {lastRequestTime && (
        <div className="mt-4">
          <h2 className="font-semibold">Last Faucet Request:</h2>
          <p>{new Date(lastRequestTime).toLocaleString()}</p>
        </div>
      )}

      {transactions.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold">Recent Transactions:</h2>
          <ul className="list-disc ml-5">
            {transactions.map((tx) => (
              <li key={tx.hash}>
                <a
                  href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {tx.hash.slice(0, 20)}...
                </a>{' '}
                — {new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Transaction;
