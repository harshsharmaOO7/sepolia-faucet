
import React from 'react';
import { ExternalLink } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock transaction data
const transactions = [
  {
    id: '0x1a2b3c4d5e6f7g8h9i0j',
    address: '0x1234...5678',
    amount: '0.05 ETH',
    timestamp: '2 mins ago',
    txHash: '0xabcd...ef12'
  },
  {
    id: '0x2b3c4d5e6f7g8h9i0j1a',
    address: '0x2345...6789',
    amount: '0.05 ETH',
    timestamp: '15 mins ago',
    txHash: '0xbcde...f123'
  },
  {
    id: '0x3c4d5e6f7g8h9i0j1a2b',
    address: '0x3456...7890',
    amount: '0.05 ETH',
    timestamp: '32 mins ago',
    txHash: '0xcdef...1234'
  },
  {
    id: '0x4d5e6f7g8h9i0j1a2b3c',
    address: '0x4567...8901',
    amount: '0.05 ETH',
    timestamp: '1 hour ago',
    txHash: '0xdefg...2345'
  },
  {
    id: '0x5e6f7g8h9i0j1a2b3c4d',
    address: '0x5678...9012',
    amount: '0.05 ETH',
    timestamp: '3 hours ago',
    txHash: '0xefgh...3456'
  }
];

const Transactions = () => {
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
