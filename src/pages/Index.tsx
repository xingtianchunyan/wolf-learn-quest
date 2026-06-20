import React from 'react';
import { Users, Brain, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FeatureCard from '@/components/home/FeatureCard';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
const Index = () => {
  const { t } = useLanguage();
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow flex flex-col items-center justify-center pt-24 pb-4 px-4'>
        <div className='container max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl text-werewolf-purple mb-6 font-bold text-center md:text-6xl'>
            {t('welcome')}
          </h1>

          <p className='text-xl mb-10 max-w-3xl mx-auto'>{t('subtitle')}</p>

          <Link
            to='/lobby'
            className='btn-primary btn-shake inline-block mb-16'
          >
            {t('start_game')}
          </Link>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
            <FeatureCard
              title={t('community_integration')}
              description={t('community_desc')}
              icon={Users}
            />

            <FeatureCard
              title={t('ai_knowledge')}
              description={t('ai_knowledge_desc')}
              icon={Brain}
            />

            <FeatureCard
              title={t('ai_participants')}
              description={t('ai_participants_desc')}
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
