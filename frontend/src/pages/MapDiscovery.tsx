import React, { useState, useEffect } from 'react';
import MapView from '../components/buyer/MapView';
import { Artisan } from '../types/models';
import { Search, SlidersHorizontal, ShieldCheck, MapPin } from 'lucide-react';
import LocationPrompt from '../components/LocationPrompt';

const MOCK_ARTISANS: Artisan[] = [
  {
    id: '1',
    name: "Arjun Sharma",
    craft: "Potter",
    bio: "20 years of pottery experience.",
    location: { lat: 19.033, lng: 72.85, address: "Dharavi", state: "Maharashtra", district: "Mumbai" },
    rating: 4.9,
    reviewsCount: 128,
    profileImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400",
    portfolioImages: [],
    verified: true,
    trustScore: 98,
    skills: [],
    coupons: [],
    joinedDate: "2024-01-01"
  },
  {
    id: '2',
    name: "Sunita Devi",
    craft: "Weaver",
    bio: "Traditional Handloom Master.",
    location: { lat: 19.040, lng: 72.86, address: "Sion", state: "Maharashtra", district: "Mumbai" },
    rating: 4.8,
    reviewsCount: 85,
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    portfolioImages: [],
    verified: true,
    trustScore: 95,
    skills: [],
    coupons: [],
    joinedDate: "2024-01-01"
  },
  {
    id: '3',
    name: "Rajesh Kumar",
    craft: "Carpenter",
    bio: "Furniture specialist.",
    location: { lat: 19.030, lng: 72.84, address: "Mahim", state: "Maharashtra", district: "Mumbai" },
    rating: 4.7,
    reviewsCount: 42,
    profileImage: "", // Will show initial 'R'
    verified: false,
    trustScore: 75,
    skills: [],
    coupons: [],
    joinedDate: "2024-02-01"
  }
];

// Helper to calculate distance in km
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
};

const MapDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [hasPrompted, setHasPrompted] = useState(false);

  useEffect(() => {
    if (!hasPrompted && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          setHasPrompted(true);
        },
        (error) => {
          console.warn("Location access denied or error:", error);
          setHasPrompted(true);
        }
      );
    }
  }, [hasPrompted]);

  const filteredArtisans = MOCK_ARTISANS.filter(artisan => {
    const matchesSearch = artisan.craft.toLowerCase().includes(searchQuery.toLowerCase()) || artisan.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // If user location is known, only show artisans within 10km
    let isNearby = true;
    let distance = 0;
    if (userLocation) {
      distance = getDistance(userLocation.lat, userLocation.lng, artisan.location.lat, artisan.location.lng);
      isNearby = distance <= 10;
    }
    
    return matchesSearch && isNearby;
  });

  return (
    <div className="pt-32 h-[calc(100vh-20px)] flex flex-col overflow-hidden">

      <div className="px-6 py-4 glass mx-6 rounded-[2.5rem] mb-4 flex items-center gap-4 border-brand-primary/10 shadow-xl">
        <div className="flex-grow relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-dark/30 w-5 h-5" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills (e.g. Potter, Weaver)..." 
            className="w-full bg-brand-light/50 pl-16 pr-6 py-5 rounded-2xl outline-none font-bold text-lg placeholder:text-brand-dark/20 focus:bg-white/80 transition-all"
          />
        </div>
        <button className="bg-brand-primary text-white p-5 rounded-2xl shadow-lg hover:bg-brand-dark transition-all hover:scale-105 active:scale-95">
          <SlidersHorizontal className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow relative mx-6 mb-6">
        <MapView 
          artisans={filteredArtisans} 
          center={userLocation ? [userLocation.lat, userLocation.lng] : undefined} 
          onLocationChange={(lat, lng) => setUserLocation({ lat, lng })}
        />
        
        <div className="absolute bottom-10 left-6 right-6 z-[1000] flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {filteredArtisans.length > 0 ? filteredArtisans.map(a => {
            const dist = userLocation ? getDistance(userLocation.lat, userLocation.lng, a.location.lat, a.location.lng).toFixed(1) : '?';
            return (
              <div key={a.id} className="glass min-w-[320px] p-6 rounded-[2.5rem] flex items-center gap-6 shadow-2xl border-brand-primary/10 bg-white/95 backdrop-blur-2xl hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="w-20 h-20 rounded-3xl overflow-hidden shrink-0 shadow-lg bg-brand-primary/10 flex items-center justify-center font-bold text-2xl text-brand-primary">
                  {a.profileImage ? <img src={a.profileImage} className="w-full h-full object-cover" /> : a.name.charAt(0)}
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-xl mb-1">{a.name}</h4>
                  <p className="text-xs text-brand-primary font-bold uppercase tracking-widest mb-3">{a.craft}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-green-600">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{a.trustScore}% Trust</span>
                    </div>
                    <div className="flex items-center gap-1 text-brand-dark/40">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{userLocation ? `${dist} km` : 'Nearby'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="glass p-8 rounded-[2rem] bg-white/90 font-bold text-brand-dark/40 text-center w-full">
              No artisans found nearby. Try moving the map or expanding your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapDiscovery;
