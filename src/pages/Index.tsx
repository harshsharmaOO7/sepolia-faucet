
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Transactions from '@/components/Transactions';
import FAQ from '@/components/FAQ';
import AdBanner from '@/components/AdBanner';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <HowItWorks />
        
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Transactions />
            </div>
            <div className="flex items-center justify-center">
              <AdBanner position="side" />
            </div>
          </div>
        </div>
        
        <FAQ />
        
        <div className="container mx-auto px-4 md:px-6 py-8">
          <AdBanner 
  position="bottom" 
  script={`<script type="text/javascript">
    atOptions = {
      'key' : '73c83d76e8d09ddff6cf52a5bc1a7f3b',
      'format' : 'iframe',
      'height' : 90,
      'width' : 728,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="//www.highperformanceformat.com/73c83d76e8d09ddff6cf52a5bc1a7f3b/invoke.js"></script>`}
/>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
