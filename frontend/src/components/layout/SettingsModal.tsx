import React, { useState } from 'react';
import { X, Shield, Bell, HelpCircle, MessageSquare, Lock, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHelp: () => void;
}

const SettingsModal = ({ isOpen, onClose, onOpenHelp }: SettingsModalProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'privacy' | 'notifications' | 'feedback'>('privacy');
  const [allowContact, setAllowContact] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Header */}
          <div className="bg-brand-primary p-8 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="font-display text-3xl">{t('settings.title')}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-8 h-8" />
            </button>
          </div>

          <div className="flex h-[500px]">
            {/* Sidebar */}
            <div className="w-1/3 bg-brand-light/20 border-r border-brand-primary/5 p-4 flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
                  activeTab === 'privacy' ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-dark hover:bg-brand-primary/10'
                }`}
              >
                <Lock className="w-5 h-5" />
                {t('settings.privacy')}
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
                  activeTab === 'notifications' ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-dark hover:bg-brand-primary/10'
                }`}
              >
                <Bell className="w-5 h-5" />
                {t('settings.notifications')}
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
                  activeTab === 'feedback' ? 'bg-brand-primary text-white shadow-lg' : 'text-brand-dark hover:bg-brand-primary/10'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                {t('settings.feedback')}
              </button>
              <div className="mt-auto p-4 bg-brand-secondary/10 rounded-2xl border border-brand-secondary/20">
                <button 
                  onClick={onOpenHelp}
                  className="flex items-center gap-2 text-brand-primary font-bold hover:underline"
                >
                  <HelpCircle className="w-5 h-5" />
                  {t('settings.help_center')}
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow p-10 overflow-y-auto">
              {activeTab === 'privacy' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="space-y-4">
                    <h3 className="text-xl font-display text-brand-dark">{t('settings.change_password')}</h3>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="w-full bg-brand-light/30 border-2 border-brand-primary/10 rounded-2xl p-4 font-bold outline-none focus:border-brand-primary/40 transition-all"
                      />
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-primary/40"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-brand-light/20 rounded-3xl border border-brand-primary/5">
                    <div>
                      <h4 className="font-bold text-brand-dark">{t('settings.contact_visibility')}</h4>
                      <p className="text-sm text-brand-dark/60">{t('settings.contact_desc')}</p>
                    </div>
                    <button
                      onClick={() => setAllowContact(!allowContact)}
                      className={`w-14 h-8 rounded-full transition-all relative ${allowContact ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <motion.div
                        animate={{ x: allowContact ? 26 : 4 }}
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-display text-brand-dark">{t('settings.notifications')}</h3>
                  <div className="p-6 bg-brand-light/20 rounded-3xl border border-brand-primary/5">
                    <p className="text-brand-dark/60 italic">{t('settings.notifications_desc')}</p>
                  </div>
                </div>
              )}

              {activeTab === 'feedback' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-display text-brand-dark">{t('settings.feedback')}</h3>
                  <textarea
                    placeholder="Tell us how we can improve..."
                    rows={6}
                    className="w-full bg-brand-light/30 border-2 border-brand-primary/10 rounded-2xl p-4 font-bold outline-none focus:border-brand-primary/40 transition-all resize-none"
                  />
                  <button className="bg-brand-primary text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:bg-brand-dark transition-all">
                    {t('common.send')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SettingsModal;
