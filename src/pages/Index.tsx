
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
    </div>
  );
};

export default Index;
