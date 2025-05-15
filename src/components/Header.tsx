
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    signOut,
    profile
  } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation for redirecting to the home page
  const handleLogoClick = () => {
    navigate('/');
    setMobileMenuOpen(false);
  };

  // Navigate to "how it works" section
  const handleHowItWorksClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection && location.pathname === '/') {
      howItWorksSection.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      navigate('/#how-it-works');
    }
    setMobileMenuOpen(false);
  };

  // Logout with proper cleanup
  const handleLogoutClick = async () => {
    await signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const displayName = profile?.first_name ? `${profile.first_name}${profile.last_name ? ' ' + profile.last_name[0] + '.' : ''}` : user?.email?.split('@')[0];

  return <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
          <img 
            src="/lovable-uploads/2576afa1-087b-42a8-9e0f-6a0c9b92fc76.png" 
            alt="MedCancer Logo" 
            className="h-10 md:h-12 mr-2"
          />
        </div>
        
        {/* Menu for desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className={`interactive-element ${location.pathname === '/' ? 'text-dark-gray font-medium' : 'text-med-gray hover:text-dark-gray'}`}>
                Accueil
              </Link>
            </li>
            <li>
              <a href="#how-it-works" className="text-med-gray hover:text-dark-gray interactive-element" onClick={handleHowItWorksClick}>
                Comment ça marche
              </a>
            </li>
            {user ? <>
                <li>
                  <Button variant="outline" size="sm" className="border-med-pink text-dark-gray hover:bg-soft-pink hover:bg-opacity-20" onClick={() => navigate('/dashboard')}>
                    Tableau de bord
                  </Button>
                </li>
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-med-gray hover:text-dark-gray">
                        <User className="h-4 w-4 mr-1" /> {displayName}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                        Tableau de bord
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogoutClick}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Déconnexion
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </> : <li>
                <Button variant="outline" size="sm" onClick={() => navigate('/login')} className="border-med-pink text-dark-gray hover:bg-soft-pink hover:bg-opacity-20 text-zinc-950 bg-zinc-50">
                  Connexion
                </Button>
              </li>}
          </ul>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" className="p-1 h-auto" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && <div className="md:hidden border-t border-soft-gray mt-4 animate-fade-in">
          <div className="container-custom py-4 flex flex-col gap-4">
            <Link to="/" className={`px-2 py-2 rounded-md ${location.pathname === '/' ? 'bg-soft-pink text-dark-gray font-medium' : 'text-med-gray hover:bg-soft-gray'}`} onClick={() => setMobileMenuOpen(false)}>
              Accueil
            </Link>
            <a href="#how-it-works" className="px-2 py-2 rounded-md text-med-gray hover:bg-soft-gray" onClick={handleHowItWorksClick}>
              Comment ça marche
            </a>
            {user ? <>
                <Link to="/dashboard" className="px-2 py-2 rounded-md text-med-gray hover:bg-soft-gray" onClick={() => setMobileMenuOpen(false)}>
                  Tableau de bord
                </Link>
                <div className="border-t border-soft-gray my-2"></div>
                <div className="px-2 py-2 text-sm text-med-gray">
                  Connecté en tant que: {displayName}
                </div>
                <button className="px-2 py-2 rounded-md text-med-gray hover:bg-soft-gray flex items-center text-left w-full" onClick={handleLogoutClick}>
                  <LogOut className="h-4 w-4 mr-2" /> Déconnexion
                </button>
              </> : <Link to="/login" className="px-2 py-2 rounded-md text-med-gray hover:bg-soft-gray" onClick={() => setMobileMenuOpen(false)}>
                Connexion
              </Link>}
          </div>
        </div>}
    </header>;
};

export default Header;
