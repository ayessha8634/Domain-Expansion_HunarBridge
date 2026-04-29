import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 md:pt-32 pb-32 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center gap-16 mb-32">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-bold text-sm mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('common.powering_artisans')}</span>
          </motion.div>
          <h1 className="text-6xl md:text-8xl mb-8 leading-[0.9] font-display">
            {t('common.craft_as_cv')}
          </h1>
          <p className="text-xl md:text-2xl text-brand-dark/60 leading-relaxed mb-10 max-w-2xl">
            Bridging the gap between traditional skills and formal markets. 
            Discover verified masters or showcase your own masterpiece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/onboarding">
              <Button size="lg" className="w-full sm:w-auto">
                {t('common.join_as_artisan')} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/discovery">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {t('common.discover_masters')}
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 w-full max-w-md hidden lg:block">
          {/* Visual Asset or Animation could go here, ChatBot is now global */}
          <div className="relative aspect-square bg-brand-primary/5 rounded-[4rem] border border-brand-primary/10 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-dashed border-brand-primary/20 rounded-[4rem]"
            />
            <div className="w-32 h-32 bg-brand-primary rounded-3xl shadow-2xl flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
        {[
          { icon: Users, label: t('common.artisans_joined'), value: "12,000+" },
          { icon: ShieldCheck, label: t('common.trust_verified'), value: "98%" },
          { icon: Zap, label: t('common.economic_growth'), value: "2.4x" }
        ].map((stat, i) => (
          <div key={i} className="glass p-10 rounded-[3rem] text-center border-brand-primary/5">
            <div className="bg-brand-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <stat.icon className="w-8 h-8 text-brand-primary" />
            </div>
            <h3 className="text-4xl font-display mb-2">{stat.value}</h3>
            <p className="text-brand-dark/50 font-bold uppercase tracking-widest text-xs">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
