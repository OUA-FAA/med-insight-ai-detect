import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { FileImage, InfoIcon, ArrowDown } from 'lucide-react';
import HowItWorksDialog from './HowItWorksDialog';
const Hero = () => {
  const navigate = useNavigate();
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="py-12 md:py-20 bg-gradient-to-b from-white to-soft-pink/20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight animate-fade-in">
              Détection assistée par IA
              <span className="text-med-pink block"> pour le cancer</span>
            </h1>
            <p className="text-med-gray text-lg mb-8 animate-slide-in">
              Notre technologie d'intelligence artificielle analyse vos images médicales pour aider 
              à détecter des anomalies potentielles liées au cancer. Un outil d'assistance rapide et fiable pour les professionnels de santé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary group" onClick={scrollToUpload}>
                <FileImage className="mr-1 h-4 w-4 transition-transform group-hover:scale-110" />
                Commencer l'analyse
              </Button>
              <HowItWorksDialog />
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative">
              <div className="bg-med-pink rounded-full w-80 h-80 opacity-20 absolute -top-10 -right-10 z-0"></div>
              <img alt="Cancer detection using AI" className="rounded-2xl shadow-lg z-10 relative hover-scale" src="https://plus.unsplash.com/premium_photo-1708371357440-823fea28e971?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <div className="bg-soft-gray rounded-full w-40 h-40 opacity-30 absolute -bottom-5 -left-5 z-0"></div>
            </div>
          </div>
        </div>

        {/* Section Comment ça marche - Garder pour la navigation mais simplifier */}
        <div id="how-it-works" className="mt-24 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Comment <span className="text-med-pink">ça marche</span>
          </h2>
          
          <div className="text-center">
            <p className="text-lg max-w-2xl mx-auto mb-6">
              Notre plateforme utilise des algorithmes d'intelligence artificielle avancés pour analyser vos images médicales avec précision.
            </p>
            <HowItWorksDialog />
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button variant="ghost" className="text-med-gray hover:text-dark-gray animate-bounce" onClick={scrollToUpload}>
            <ArrowDown className="mr-1 h-4 w-4" />
            Faire une analyse
          </Button>
        </div>
      </div>
    </section>;
};
export default Hero;