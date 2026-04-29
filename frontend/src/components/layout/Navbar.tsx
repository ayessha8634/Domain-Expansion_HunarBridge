import React, { useState } from 'react';
import { Camera, Map as MapIcon, Home, Menu, X, LayoutDashboard, Award, Ticket, User as UserIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import DropdownMenu from './DropdownMenu';

interface NavbarProps {
  onOpenSettings: () => void;
}

const Navbar = ({ onOpenSettings }: NavbarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isDashOpen, setIsDashOpen] = useState(false);
  
  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/discovery', icon: MapIcon, label: t('nav.discover') },
    { path: '/onboarding', icon: Camera, label: t('common.join_as_artisan') },
  ];

  const dashItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { path: '/skills', icon: Award, label: 'My Skills' },
    { path: '/rewards', icon: Ticket, label: 'Rewards' },
    { path: '/profile/1', icon: UserIcon, label: 'My Profile' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 pt-6">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Dashboard Hamburger Corner */}
        <div className="relative">
          <button 
            onClick={() => setIsDashOpen(!isDashOpen)}
            className="bg-brand-dark text-white p-4 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border border-white/10"
          >
            {isDashOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <AnimatePresence>
            {isDashOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                className="absolute left-0 mt-4 w-64 glass rounded-[2.5rem] border-brand-primary/10 shadow-2xl overflow-hidden bg-white/95 backdrop-blur-3xl p-6"
              >
                <p className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-widest mb-6 px-2">Workspaces</p>
                <div className="space-y-2">
                  {dashItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsDashOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-brand-primary/5 text-brand-dark/60 hover:text-brand-primary transition-all group"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center Floating Nav */}
        <div className="glass rounded-full px-8 py-3 flex items-center gap-10 border-brand-primary/10 shadow-xl ml-4 mr-4">
          <Link to="/" className="flex items-center gap-2 mr-4 border-r border-brand-dark/5 pr-6">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-brand-light" />
            </div>
            <span className="font-display font-bold text-xl text-brand-dark italic hidden md:block">Hunar</span>
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 transition-colors ${
                    isActive ? 'text-brand-primary' : 'text-brand-dark/50 hover:text-brand-primary'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className="text-xs font-bold uppercase tracking-widest hidden sm:block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="hidden md:block">
          <DropdownMenu onOpenSettings={onOpenSettings} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
