
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle, Send, User } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a backend
    alert('Thanks for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground mb-8">Have questions or suggestions? We'd love to hear from you.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
                <p className="text-muted-foreground">
                  We're here to help with any questions or concerns you might have about Sepolia Faucet.
                  Our team is committed to providing timely and helpful responses.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>contact@sepoliafaucet.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <span>Join our <a href="https://discord.gg/sepoliafaucet" className="text-primary hover:underline">Discord community</a></span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
                <p className="text-muted-foreground">
                  Stay updated with our latest news and developments by following us on social media.
                </p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input id="name" type="text" placeholder="Your name" className="pl-10" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input id="email" type="email" placeholder="your@email.com" className="pl-10" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Message</label>
                  <Textarea id="message" placeholder="Your message" className="h-32" required />
                </div>
                
                <Button type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
