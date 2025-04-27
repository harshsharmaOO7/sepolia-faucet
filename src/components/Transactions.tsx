import React, { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Transaction {
  wallet_address: string;
  tx_hash: string;
  created_at: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const ETHERSCAN_API_KEY = 'S11IK519NV1693XP5HGCBGY93QFHRF1VIB';  // Your Etherscan API Key
  const walletAddress = '0xFB25f3A16b44527157519C3C782616869842E085'; // Updated wallet address

  const fetchTransactions = async () => {
    try {
      setIsRefreshing(true);
      
      // Fetch the transactions using Etherscan's txlist API
      const response = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`);
      
      const data = await response.json();
      console.log('Fetched Data:', data);

      if (data.status === "1" && Array.isArray(data.result)) {
        // Map the data into the format you need
        const formattedTransactions = data.result.map((tx: any) => ({
          wallet_address: tx.from, 
          tx_hash: tx.hash,
          created_at: new Date(Number(tx.timeStamp) * 1000).toLocaleString(),
        }));
        
        setTransactions(formattedTransactions);
        setIsLoading(false);
      } else {
        throw new Error('Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: "Error",
        description: "Could not load recent transactions",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 30000);  // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchTransactions();
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-border/60 bg-card/95 backdrop-blur-sm shadow-md p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 w-32 bg-muted rounded mb-4"></div>
          <div className="h-32 w-full max-w-xl bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <section id="transactions" className="py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold">
            Recent <span className="gradient-text">Transactions</span>
          </h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="gap-1"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        <div className="rounded-lg border border-border/60 bg-card/95 backdrop-blur-sm shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            {transactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Transaction</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">
                        {tx.wallet_address.substring(0, 6)}...{tx.wallet_address.slice(-4)}
                      </TableCell>
                      <TableCell>
                        {tx.created_at}
                      </TableCell>
                      <TableCell className="text-right">
                        <a
                          href={`https://sepolia.etherscan.io/tx/${tx.tx_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                          {tx.tx_hash.substring(0, 6)}...{tx.tx_hash.slice(-4)}
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">No transactions yet</div>
            )}
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
