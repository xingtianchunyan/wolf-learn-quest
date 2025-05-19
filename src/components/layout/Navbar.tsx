
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Gamepad, Home, Menu, X, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher, { useLanguage } from './LanguageSwitcher';
import LoginDialog from '../dialogs/LoginDialog';
import GameRulesDialog from '../dialogs/GameRulesDialog';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-werewolf-dark/80 backdrop-blur-md p-4 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Gamepad className="text-werewolf-purple" />
          <div className="flex flex-col">
            <Link to="/" className="font-bold text-xl text-white">
              Old With New Werewolf
            </Link>
            <span className="text-sm text-gray-400 hidden md:block">
              A social game that makes learning no longer boring.
            </span>
          </div>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {isHomePage ? (
            <Link to="/lobby" className="nav-link">
              {t('lobby')}
            </Link>
          ) : (
            <Link to="/" className="nav-link">
              <Home size={20} className="inline mr-1" />
              {t('home')}
            </Link>
          )}
          <Button 
            variant="ghost" 
            className="nav-link flex items-center"
            onClick={() => window.open("https://seedao.xyz/", "_blank")}
          >
            <ExternalLink size={20} className="mr-1" />
            <span className="hidden sm:inline">{t('seedao')}</span>
          </Button>
          <GameRulesDialog />
          <LanguageSwitcher />
          <LoginDialog />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-werewolf-card mt-2 rounded-md shadow-lg absolute z-10 w-full left-0">
          <div className="flex flex-col space-y-4">
            {isHomePage ? (
              <Link 
                to="/lobby" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('lobby')}
              </Link>
            ) : (
              <Link 
                to="/" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={20} className="inline mr-1" />
                {t('home')}
              </Link>
            )}
            <Button 
              variant="ghost" 
              className="nav-link justify-start"
              onClick={() => {
                window.open("https://seedao.xyz/", "_blank");
                setIsMenuOpen(false);
              }}
            >
              <ExternalLink size={20} className="mr-1" />
              {t('seedao')}
            </Button>
            <GameRulesDialog />
            <LanguageSwitcher />
            <LoginDialog />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
