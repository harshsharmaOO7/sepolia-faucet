
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p>
                This Privacy Policy explains how Sepolia Faucet ("we," "us," or "our") collects, uses, and discloses 
                information about you when you visit our website at sepoliafaucet.com (the "Site").
              </p>
              <p>
                We take your privacy seriously and are committed to protecting your personal information. Please read this 
                Privacy Policy carefully to understand our practices regarding your information.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p>
                <strong>Personal Information:</strong> When you use our faucet service, we collect your Ethereum wallet address.
              </p>
              <p>
                <strong>Usage Data:</strong> We automatically collect certain information when you visit our Site, including:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4 text-muted-foreground">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referral source</li>
                <li>Length of visit, page views, and website navigation</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 mb-4 text-muted-foreground">
                <li>Provide, operate, and maintain our Site</li>
                <li>Send Sepolia ETH to your wallet address</li>
                <li>Prevent abuse of our faucet service</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Improve our Site and user experience</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Sharing of Information</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties. 
                However, we may share information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4 text-muted-foreground">
                <li>With service providers who help us operate our Site</li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our Site and hold certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information. However, no method of 
                transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at: 
                <a href="mailto:contact@sepoliafaucet.com" className="text-primary hover:underline ml-1">
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

export default PrivacyPolicy;
