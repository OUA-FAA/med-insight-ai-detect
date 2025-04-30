
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock auth state (in a real app, this would come from an auth context)
  const isLoggedIn = location.pathname === '/dashboard' || location.pathname.includes('/results');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation pour rediriger vers la page d'accueil
  const handleLogoClick = () => {
    navigate('/');
  };

  // Navigation vers la page de connexion
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Navigation vers le tableau de bord
  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  // Déconnexion (simulée)
  const handleLogoutClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer"
          onClick={handleLogoClick}
        >
          <h1 className="text-xl md:text-2xl font-bold text-dark-gray">
            <span className="text-med-pink">Radia</span>Cancer
          </h1>
        </div>
        
        {/* Menu pour bureau */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            <li>
              <a 
                href="#" 
                className={`interactive-element ${
                  location.pathname === '/' 
                    ? 'text-dark-gray font-medium' 
                    : 'text-med-gray hover:text-dark-gray'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
              >
                Accueil
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-med-gray hover:text-dark-gray interactive-element"
                onClick={(e) => {
                  e.preventDefault();
                  const howItWorksSection = document.getElementById('how-it-works');
                  if (howItWorksSection) {
                    howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Comment ça marche
              </a>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-med-pink text-dark-gray hover:bg-soft-pink hover:bg-opacity-20"
                    onClick={handleDashboardClick}
                  >
                    Tableau de bord
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-med-gray hover:text-dark-gray"
                    onClick={handleLogoutClick}
                  >
                    Déconnexion
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-med-pink text-dark-gray hover:bg-soft-pink hover:bg-opacity-20"
                  onClick={handleLoginClick}
                >
                  Connexion
                </Button>
              </li>
            )}
          </ul>
        </nav>
        
        {/* Bouton menu mobile */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-auto" 
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-soft-gray mt-4 animate-fade-in">
          <div className="container-custom py-4 flex flex-col gap-4">
            <a 
              href="#" 
              className={`px-2 py-2 rounded-md ${
                location.pathname === '/' 
                  ? 'bg-soft-pink text-dark-gray font-medium' 
                  : 'text-med-gray hover:bg-soft-gray'
              }`}
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                setMobileMenuOpen(false);
              }}
            >
              Accueil
            </a>
            <a 
              href="#" 
              className="px-2 py-2 rounded-md text-med-gray hover:bg-soft-gray"
              onClick={(e) => {
                e.preventDefault();
                const howItWorksSection = document.getElementById('how-it-works');
                if (howItWorksSection) {
                  howItWorksSection.scrollIntoView({ behavior: 'smooth' });
                }
                setMobileMenuOpen(false);
              }}
            >
              Comment ça marche
            </a>
            {isLoggedIn ? (
              <>
                <a 
                  href="#" 
                  className="px-2 py-2 rounded-md text-med-gray hover:bg-soft-gray"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/dashboard');
                    setMobileMenuOpen(false);
                  }}
                >
                  Tableau de bord
                </a>
                <a 
                  href="#" 
                  className="px-2 py-2 rounded-md text-med-gray hover:bg-soft-gray"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                    setMobileMenuOpen(false);
                  }}
                >
                  Déconnexion
                </a>
              </>
            ) : (
              <a 
                href="#" 
                className="px-2 py-2 rounded-md text-med-gray hover:bg-soft-gray"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
              >
                Connexion
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
