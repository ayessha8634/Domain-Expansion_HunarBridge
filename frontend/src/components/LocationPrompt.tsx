import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './common/Button';

interface LocationPromptProps {
  onLocationSelected: (lat: number, lng: number, address: string) => void;
}

const LocationPrompt = ({ onLocationSelected }: LocationPromptProps) => {
  const [show, setShow] = useState(true);
  const [manualMode, setManualMode] = useState(false);
  const [address, setAddress] = useState('');

  const handleLiveLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        onLocationSelected(position.coords.latitude, position.coords.longitude, "Current Location");
        setShow(false);
      }, (error) => {
        console.error("Location error:", error);
        setManualMode(true);
      });
    } else {
      setManualMode(true);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/40 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass max-w-md w-full p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary" />
        
        <div className="bg-brand-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto">
          <MapPin className="w-10 h-10 text-brand-primary" />
        </div>

        <h2 className="text-4xl font-display text-center mb-4">Find Artisans Near You</h2>
        <p className="text-center text-brand-dark/60 mb-10 leading-relaxed font-medium">
          HunarBridge works best with your location. See masters in your own neighborhood.
        </p>

        {!manualMode ? (
          <div className="space-y-4">
            <Button size="lg" className="w-full" onClick={handleLiveLocation}>
              <Navigation className="w-5 h-5 mr-2" /> Use Live Location
            </Button>
            <Button size="lg" variant="ghost" className="w-full" onClick={() => setManualMode(true)}>
              Enter Location Manually
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-dark/30" />
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your city or district..."
                className="w-full bg-brand-light/50 pl-12 pr-4 py-4 rounded-2xl outline-none font-bold text-lg"
              />
            </div>
            <Button 
              size="lg" 
              className="w-full" 
              disabled={!address} 
              onClick={() => {
                onLocationSelected(19.033, 72.85, address); // Mock coordinates for manual entry
                setShow(false);
              }}
            >
              Set Location
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LocationPrompt;
