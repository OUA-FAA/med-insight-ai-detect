
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { FileImage, InfoIcon, ArrowDown } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-soft-blue/20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight animate-fade-in">
              Détection assistée par IA
              <span className="text-med-blue block"> pour l'imagerie médicale</span>
            </h1>
            <p className="text-med-gray text-lg mb-8 animate-slide-in">
              Notre technologie d'intelligence artificielle analyse vos images médicales pour aider 
              à détecter des anomalies potentielles. Un outil d'assistance rapide et fiable pour les professionnels de santé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="btn-primary group"
                onClick={scrollToUpload}
              >
                <FileImage className="mr-1 h-4 w-4 transition-transform group-hover:scale-110" />
                Commencer l'analyse
              </Button>
              <Button 
                variant="outline" 
                className="border-med-blue text-dark-gray hover:bg-soft-blue hover:bg-opacity-20"
              >
                <InfoIcon className="mr-1 h-4 w-4" />
                En savoir plus
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative">
              <div className="bg-med-blue rounded-full w-80 h-80 opacity-20 absolute -top-10 -right-10 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800"
                alt="Technologie d'imagerie médicale" 
                className="rounded-2xl shadow-lg z-10 relative hover-scale"
              />
              <div className="bg-soft-green rounded-full w-40 h-40 opacity-30 absolute -bottom-5 -left-5 z-0"></div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm card-hover">
            <div className="w-12 h-12 bg-soft-blue bg-opacity-30 rounded-full flex items-center justify-center mb-4">
              <div className="relative">
                <FileImage className="h-6 w-6 text-dark-blue" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-med-blue rounded-full animate-ping-slow opacity-75"></span>
              </div>
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Téléchargement simple</h3>
            <p className="text-med-gray">Importez facilement vos images médicales en quelques clics ou par glisser-déposer.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm card-hover">
            <div className="w-12 h-12 bg-soft-green bg-opacity-30 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Analyse IA rapide</h3>
            <p className="text-med-gray">Notre intelligence artificielle analyse votre image médicale en quelques secondes.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm card-hover">
            <div className="w-12 h-12 bg-soft-blue bg-opacity-30 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Résultats détaillés</h3>
            <p className="text-med-gray">Obtenez un aperçu des anomalies potentielles avec niveau de confiance et recommandations.</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button 
            variant="ghost" 
            className="text-med-gray hover:text-dark-gray animate-bounce"
            onClick={scrollToUpload}
          >
            <ArrowDown className="mr-1 h-4 w-4" />
            Faire une analyse
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
