
import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  id: string;
  address: string;
  amount: string;
  timestamp: string;
  txHash: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Replace with your API endpoint
        const res = await fetch('https://sepolia-faucet-ki2h.onrender.com/api/recent');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
    
    // Optional: Set up polling to refresh transactions periodically
    const interval = setInterval(fetchTransactions, 30000); // every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading transactions...</div>;
  }

  return (
    <section id="transactions" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Recent <span className="gradient-text">Transactions</span>
        </h2>
        
        <div className="rounded-lg border border-border/60 bg-card/95 backdrop-blur-sm shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-right">Transaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono">{tx.address}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell>{tx.timestamp}</TableCell>
                    <TableCell className="text-right">
                      <a
                        href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                      >
                        {tx.txHash.substring(0, 6)}...{tx.txHash.substring(tx.txHash.length - 4)}
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <a 
            href="https://sepolia.etherscan.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 text-sm inline-flex items-center transition-colors"
          >
            View all transactions on Etherscan
            <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
