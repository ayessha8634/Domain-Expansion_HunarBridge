import React from 'react';
import { Camera, Map as MapIcon, User, MessageCircle, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/discovery', icon: MapIcon, label: 'Discover' },
    { path: '/onboarding', icon: Camera, label: 'Join' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 md:top-0 md:bottom-auto md:pt-6">
      <div className="mx-auto max-w-lg md:max-w-4xl">
        <div className="glass rounded-2xl md:rounded-full px-6 py-4 flex items-center justify-between">
          <Link to="/" className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-brand-light" />
            </div>
            <span className="font-display font-bold text-xl text-brand-dark">HunarBridge</span>
          </Link>

          <div className="flex items-center justify-between w-full md:w-auto md:gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-colors ${
                    isActive ? 'text-brand-primary' : 'text-brand-dark/50 hover:text-brand-primary'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className="text-[10px] md:text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
