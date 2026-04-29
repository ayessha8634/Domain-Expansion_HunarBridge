import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Star, MapPin } from 'lucide-react';

// Fix for default marker icons in React-Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const artisans = [
  { id: 1, name: "Arjun Sharma", craft: "Master Potter", pos: [19.033, 72.85], rating: 4.9 },
  { id: 2, name: "Lila Devi", craft: "Textile Weaver", pos: [19.04, 72.86], rating: 4.8 },
  { id: 3, name: "Vikram Mistri", craft: "Wood Carver", pos: [19.02, 72.84], rating: 5.0 },
];

const Discovery = () => {
  return (
    <div className="pt-24 h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-6 overflow-y-auto">
        <h2 className="text-3xl mb-6">Discover Nearby</h2>
        <div className="space-y-4">
          {artisans.map(a => (
            <div key={a.id} className="glass p-4 rounded-2xl flex items-center gap-4 card-hover cursor-pointer">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="text-brand-primary" />
              </div>
              <div>
                <h4 className="font-bold">{a.name}</h4>
                <p className="text-xs text-brand-dark/60">{a.craft}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-brand-accent fill-brand-accent" />
                  <span className="text-xs font-bold">{a.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-grow relative z-10">
        <MapContainer center={[19.033, 72.85]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {artisans.map(a => (
            <Marker key={a.id} position={a.pos}>
              <Popup>
                <div className="text-center">
                  <h4 className="font-bold">{a.name}</h4>
                  <p className="text-xs">{a.craft}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Discovery;
