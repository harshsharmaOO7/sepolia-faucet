import React, { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://npgojsqtobjizdbcxwgq.supabase.co', 'public-anon-key'); // Replace with your Supabase URL and key

interface Transaction {
  wallet_address: string;
  tx_hash: string;
  created_at: string;
  from: string;
  to: string;
  timeStamp: number;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  const walletAddress = '0xFB25f3A16b44527157519C3C782616869842E085'; // Your wallet address
  const apiKey = 'S11IK519NV1693XP5HGCBGY93QFHRF1VIB'; // Your Etherscan API key

  const fetchTransactions = async () => {
    try {
      setIsRefreshing(true);

      // Fetch wallet request timestamp from Supabase
      const { data, error } = await supabase
        .from('wallet_requests') // Your Supabase table name
        .select('last_requested_at')
        .eq('wallet_address', walletAddress)
        .single();

      if (error) {
        console.error('Error fetching last request data:', error);
      } else {
        // Check if the last request was within the last 24 hours
        const lastRequestedAt = new Date(data?.last_requested_at);
        const now = new Date();
        const diffInHours = (now.getTime() - lastRequestedAt.getTime()) / (1000 * 3600);

        if (diffInHours < 24) {
          toast({
            title: "Error",
            description: "You can only request once every 24 hours.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }

      // Fetch transaction history
      const response = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`);
      const dataTx = await response.json();
      console.log('Fetched Data:', dataTx);

      if (dataTx.status === '1' && Array.isArray(dataTx.result)) {
        // Filter only transactions where the wallet is the sender (outgoing transactions)
        const filteredTransactions = dataTx.result.filter((tx: any) =>
          tx.from.toLowerCase() === walletAddress.toLowerCase()) // Outgoing transactions
        .slice(0, 5);
        setTransactions(filteredTransactions);
      } else {
        throw new Error(dataTx.message || 'No transactions found');
      }

      setIsLoading(false);
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
    const interval = setInterval(fetchTransactions, 10000);
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
            Recent <span className="gradient-text">Outgoing Transactions</span>
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
                    <TableHead>Receiver Address</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Transaction Hash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">
                        {/* Display receiver address for outgoing transactions */}
                        {tx.to.toLowerCase() !== walletAddress.toLowerCase() 
                          ? `${tx.to.substring(0, 6)}...${tx.to.slice(-4)}`
                          : null 
                        }
                      </TableCell>
                      <TableCell>
                        {new Date(tx.timeStamp * 1000).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <a
                          href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                        >
                          {tx.hash}
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8">No outgoing transactions yet</div>
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
