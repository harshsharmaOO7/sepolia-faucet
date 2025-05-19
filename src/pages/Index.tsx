import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Transactions from '@/components/Transactions';
import FAQ from '@/components/FAQ';
import ResponsiveAd from '@/components/ResponsiveAd';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Hero />

        <HowItWorks />

        {/* Top Ad */}
        <div className="container mx-auto px-4 md:px-6 py-4">
          <ResponsiveAd
            desktopKey="73c83d76e8d09ddff6cf52a5bc1a7f3b"
            mobileKey="cdc6453f6c930fbdd1be9a0dbe3b73c1"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Transactions />
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveAd
                desktopKey="73c83d76e8d09ddff6cf52a5bc1a7f3b"
                mobileKey="cdc6453f6c930fbdd1be9a0dbe3b73c1"
              />
            </div>
          </div>
        </div>

        <FAQ />

        {/* Bottom Ad */}
        <div className="container mx-auto px-4 md:px-6 py-8">
          <ResponsiveAd
            desktopKey="73c83d76e8d09ddff6cf52a5bc1a7f3b"
            mobileKey="cdc6453f6c930fbdd1be9a0dbe3b73c1"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
