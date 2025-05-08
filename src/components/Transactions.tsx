'use client';

import React, { useState, useEffect } from 'react';

const supabaseUrl = 'https://npgojsqtobjizdbcxwgq.supabase.co'; const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZ29qc3F0b2JqaXpkYmN4d2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MzUzNDQsImV4cCI6MjA2MTIxMTM0NH0.gDuHb9s-aIg8qs3b8cpkACOTjihEJddpJTTLkFSkS_Y'; const etherscanApiKey = 'CXTB4IUT31N836G93ZI3YQBEWBQEGGH5QS';

const Transaction: React.FC = () => { const [walletAddress, setWalletAddress] = useState(''); const [lastRequestTime, setLastRequestTime] = useState<string | null>(null); const [transactions, setTransactions] = useState<any[]>([]); const [error, setError] = useState<string | null>(null);

useEffect(() => { if (walletAddress) { fetchLastRequest(walletAddress); fetchEtherscanTx(walletAddress); } }, [walletAddress]);

const fetchLastRequest = async (address: string) => { try { const response = await fetch( ${supabaseUrl}/rest/v1/wallets?select=created_at&wallet_address=eq.${address}, { headers: { apikey: supabaseKey, Authorization: Bearer ${supabaseKey}, }, } );

const data = await response.json();
  if (Array.isArray(data) && data.length > 0) {
    setLastRequestTime(data[0].created_at);
  } else {
    setLastRequestTime(null);
  }
} catch (err) {
  console.error('Error fetching last request data:', err);
}

};

const fetchEtherscanTx = async (address: string) => { try { const res = await fetch( https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${etherscanApiKey} ); const json = await res.json(); if (json.status === '1') { setTransactions(json.result); } } catch (err) { console.error('Error fetching transactions:', err); } };

return ( <div className="p-4"> <input type="text" placeholder="Enter wallet address" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" />

{lastRequestTime && (
    <p className="mb-2">Last Faucet Request: {new Date(lastRequestTime).toLocaleString()}</p>
  )}

  {transactions.length > 0 && (
    <div>
      <h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
      <ul>
        {transactions.slice(0, 5).map((tx) => (
          <li key={tx.hash} className="mb-1">
            <a
              href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {tx.hash.slice(0, 30)}...
            </a>{' '}
            - {new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

); };

export default Transaction;

