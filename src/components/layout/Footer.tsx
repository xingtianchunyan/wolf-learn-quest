
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-werewolf-card py-4 text-center text-sm text-gray-400">
      <div className="container mx-auto">
        <p>© {currentYear} Old With New Werewolf | Gamified Learning for Communities</p>
      </div>
    </footer>
  );
};

export default Footer;
