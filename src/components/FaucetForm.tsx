import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const checkLastRequest = (address: string) => {
    const lastRequest = localStorage.getItem(address);
    if (lastRequest) {
      const lastTime = parseInt(lastRequest, 10);
      const now = Date.now();
      const diff = now - lastTime;
      if (diff < 86400000) {
        const secondsLeft = Math.floor((86400000 - diff) / 1000);
        return secondsLeft;
      }
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      toast.error("Please enter a valid Ethereum address");
      return;
    }

    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification");
      return;
    }

    const timeLeft = checkLastRequest(address);
    if (timeLeft > 0) {
      const minutes = Math.floor(timeLeft / 60);
      toast.warning(`Already requested! Try again in ${minutes} minutes.`);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, recaptchaToken }),
      });

      const data = await response.json();

      if (data.faucetEmpty) {
        toast.error("The faucet is currently empty. Please try again later.");
        return;
      }

      if (data.sameIP) {
        toast.warning("You have already requested ETH from this IP. Please wait 24 hours.");
        return;
      }

      if (data.invalidAddress) {
        toast.error("The Ethereum address format is invalid.");
        return;
      }

      if (data.success) {
        localStorage.setItem(address, Date.now().toString());
        toast.success(`Transaction sent! TX Hash: ${data.txHash}`);
        setAddress('');
        setRecaptchaToken(null);
      } else {
        throw new Error(data.message || "Transaction failed");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
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

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LfUez8rAAAAAEPFQ7yJ84IB9hKq4apvdfdghyoz"
              onChange={(token) => setRecaptchaToken(token)}
              theme="light"
            />
          </div>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={handleSubmit}
          disabled={isLoading || !recaptchaToken || !address}
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
