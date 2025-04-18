
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is the Sepolia Testnet?",
    answer: "Sepolia is an Ethereum testnet used for development and testing purposes. It allows developers to test their applications in a sandbox environment without using real ETH that has monetary value."
  },
  {
    question: "Why do I need Sepolia ETH?",
    answer: "Sepolia ETH is needed to pay for gas fees when deploying or interacting with smart contracts on the Sepolia testnet. It has no real-world value but is essential for testing your applications before deploying to mainnet."
  },
  {
    question: "How much ETH can I request?",
    answer: "This faucet provides 0.05 Sepolia ETH per request. There is a limit of one request per wallet address every 24 hours to ensure fair distribution of testnet funds."
  },
  {
    question: "How long does it take to receive my Sepolia ETH?",
    answer: "Under normal circumstances, you should receive your Sepolia ETH within a few seconds after a successful request. If there are network congestion issues, it might take slightly longer."
  },
  {
    question: "Can I use this ETH on mainnet?",
    answer: "No, Sepolia ETH exists only on the Sepolia testnet and has no real monetary value. It cannot be transferred to Ethereum mainnet or exchanged for real ETH or any other cryptocurrency."
  },
  {
    question: "What wallet can I use with Sepolia testnet?",
    answer: "You can use most Ethereum wallets like MetaMask, Trust Wallet, or WalletConnect-compatible wallets. Just make sure to configure your wallet to connect to the Sepolia testnet instead of mainnet."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card/95 backdrop-blur-sm border border-border/60 rounded-lg overflow-hidden shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/30 transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
