import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Transactions from '@/components/Transactions';
import FAQ from '@/components/FAQ';
import AdBanner from '@/components/AdBanner';

const Index = () => {
  const desktopAdScriptSrc = '//www.highperformanceformat.com/73c83d76e8d09ddff6cf52a5bc1a7f3b/invoke.js';
  const mobileAdScriptSrc = '//www.highperformanceformat.com/cdc6453f6c930fbdd1be9a0dbe3b73c1/invoke.js';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Hero />
        <HowItWorks />

        {/* Top Ad */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="hidden md:block">
            <AdBanner position="top" script={desktopAdScriptSrc} />
          </div>
          <div className="block md:hidden">
            <AdBanner position="top" script={mobileAdScriptSrc} />
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Transactions />
            </div>
            <div className="flex items-center justify-center">
              <div className="hidden md:block">
                <AdBanner position="side" script={desktopAdScriptSrc} />
              </div>
              <div className="block md:hidden">
                <AdBanner position="side" script={mobileAdScriptSrc} />
              </div>
            </div>
          </div>
        </div>

        <FAQ />

        {/* Bottom Ad */}
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="hidden md:block">
            <AdBanner position="bottom" script={desktopAdScriptSrc} />
          </div>
          <div className="block md:hidden">
            <AdBanner position="bottom" script={mobileAdScriptSrc} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
