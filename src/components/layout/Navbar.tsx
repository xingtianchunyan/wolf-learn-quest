
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Gamepad, Home, LogIn, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import LoginDialog from '../dialogs/LoginDialog';
import GameRulesDialog from '../dialogs/GameRulesDialog';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  const isGameLobby = location.pathname === '/lobby';

  return (
    <nav className="bg-werewolf-dark/80 backdrop-blur-md p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Gamepad className="text-werewolf-purple" />
          <Link to="/" className="font-bold text-xl text-white">
            Old With New Werewolf
          </Link>
          <span className="text-sm text-gray-400 hidden md:inline-block">
            A social game that makes learning no longer boring.
          </span>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {isHomePage ? (
            <Link to="/lobby" className="nav-link">
              Game Lobby
            </Link>
          ) : (
            <Link to="/" className="nav-link">
              <Home size={20} className="inline mr-1" />
              Home
            </Link>
          )}
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
                Game Lobby
              </Link>
            ) : (
              <Link 
                to="/" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={20} className="inline mr-1" />
                Home
              </Link>
            )}
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
