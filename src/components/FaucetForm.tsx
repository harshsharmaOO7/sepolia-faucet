
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

    try {
      setIsLoading(true);
      
      // Replace this with your API endpoint
     const response = await fetch('https://sepolia-faucet-ki2h.onrender.com/api/claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to request ETH');
      }

      toast({
        title: "Success!",
        description: "Your request has been processed successfully",
      });
      
      setAddress('');
      setCaptchaVerified(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to request ETH",
        variant: "destructive",
      });
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
            <div className="flex items-start space-x-2">
              <Checkbox
                id="captcha" 
                checked={captchaVerified}
                onCheckedChange={(checked) => {
                  if (checked) {
                    // Simulate CAPTCHA verification
                    setTimeout(() => setCaptchaVerified(true), 500);
                  } else {
                    setCaptchaVerified(false);
                  }
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="captcha"
                  className="text-sm font-medium leading-none"
                >
                  I'm not a robot
                </label>
                <p className="text-xs text-muted-foreground">
                  Complete verification to prevent abuse
                </p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={handleSubmit}
          disabled={isLoading}
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
