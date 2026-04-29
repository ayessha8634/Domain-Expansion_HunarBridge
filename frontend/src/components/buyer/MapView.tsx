import React, { useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Navigation, Target, MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Artisan } from '../../types/models';
import { useTranslation } from 'react-i18next';

interface MapViewProps {
  artisans: Artisan[];
  center?: [number, number];
  onLocationChange?: (lat: number, lng: number) => void;
}

// Custom hook to handle map centering
const RecenterMap = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const createCustomIcon = (artisan: Artisan) => {
  const colors = ['#8B4513', '#D2691E', '#CD853F', '#DAA520', '#B8860B'];
  const bgColor = colors[artisan.name.charCodeAt(0) % colors.length];
  
  const html = `
    <div class="relative flex items-center justify-center group">
      <div class="absolute -bottom-1 w-4 h-1 bg-black/20 rounded-full blur-[1px]"></div>
      <div class="w-10 h-14 bg-brand-dark rounded-t-full rounded-b-[40%] flex items-start justify-center pt-1 shadow-xl transition-transform group-hover:-translate-y-1">
        <div class="w-8 h-8 rounded-full border-2 border-white overflow-hidden flex items-center justify-center text-white font-bold text-sm" style="background-color: ${bgColor}">
          ${artisan.profileImage ? `<img src="${artisan.profileImage}" class="w-full h-full object-cover" />` : artisan.name.charAt(0)}
        </div>
      </div>
      <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[8px] border-t-brand-dark"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-map-icon',
    iconSize: [40, 56],
    iconAnchor: [20, 56],
  });
};

const userIcon = L.divIcon({
  html: `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-ping"></div>
      <div class="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
        <div class="w-2 h-2 bg-white rounded-full"></div>
      </div>
    </div>
  `,
  className: 'user-location-icon',
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

const MapView = ({ artisans, center, onLocationChange }: MapViewProps) => {
  const { t } = useTranslation();
  const defaultCenter: [number, number] = [19.033, 72.85]; // Mumbai
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(center || defaultCenter);

  const handleLocateMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserPos([latitude, longitude]);
        setMapCenter([latitude, longitude]);
        onLocationChange?.(latitude, longitude);
      });
    }
  };

  const handleSetManual = () => {
    // Place marker at the current map center to allow dragging
    setUserPos(mapCenter);
    onLocationChange?.(mapCenter[0], mapCenter[1]);
  };

  const eventHandlers = useMemo(
    () => ({
      dragend(e: any) {
        const marker = e.target;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setUserPos([lat, lng]);
          onLocationChange?.(lat, lng);
        }
      },
    }),
    [onLocationChange],
  );

  return (
    <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-brand-primary/10">
      <MapContainer 
        center={mapCenter} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <RecenterMap center={mapCenter} />

        {/* User's Manual/Live Location Marker */}
        {userPos && (
          <Marker 
            position={userPos} 
            icon={userIcon}
            draggable={true}
            eventHandlers={eventHandlers}
          >
            <Popup>
              <div className="font-bold text-brand-primary p-1">
                {t('map.set_manual')}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Artisan Markers */}
        {artisans.map((artisan) => (
          <Marker 
            key={artisan.id} 
            position={[artisan.location.lat, artisan.location.lng]}
            icon={createCustomIcon(artisan)}
          >
            <Popup className="custom-popup">
              <div className="p-2">
                <h3 className="font-bold text-brand-dark">{artisan.name}</h3>
                <p className="text-xs text-brand-primary font-bold uppercase tracking-widest">{artisan.craft}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600 font-bold text-[10px]">
                  <span>{artisan.trustScore}% {t('trust.score')}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Controls */}
      <div className="absolute top-8 right-8 flex flex-col gap-4 z-[1000]">
        <button 
          onClick={handleSetManual}
          className="bg-white text-brand-primary p-4 rounded-3xl shadow-2xl hover:scale-110 transition-all active:bg-brand-primary active:text-white group flex items-center justify-center relative"
          title="Set location manually by dragging the marker"
        >
          <div className="absolute right-16 bg-white px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
            Set Manually
          </div>
          <MapPin className="w-8 h-8" />
        </button>
        <button 
          onClick={handleLocateMe}
          className="bg-white text-brand-primary p-4 rounded-3xl shadow-2xl hover:scale-110 transition-all active:bg-brand-primary active:text-white group flex items-center justify-center relative"
          title={t('map.locate_me')}
        >
          <div className="absolute right-16 bg-white px-3 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
            Auto Locate
          </div>
          <Target className="w-8 h-8" />
        </button>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000]">
        <div className="bg-brand-primary text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
          <MapPin className="w-5 h-5" />
          <span className="font-bold text-sm whitespace-nowrap">{t('map.nearby_artisans')}</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
