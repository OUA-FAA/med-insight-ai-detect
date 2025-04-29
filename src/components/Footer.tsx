
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-6">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="md:w-1/3">
            <h2 className="text-xl font-bold mb-4">
              <span className="text-soft-pink">Med</span>Insight AI
            </h2>
            <p className="text-med-gray">
              Une plateforme d'analyse d'images médicales par intelligence artificielle conçue pour assister les professionnels de santé.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-med-gray hover:text-dark-gray transition-colors">Accueil</a></li>
              <li><a href="#" className="text-med-gray hover:text-dark-gray transition-colors">Comment ça marche</a></li>
              <li><a href="#" className="text-med-gray hover:text-dark-gray transition-colors">Confidentialité</a></li>
              <li><a href="#" className="text-med-gray hover:text-dark-gray transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Légal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-med-gray hover:text-dark-gray transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" className="text-med-gray hover:text-dark-gray transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-med-gray hover:text-dark-gray transition-colors">Mentions légales</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="text-med-gray">contact@medinsight.ai</li>
              <li className="text-med-gray">+33 (0)1 23 45 67 89</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-soft-gray pt-6 mt-6">
          <div className="bg-soft-gray bg-opacity-40 p-4 rounded-lg mb-6">
            <p className="text-center font-medium">⚠️ Avertissement important</p>
            <p className="text-med-gray text-center text-sm">
              Cette application ne remplace en aucun cas un diagnostic médical professionnel. 
              Les résultats fournis sont uniquement à titre indicatif et doivent être interprétés par un médecin qualifié.
            </p>
          </div>

          <p className="text-center text-sm text-med-gray">
            © 2025 MedInsight AI. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
