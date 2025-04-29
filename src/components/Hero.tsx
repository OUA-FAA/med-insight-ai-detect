
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-soft-gray/20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Détection assistée par IA
              <span className="text-soft-pink block"> pour l'imagerie médicale</span>
            </h1>
            <p className="text-med-gray text-lg mb-8">
              Notre technologie d'intelligence artificielle analyse vos images médicales pour aider 
              à détecter des anomalies potentielles. Un outil d'assistance rapide et fiable pour les professionnels de santé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary">
                Commencer l'analyse
              </Button>
              <Button variant="outline" className="border-soft-pink text-dark-gray hover:bg-soft-pink hover:bg-opacity-10">
                En savoir plus
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="relative">
              <div className="bg-soft-pink rounded-full w-80 h-80 opacity-20 absolute -top-10 -right-10 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800"
                alt="Technologie d'imagerie médicale" 
                className="rounded-2xl shadow-lg z-10 relative"
              />
              <div className="bg-soft-gray rounded-full w-40 h-40 opacity-30 absolute -bottom-5 -left-5 z-0"></div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-soft-pink bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📤</span>
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Téléchargement simple</h3>
            <p className="text-med-gray">Importez facilement vos images médicales en quelques clics ou par glisser-déposer.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-soft-pink bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Analyse IA rapide</h3>
            <p className="text-med-gray">Notre intelligence artificielle analyse votre image médicale en quelques secondes.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-soft-pink bg-opacity-20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">Résultats détaillés</h3>
            <p className="text-med-gray">Obtenez un aperçu des anomalies potentielles avec niveau de confiance et recommandations.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
