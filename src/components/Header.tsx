import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-eth to-primary"></div>
            <span className="font-bold text-xl text-foreground">Sepolia<span className="gradient-text">Faucet</span></span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#faq" className="text-foreground/80 hover:text-foreground transition-colors">
            FAQ
          </a>
          <a href="#transactions" className="text-foreground/80 hover:text-foreground transition-colors">
            Transactions
          </a>
          <div className="flex items-center space-x-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          title="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden absolute w-full bg-background border-b border-border transition-all duration-300 ease-in-out",
        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 invisible"
      )}>
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a href="#how-it-works" className="py-2 text-foreground/80 hover:text-foreground transition-colors" onClick={toggleMenu}>
            How It Works
          </a>
          <a href="#faq" className="py-2 text-foreground/80 hover:text-foreground transition-colors" onClick={toggleMenu}>
            FAQ
          </a>
          <a href="#transactions" className="py-2 text-foreground/80 hover:text-foreground transition-colors" onClick={toggleMenu}>
            Transactions
          </a>
          <div className="flex items-center space-x-4 py-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
