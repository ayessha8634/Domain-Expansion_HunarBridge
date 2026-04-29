import React, { useState } from 'react';
import { Shield, Bell, HelpCircle, Lock, Eye, EyeOff, Save, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatBot from '../components/ai/ChatBot';

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'notifications' | 'help'>('privacy');
  const [showSaved, setShowSaved] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    allowExternalContact: false,
    publicProfile: true,
  });

  const handleSave = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto min-h-screen">
      <header className="mb-12">
        <h1 className="text-5xl font-display mb-2">Settings</h1>
        <p className="text-brand-dark/40 font-bold uppercase tracking-widest text-xs">Manage your privacy, notifications, and get help</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'privacy', label: 'Privacy & Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'help', label: 'Help Centre', icon: HelpCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-brand-primary text-white shadow-lg' 
                  : 'glass text-brand-dark/60 hover:text-brand-primary hover:bg-brand-primary/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 glass p-8 md:p-12 rounded-[3rem] shadow-xl border-brand-primary/10">
          <AnimatePresence mode="wait">
            {activeTab === 'privacy' && (
              <motion.div
                key="privacy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="text-3xl font-display mb-6 flex items-center gap-3">
                    <Lock className="w-8 h-8 text-brand-primary" /> Password & Security
                  </h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-white/50 border border-brand-primary/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary/50" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-white/50 border border-brand-primary/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary/50" />
                    </div>
                    <button onClick={handleSave} className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-primary transition-colors flex items-center gap-2">
                      <Save className="w-4 h-4" /> Update Password
                    </button>
                  </div>
                </div>

                <div className="border-t border-brand-primary/10 pt-12">
                  <h2 className="text-3xl font-display mb-6 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-brand-primary" /> Privacy Preferences
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-brand-primary/5">
                      <div>
                        <p className="font-bold text-lg mb-1">Allow External Contact</p>
                        <p className="text-sm text-brand-dark/50">Allow users to view your email and phone number to contact you outside the platform.</p>
                      </div>
                      <button 
                        onClick={() => setPrivacySettings(p => ({ ...p, allowExternalContact: !p.allowExternalContact }))}
                        className={`w-14 h-8 rounded-full p-1 transition-colors ${privacySettings.allowExternalContact ? 'bg-green-500' : 'bg-brand-dark/20'}`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${privacySettings.allowExternalContact ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-brand-primary/5">
                      <div>
                        <p className="font-bold text-lg mb-1">Public Profile Visibility</p>
                        <p className="text-sm text-brand-dark/50">Allow your profile to be discovered on the map by buyers and other artisans.</p>
                      </div>
                      <button 
                        onClick={() => setPrivacySettings(p => ({ ...p, publicProfile: !p.publicProfile }))}
                        className={`w-14 h-8 rounded-full p-1 transition-colors ${privacySettings.publicProfile ? 'bg-green-500' : 'bg-brand-dark/20'}`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${privacySettings.publicProfile ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-3xl font-display mb-8 flex items-center gap-3">
                  <Bell className="w-8 h-8 text-brand-primary" /> Notification Settings
                </h2>
                <div className="space-y-4">
                  {['New Messages', 'Skill Verifications', 'Promotional Offers', 'System Updates'].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-brand-primary/5">
                      <p className="font-bold text-lg">{item}</p>
                      <button className="w-14 h-8 rounded-full p-1 bg-green-500 transition-colors">
                        <div className="w-6 h-6 bg-white rounded-full shadow-md translate-x-6 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'help' && (
              <motion.div
                key="help"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-3xl font-display mb-4 flex items-center gap-3">
                  <HelpCircle className="w-8 h-8 text-brand-primary" /> Help & Feedback
                </h2>
                <p className="text-brand-dark/60 font-medium mb-8">Chat with Hunar AI to get instant help, learn about government schemes, or report an issue.</p>
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-primary/10">
                  <ChatBot />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Toast */}
          <AnimatePresence>
            {showSaved && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-10 right-10 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3 z-50"
              >
                <CheckCircle2 className="w-6 h-6" /> Settings Saved
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
