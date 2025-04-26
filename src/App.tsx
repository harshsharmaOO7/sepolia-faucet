import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AdBanner from "./components/AdBanner";
import Transactions from "./components/Transactions";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";  // ✅ Import Toaster

function App() {
  return (
    <>
      <Header />
      <Hero />
      <AdBanner />
      <Transactions />
      <HowItWorks />
      <FAQ />
      <Footer />
      <Toaster /> {/* ✅ Add Toaster here */}
    </>
  );
}

export default App;
