import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AdBanner from "./components/AdBanner";
import Transactions from "./components/Transactions";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <AdBanner />
      <HowItWorks />
      <FAQ />
      <Transactions />
      <Footer />
    </>
  );
}

export default App;
