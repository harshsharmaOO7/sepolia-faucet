import React, { useEffect, useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://npgojsqtobjizdbcxwgq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZ29qc3F0b2JqaXpkYmN4d2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MzUzNDQsImV4cCI6MjA2MTIxMTM0NH0.gDuHb9s-aIg8qs3b8cpkACOTjihEJddpJTTLkFSkS_Y'
);

interface Transaction {
  wallet_address: string;
  tx_hash: string;
  created_at: string;
  from: string;
  to: string;
  timeStamp: number;
  hash: string;
}

interface Props {
  walletAddress: string;
}

const Transactions: React.FC<Props> = ({ walletAddress }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const apiKey = 'S11IK519NV1693XP5HGCBGY93QFHRF1VIB';

  const fetchTransactions = async () => {
    try {
      setIsRefreshing(true);

      // Check last request from this wallet
      const { data: lastRequest, error } = await supabase
        .from('wallets')
        .select('created_at')
        .eq('wallet_address', walletAddress)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching last request:', error);
      } else if (lastRequest) {
        const lastRequestedAt = new Date(lastRequest.created_at);
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

      // Insert new request record
      const { error: insertError } = await supabase
        .from('wallets')
        .insert([{ wallet_address: walletAddress }]);

      if (insertError) {
        console.error('Error inserting new request:', insertError);
      }

      // Fetch outgoing transactions
      const response = await fetch(`https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`);
      const dataTx = await response.json();

      if (dataTx.status === '1' && Array.isArray(dataTx.result)) {
        const filteredTransactions = dataTx.result
          .filter((tx: any) => tx.from.toLowerCase() === walletAddress.toLowerCase())
          .slice(0, 5);
        setTransactions(filteredTransactions);
      } else {
        throw new Error(dataTx.message || 'No transactions found');
      }

      toast({
        title: "Success",
        description: "Transactions loaded",
      });

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
  }, [walletAddress]);

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
                        {`${tx.to.substring(0, 6)}...${tx.to.slice(-4)}`}
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
