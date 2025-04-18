
import React from 'react';
import { Zap, Wallet, Clock, Check } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: "Enter Your Wallet Address",
    description: "Input your Ethereum wallet address where you want to receive testnet ETH."
  },
  {
    icon: Check,
    title: "Complete CAPTCHA",
    description: "Verify that you are a human to prevent automated abuse."
  },
  {
    icon: Zap,
    title: "Receive ETH",
    description: "Get 0.05 Sepolia ETH sent directly to your wallet within seconds."
  },
  {
    icon: Clock,
    title: "Wait 24 Hours",
    description: "Return after 24 hours if you need more Sepolia ETH for testing."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How It <span className="gradient-text">Works</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-card/95 backdrop-blur-sm border border-border/60 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <step.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
