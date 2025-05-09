import React from 'react';
import { Github, Twitter, Globe, Mail, Info, FileText, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-background/95 backdrop-blur-sm border-t border-border py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Sepolia<span className="gradient-text">Faucet</span>
            </h3>
            <p className="text-muted-foreground text-sm">
              Get free testnet ETH for development and testing on the Ethereum Sepolia network.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><ExternalLink icon={<Globe size={14} />} href="https://ethereum.org">Ethereum.org</ExternalLink></li>
              <li><ExternalLink icon={<Globe size={14} />} href="https://sepolia.etherscan.io">Sepolia Explorer</ExternalLink></li>
              <li><InternalLink icon={<Info size={14} />} to="/about">About Us</InternalLink></li>
              <li><InternalLink icon={<Mail size={14} />} to="/contact">Contact Support</InternalLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><InternalLink icon={<FileText size={14} />} to="/terms-of-service">Terms of Service</InternalLink></li>
              <li><InternalLink icon={<Book size={14} />} to="/privacy-policy">Privacy Policy</InternalLink></li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-2">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="icon-link">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon-link">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Sepolia Faucet. All rights reserved.</p>
          <p className="mt-1 space-x-2">
            <Link to="/terms-of-service" className="hover:text-foreground">Terms of Service</Link>
            <span>•</span>
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Reusable Link Components
const ExternalLink = ({ href, icon, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
  >
    {icon} {children}
  </a>
);

const InternalLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
  >
    {icon} {children}
  </Link>
);

export default Footer;
