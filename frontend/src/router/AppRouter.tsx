import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import HomePage from '../pages/HomePage';
import MapDiscovery from '../pages/MapDiscovery';
import ArtisanOnboarding from '../pages/ArtisanOnboarding';
import ProfileView from '../pages/ProfileView';
import RewardsPage from '../pages/RewardsPage';
import SkillsPage from '../pages/SkillsPage';
import SettingsView from '../pages/SettingsView';
import Overview from '../components/dashboard/Overview';
import SettingsModal from '../components/layout/SettingsModal';
import ChatBot from '../components/ai/ChatBot';

const AppRouter = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-brand-light text-brand-dark font-body relative">
        <Navbar onOpenSettings={() => { window.location.href = '/settings'; }} />
        
        <main className="pb-24 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<div className="pt-32 px-6 max-w-7xl mx-auto"><Overview /></div>} />
            <Route path="/discovery" element={<MapDiscovery />} />
            <Route path="/onboarding" element={<ArtisanOnboarding />} />
            <Route path="/rewards" element={<RewardsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/profile/:id" element={<ProfileView />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
          onOpenHelp={() => {
            setIsSettingsOpen(false);
            setIsChatOpen(true);
          }}
        />

        {/* Global AI Assistant Toggle */}
        <div className="fixed bottom-8 right-8 z-[100]">
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="mb-6 w-[400px] shadow-2xl"
              >
                <div className="relative">
                  <ChatBot />
                  <button 
                    onClick={() => setIsChatOpen(false)}
                    className="absolute top-4 right-4 text-white hover:text-brand-secondary transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-16 h-16 bg-brand-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          >
            {isChatOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
          </button>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
