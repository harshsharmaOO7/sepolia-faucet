import React from "react"; import FaucetForm from "./components/FaucetForm"; import Header from "./components/Header"; import Footer from "./components/Footer"; import Transactions from "./components/Transactions"; import FAQ from "./components/FAQ"; import HowItWorks from "./components/HowItWorks"; import Hero from "./components/Hero"; import AdBanner from "./components/AdBanner";

function App() { return ( <div className="min-h-screen bg-background text-foreground font-sans"> <Header /> <main className="max-w-4xl mx-auto p-4 space-y-10"> <Hero /> <AdBanner /> <FaucetForm /> <Transactions /> <HowItWorks /> <FAQ /> </main> <Footer /> </div> ); }

export default App;

