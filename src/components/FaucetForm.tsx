import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FaucetForm = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { toast } = useToast();

  // Function to check last request time for an address
  const checkLastRequest = (address: string) => {
    const lastRequest = localStorage.getItem(address);
    if (lastRequest) {
      const lastTime = parseInt(lastRequest, 10);
      const now = Date.now();
      const diff = now - lastTime;
      if (diff < 86400000) { // 24 hours = 86400000 ms
        const secondsLeft = Math.floor((86400000 - diff) / 1000);
        return secondsLeft;
      }
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      toast({
        title: "Error",
        description: "Please enter a valid Ethereum address",
        variant: "destructive",
      });
      return;
    }

    if (!captchaVerified) {
      toast({
        title: "Error",
        description: "Please complete the CAPTCHA verification",
        variant: "destructive",
      });
      return;
    }

    const timeLeft = checkLastRequest(address);
    if (timeLeft > 0) {
      const minutes = Math.floor(timeLeft / 60);
      toast({
        title: "Warning",
        description: `Already requested! Try again in ${minutes} minutes.`,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();

      // Handle faucet empty notification
      if (data.faucetEmpty) {
        toast({
          title: "Faucet Empty",
          description: "The faucet is currently empty. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      // Handle same IP within 24 hours
      if (data.sameIP) {
        toast({
          title: "Warning",
          description: "You have already requested ETH from this IP. Please wait 24 hours before requesting again.",
          variant: "destructive",
        });
        return;
      }

      // Handle invalid Ethereum address format
      if (data.invalidAddress) {
        toast({
          title: "Error",
          description: "The Ethereum address format is invalid. Please check and try again.",
          variant: "destructive",
        });
        return;
      }

      // Handle success and store the request time
      if (data.success) {
        localStorage.setItem(address, Date.now().toString());
        toast({
          title: "Success!",
          description: `Transaction sent! TX Hash: ${data.txHash}`,
        });
        setAddress('');
        setCaptchaVerified(false);
      } else {
        throw new Error(data.message || "Transaction failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
      console.error('Faucet error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl border border-border/60 bg-card/95 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-center">
          Request Sepolia ETH
        </CardTitle>
        <CardDescription className="text-center">
          Get up to 0.05 ETH every 24 hours for testing
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="wallet-address" className="text-sm font-medium">
              Ethereum Wallet Address
            </label>
            <Input
              id="wallet-address"
              placeholder="0x..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-background/50 border-border/60 focus:border-primary"
              spellCheck={false}
              required
            />
          </div>

          <div className="p-4 bg-secondary/40 rounded-md border border-border/60">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="captcha"
                checked={captchaVerified}
                disabled={isLoading}
                onCheckedChange={(checked) => {
                  setCaptchaVerified(!!checked);
                }}
                aria-label="Checkbox to confirm CAPTCHA"
              />
              <span className="text-sm font-medium leading-none">I'm not a robot</span>
              {isLoading && !captchaVerified && (
                <span className="text-xs text-muted-foreground ml-2">Verifying...</span>
              )}
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={handleSubmit}
          disabled={isLoading || !captchaVerified || !address}
          aria-label="Request 0.05 Sepolia ETH"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Request 0.05 Sepolia ETH"
          )}
        </Button>
      </CardFooter>

      <div className="px-6 pb-6">
        <div className="flex items-center justify-center text-xs text-muted-foreground gap-1 mt-2">
          <AlertCircle size={12} />
          <span>Limited to 1 request per wallet every 24 hours</span>
        </div>
      </div>
    </Card>
  );
};

export default FaucetForm;
