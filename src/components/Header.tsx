
import React from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-dark-gray">
            <span className="text-soft-pink">Med</span>Insight AI
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li className="hidden md:block">
              <a href="#" className="text-med-gray hover:text-dark-gray transition-colors">
                Accueil
              </a>
            </li>
            <li className="hidden md:block">
              <a href="#" className="text-med-gray hover:text-dark-gray transition-colors">
                Comment ça marche
              </a>
            </li>
            <li>
              <Button variant="outline" size="sm" className="border-soft-pink text-dark-gray hover:bg-soft-pink hover:bg-opacity-10">
                Connexion
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
