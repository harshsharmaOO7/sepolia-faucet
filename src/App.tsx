
import React from "react";
import FaucetForm from "./components/FaucetForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Transactions from "./components/Transactions"; // if it exists

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <FaucetForm />
        <div className="mt-8">
          <Transactions />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
