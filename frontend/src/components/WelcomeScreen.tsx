import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, User, ShoppingBag, GraduationCap, ArrowRight, Camera, Sparkles } from 'lucide-react';
import Button from './common/Button';
import { useTranslation } from 'react-i18next';

const WelcomeScreen = () => {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const { i18n } = useTranslation();

  const [formData, setFormData] = useState({
    language: 'en',
    place: '',
    role: '',
    name: ''
  });

  useEffect(() => {
    const hasVisited = localStorage.getItem('hunarbridge_visited');
    if (!hasVisited) {
      setVisible(true);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('hunarbridge_visited', 'true');
    localStorage.setItem('hunarbridge_user_role', formData.role);
    localStorage.setItem('hunarbridge_user_name', formData.name);
    setVisible(false);
    window.location.reload(); 
  };

  if (!visible) return null;

  const steps = [
    {
      title: "Choose your language",
      subtitle: "HunarBridge supports 8 Indian languages",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[
            { code: 'en', label: 'English' },
            { code: 'hi', label: 'हिन्दी' },
            { code: 'kn', label: 'ಕನ್ನಡ' },
            { code: 'ta', label: 'தமிழ்' },
            { code: 'te', label: 'తెలుగు' },
            { code: 'ml', label: 'മലയാളം' },
            { code: 'bn', label: 'বাংলা' },
            { code: 'mr', label: 'मराठी' }
          ].map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setFormData({...formData, language: lang.code});
                setStep(1);
              }}
              className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${
                formData.language === lang.code ? 'bg-brand-primary text-white border-brand-primary shadow-lg' : 'bg-brand-light/50 border-transparent hover:border-brand-primary/20'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )
    },
    {
      title: "Where are you from?",
      subtitle: "Find artisans and skills in your own district",
      content: (
        <div className="space-y-6">
          <div className="bg-brand-light/50 p-6 rounded-3xl flex items-center gap-4 border-2 border-transparent focus-within:border-brand-primary/20 transition-all">
            <MapPin className="w-8 h-8 text-brand-primary" />
            <input 
              type="text" 
              placeholder="e.g. Dharavi, Mumbai" 
              className="bg-transparent w-full outline-none text-xl font-bold"
              onChange={(e) => setFormData({...formData, place: e.target.value})}
            />
          </div>
          <Button size="lg" className="w-full" disabled={!formData.place} onClick={() => setStep(2)}>
            Continue <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )
    },
    {
      title: "I want to join as...",
      subtitle: "We will tailor your experience based on this",
      content: (
        <div className="grid grid-cols-1 gap-4">
          {[
            { id: 'artisan', icon: Camera, label: 'Artisan', desc: 'I want to showcase my craft and find buyers' },
            { id: 'buyer', icon: ShoppingBag, label: 'Buyer', desc: 'I want to find and support local masters' },
            { id: 'learner', icon: GraduationCap, label: 'Learner', desc: 'I want to learn traditional skills' }
          ].map(role => (
            <button
              key={role.id}
              onClick={() => {
                setFormData({...formData, role: role.id});
                setStep(3);
              }}
              className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-brand-light/50 border-2 border-transparent hover:border-brand-primary/20 transition-all text-left"
            >
              <div className="bg-brand-primary/10 p-4 rounded-2xl text-brand-primary">
                <role.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-xl">{role.label}</p>
                <p className="text-sm text-brand-dark/40 font-medium">{role.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )
    },
    {
      title: "One last thing...",
      subtitle: "What should we call you?",
      content: (
        <div className="space-y-6">
          <div className="bg-brand-light/50 p-6 rounded-3xl flex items-center gap-4 border-2 border-transparent focus-within:border-brand-primary/20 transition-all">
            <User className="w-8 h-8 text-brand-primary" />
            <input 
              type="text" 
              placeholder="Your Full Name" 
              className="bg-transparent w-full outline-none text-xl font-bold"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <Button size="lg" className="w-full" disabled={!formData.name} onClick={handleComplete}>
            Start My Journey <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>
      )
    }
  ];

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[200] bg-brand-dark flex items-center justify-center p-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[150px] -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/10 rounded-full blur-[150px] -ml-64 -mb-64" />

      <motion.div 
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="glass max-w-2xl w-full p-12 md:p-16 rounded-[4rem] shadow-2xl relative border-brand-primary/10 bg-white/90"
      >
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-2xl italic">HunarBridge</span>
          </div>
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? 'w-8 bg-brand-primary' : 'w-4 bg-brand-primary/10'}`} />
            ))}
          </div>
        </div>

        <h2 className="text-5xl md:text-6xl font-display mb-4 leading-tight">{current.title}</h2>
        <p className="text-xl text-brand-dark/40 font-bold uppercase tracking-widest mb-12">{current.subtitle}</p>

        {current.content}
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
