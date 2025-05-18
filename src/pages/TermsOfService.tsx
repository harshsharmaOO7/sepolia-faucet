
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Sepolia Faucet website ("Site"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our Site.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p>
                Sepolia Faucet provides a free service that distributes Sepolia test ETH for development and testing purposes 
                on the Ethereum Sepolia test network. The test ETH has no real-world monetary value.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Use Limitations</h2>
              <p>
                Our service is intended for developers and testers working with Ethereum smart contracts and applications.
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4 text-muted-foreground">
                <li>You are limited to one request per wallet address every 24 hours</li>
                <li>Each request will provide a maximum of 0.05 Sepolia ETH</li>
                <li>Automated scripts or bots for requesting ETH are prohibited</li>
                <li>Attempts to bypass our rate limiting mechanisms are prohibited</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. No Warranty</h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, 
                INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
                NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
              </p>
              <p>
                We do not warrant that the service will function uninterrupted, secure, or available at any particular time or location, 
                nor that any errors or defects will be corrected.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL SEPOLIA FAUCET, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, 
                INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, 
                USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4 text-muted-foreground">
                <li>Your access to or use of or inability to access or use the service</li>
                <li>Any conduct or content of any third party on the service</li>
                <li>Any content obtained from the service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. It is your responsibility to review 
                these Terms periodically for changes. Your continued use of the Site following the posting of any changes 
                constitutes acceptance of those changes.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States, 
                without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
                <a href="mailto:devloper.debug@gmail.com" className="text-primary hover:underline ml-1">
                  contact@sepoliafaucet.com
                </a>
              </p>
            </section>
            
            <p className="text-sm text-muted-foreground mt-8">Last Updated: May 6, 2025</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
