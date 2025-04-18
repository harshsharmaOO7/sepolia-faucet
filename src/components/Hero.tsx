
import React from 'react';
import FaucetForm from './FaucetForm';
import AdBanner from './AdBanner';

const Hero = () => {
  return (
    <section className="py-12 md:py-20 faucet-container relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tighter">
              Free <span className="gradient-text">Sepolia ETH</span> Faucet for Ethereum Developers
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Get testnet ETH instantly to develop and test your Ethereum applications on the Sepolia network.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">No Registration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Reliable Service</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <AdBanner position="top" />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <FaucetForm />
          </div>
        </div>
        
        <div className="md:hidden mt-8">
          <AdBanner position="top" />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-eth/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-glow"></div>
    </section>
  );
};

export default Hero;
