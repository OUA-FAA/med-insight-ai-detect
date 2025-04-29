
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { FileImage, InfoIcon, ArrowDown, Upload, Search, CheckCircle } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-soft-pink/20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight animate-fade-in">
              Détection assistée par IA
              <span className="text-med-pink block"> pour l'imagerie médicale</span>
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
                className="border-med-pink text-dark-gray hover:bg-soft-pink hover:bg-opacity-20"
                onClick={() => {
                  const howItWorksSection = document.getElementById('how-it-works');
                  if (howItWorksSection) {
                    howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <InfoIcon className="mr-1 h-4 w-4" />
                En savoir plus
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative">
              <div className="bg-med-pink rounded-full w-80 h-80 opacity-20 absolute -top-10 -right-10 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800"
                alt="Technologie d'imagerie médicale" 
                className="rounded-2xl shadow-lg z-10 relative hover-scale"
              />
              <div className="bg-soft-gray rounded-full w-40 h-40 opacity-30 absolute -bottom-5 -left-5 z-0"></div>
            </div>
          </div>
        </div>

        {/* Section Comment ça marche améliorée */}
        <div id="how-it-works" className="mt-24 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Comment <span className="text-med-pink">ça marche</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Ligne de connexion entre les étapes sur les écrans moyens et grands */}
            <div className="hidden md:block absolute top-1/3 left-1/2 transform -translate-x-1/2 h-0.5 w-2/3 bg-gradient-to-r from-soft-pink via-med-pink to-soft-pink"></div>

            {/* Étape 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm card-hover relative">
              <div className="w-16 h-16 mx-auto bg-soft-pink rounded-full flex items-center justify-center mb-6">
                <Upload className="h-8 w-8 text-dark-pink" />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-med-pink rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-center">Importez votre image</h3>
              <p className="text-med-gray text-center">
                Téléchargez facilement vos images médicales par glisser-déposer ou en utilisant notre formulaire d'import.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-16 h-1 bg-soft-pink"></div>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm card-hover relative md:mt-8">
              <div className="w-16 h-16 mx-auto bg-soft-pink rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-dark-pink" />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-med-pink rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-center">Analyse IA</h3>
              <p className="text-med-gray text-center">
                Notre intelligence artificielle avancée analyse votre image à la recherche d'anomalies potentielles.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-16 h-1 bg-soft-pink"></div>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm card-hover relative">
              <div className="w-16 h-16 mx-auto bg-soft-pink rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-dark-pink" />
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-med-pink rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-center">Résultats détaillés</h3>
              <p className="text-med-gray text-center">
                Recevez un rapport complet avec la probabilité de détection et des recommandations médicales.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-16 h-1 bg-soft-pink"></div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg font-medium mb-6">
              Notre technologie d'IA aide à identifier les anomalies potentielles avec une grande précision
            </p>
            <div className="flex justify-center">
              <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Comment fonctionne l'IA de détection médicale" 
                className="rounded-xl shadow-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
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
