import React from 'react';
import { Home, Map, Camera, MessageCircle, User, Settings, LogOut, Award, Ticket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Overview' },
    { path: '/discovery', icon: Map, label: 'Discovery Map' },
    { path: '/onboarding', icon: Camera, label: 'My Portfolio' },
    { path: '/rewards', icon: Ticket, label: 'Coupon Wallet' },
    { path: '/skills', icon: Award, label: 'Skill Mastery' },
    { path: '/chat', icon: MessageCircle, label: 'Hunar Assistant' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 bg-brand-dark text-brand-light p-8 z-50">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </div>
        <span className="font-display font-bold text-2xl tracking-tight">HunarBridge</span>
      </div>

      <nav className="flex-grow space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                  : 'text-brand-light/40 hover:text-brand-light hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
              <span className="font-bold text-sm uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-8 border-t border-white/10 space-y-4">
        <button className="flex items-center gap-4 px-6 py-2 text-brand-light/40 hover:text-brand-light transition-colors w-full text-left">
          <Settings className="w-5 h-5" />
          <span className="font-bold text-sm uppercase tracking-wider">Settings</span>
        </button>
        <button className="flex items-center gap-4 px-6 py-2 text-red-400 hover:text-red-300 transition-colors w-full text-left">
          <LogOut className="w-5 h-5" />
          <span className="font-bold text-sm uppercase tracking-wider">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
