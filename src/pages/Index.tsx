
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import UploadSection from '../components/UploadSection';
import Footer from '../components/Footer';
import HowItWorksDialog from '../components/HowItWorksDialog';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <UploadSection />
      </main>
      <Footer />
      
      {/* This adds a floating button for easy access to How It Works */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-10">
        <HowItWorksDialog />
      </div>
    </div>
  );
};

export default Index;
