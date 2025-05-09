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
  from: string;
  to: string;
  timeStamp: number;
  hash: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { toast } = useToast();

  const walletAddress = '0xB27AAc3e5DA5317FE6E06B7f019413719c6FC051'.toLowerCase();
  const apiKey = 'S11IK519NV1693XP5HGCBGY93QFHRF1VIB';

  const fetchTransactions = async () => {
    try {
      setIsRefreshing(true);

      const { data: lastRequest, error } = await supabase
        .from('wallets')
        .select('created_at')
        .eq('wallet_address', walletAddress)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error:', error);
      }

      // Check if the last request is within 24 hours
      if (lastRequest) {
        const lastTime = new Date(lastRequest.created_at);
        const now = new Date();
        const diffInHours = (now.getTime() - lastTime.getTime()) / (1000 * 3600);

        // If it's within 24 hours, disable the button and show the toast
        if (diffInHours < 24) {
          setIsButtonDisabled(true);
          toast({
            title: "Limit Reached",
            description: "You can only request once every 24 hours. Please try again later.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }

      // Fetch transactions if 24 hours have passed or if it's the first request
      const res = await fetch(
        `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`
      );
      const data = await res.json();

      if (data.status === '1' && Array.isArray(data.result)) {
        // Filter for outgoing transactions only
        const outgoingTx = data.result.filter((tx: Transaction) => tx.from.toLowerCase() === walletAddress);
        setTransactions(outgoingTx.slice(0, 5)); // limit to 5
      } else {
        throw new Error(data.message || 'No transactions found');
      }

      toast({ title: "Success", description: "Transactions loaded." });
    } catch (err) {
      console.error('TX error:', err);
      toast({
        title: "Error",
        description: "Could not load transactions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

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
            onClick={fetchTransactions}
            disabled={isRefreshing || isButtonDisabled}
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
                    <TableHead>To</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Hash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx, i) => (
                    <TableRow key={i}>
                      <TableCell>{tx.to.slice(0, 6)}...{tx.to.slice(-4)}</TableCell>
                      <TableCell>{new Date(tx.timeStamp * 1000).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <a 
                          href={`https://sepolia.etherscan.io/tx/${tx.hash}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center text-primary hover:text-primary/80"
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
              <div className="text-center py-8">No outgoing transactions found</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
