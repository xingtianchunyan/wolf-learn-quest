
import React from 'react';
import { Users, Brain, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/home/FeatureCard';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-werewolf-purple mb-6">
            Welcome to the Werewolf Social Learning
          </h1>
          
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join our community where learning becomes a thrilling adventure through the classic game
            of Werewolf combined with interactive quizzes.
          </p>
          
          <Link 
            to="/lobby" 
            className="btn-primary btn-shake inline-block mb-16"
          >
            Start Game
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <FeatureCard 
              title="Community Integration"
              description="Combine Werewolf gameplay with quiz Q&A to provide a channel for new community members to quickly integrate and bond with existing members."
              icon={Users}
            />
            
            <FeatureCard 
              title="AI Knowledge System"
              description="Leverage our AI knowledge base to generate questions and provide contextual within the game environment."
              icon={Brain}
            />
            
            <FeatureCard 
              title="AI Participants"
              description="Never wait for players again! Our AI Players and AI Judge allow you to start a game immediately, even with fewer human participants."
              icon={Bot}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
