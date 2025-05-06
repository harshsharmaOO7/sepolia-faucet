
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Code, Coffee, Flame, Heart, Shield, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Sepolia Faucet</h1>
            <p className="text-xl text-muted-foreground">
              Helping developers build the future of Ethereum
            </p>
          </div>
          
          <div className="space-y-16">
            <section>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground mb-4">
                    We believe in lowering the barriers to entry for blockchain development. 
                    Sepolia Faucet was created to provide developers with easy access to test ETH 
                    on the Sepolia network, enabling innovation without friction.
                  </p>
                  <p className="text-muted-foreground">
                    By offering a reliable, user-friendly faucet service, we aim to support the 
                    Ethereum ecosystem and help developers bring their ideas to life.
                  </p>
                </div>
                <div className="bg-card rounded-lg p-6 border border-border">
                  <div className="aspect-square flex items-center justify-center">
                    <div className="relative h-32 w-32">
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Flame className="h-16 w-16 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Sepolia Faucet?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Reliable Service</h3>
                  <p className="text-muted-foreground text-sm">
                    Our faucet is maintained regularly to ensure consistent and reliable ETH distribution.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Developer Focused</h3>
                  <p className="text-muted-foreground text-sm">
                    Built by developers for developers, with features that streamline the testing process.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mb-4">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Community Supported</h3>
                  <p className="text-muted-foreground text-sm">
                    Funded by donations and maintained by passionate contributors from the Ethereum community.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-6">Our Team</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Sepolia Faucet is maintained by a small team of blockchain enthusiasts and Ethereum developers 
                  committed to supporting the ecosystem.
                </p>
                
                <div className="flex justify-center">
                  <div className="inline-flex -space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="h-12 w-12 rounded-full bg-secondary border-2 border-background"></div>
                    <div className="h-12 w-12 rounded-full bg-card border-2 border-background"></div>
                    <div className="h-12 w-12 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <span className="text-xs font-medium">+3</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="bg-card rounded-lg border border-border p-8 text-center">
              <Heart className="h-8 w-8 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Support Our Project</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Sepolia Faucet is a free service maintained by volunteers. Your donations help us 
                keep the faucet running and improve our services for the community.
              </p>
              <Button className="gap-2">
                Donate ETH
                <ArrowRight className="h-4 w-4" />
              </Button>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
