
import React from 'react';
import { Github, Twitter, Globe, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-background/95 backdrop-blur-sm border-t border-border py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sepolia<span className="gradient-text">Faucet</span></h3>
            <p className="text-muted-foreground text-sm">
              Get free testnet ETH for development and testing on the Ethereum Sepolia network.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://ethereum.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Globe size={14} /> Ethereum.org
                </a>
              </li>
              <li>
                <a href="https://sepolia.etherscan.io" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Globe size={14} /> Sepolia Explorer
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  <Mail size={14} /> Contact Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sepolia Faucet. All rights reserved.</p>
          <p className="mt-1">
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            {' • '}
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
