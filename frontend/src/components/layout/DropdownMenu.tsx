import React, { useState } from 'react';
import { ChevronDown, User, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface DropdownMenuProps {
  onOpenSettings: () => void;
}

const DropdownMenu = ({ onOpenSettings }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const userName = localStorage.getItem('hunarbridge_user_name') || 'Guest';

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'mr', label: 'मराठी' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 glass p-2 pr-4 rounded-full border-brand-primary/10 hover:border-brand-primary/30 transition-all shadow-lg"
      >
        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center overflow-hidden">
          <User className="w-6 h-6 text-brand-primary" />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-widest leading-none mb-1">Account</p>
          <p className="font-bold text-sm">{userName}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-brand-dark/30 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-4 w-80 glass rounded-[2.5rem] border-brand-primary/10 shadow-2xl z-50 overflow-hidden bg-white/95 backdrop-blur-3xl"
            >
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-widest px-2">Select Language</p>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all ${
                          i18n.language === lang.code 
                            ? 'bg-brand-primary text-white shadow-md' 
                            : 'hover:bg-brand-primary/5 text-brand-dark/60'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-brand-dark/5" />

                <div className="space-y-2">
                  <button className="flex items-center gap-4 w-full text-left text-brand-dark/60 hover:text-brand-primary transition-colors group p-2 rounded-xl hover:bg-brand-primary/5">
                    <User className="w-4 h-4" />
                    <span className="font-bold text-xs uppercase tracking-widest">{t('nav.profile')}</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      onOpenSettings();
                    }}
                    className="flex items-center gap-4 w-full text-left text-brand-dark/60 hover:text-brand-primary transition-colors group p-2 rounded-xl hover:bg-brand-primary/5"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="font-bold text-xs uppercase tracking-widest">{t('nav.settings')}</span>
                  </button>
                </div>
                
                <div className="h-px bg-brand-dark/5" />
                
                <button className="flex items-center gap-4 w-full text-left text-red-500 hover:text-red-600 transition-colors group p-2 rounded-xl hover:bg-red-500/5">
                  <LogOut className="w-4 h-4" />
                  <span className="font-bold text-xs uppercase tracking-widest">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
