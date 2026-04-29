import React from 'react';
import { BadgeCheck, MapPin, Star } from 'lucide-react';

const ArtisanCard = ({ name, craft, location, rating, image, verified }) => {
  return (
    <div className="glass rounded-[2rem] overflow-hidden card-hover flex flex-col h-full">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <div className="glass bg-white/40 px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 text-brand-accent fill-brand-accent" />
            <span className="text-xs font-bold">{rating}</span>
          </div>
        </div>
        {verified && (
          <div className="absolute top-4 right-4">
            <div className="bg-brand-primary p-1.5 rounded-full shadow-lg">
              <BadgeCheck className="w-4 h-4 text-brand-light" />
            </div>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-display font-bold leading-tight">{name}</h3>
            <p className="text-brand-primary font-medium text-sm">{craft}</p>
          </div>
        </div>
        <div className="mt-auto pt-4 flex items-center gap-1 text-brand-dark/50 text-sm">
          <MapPin className="w-3 h-3" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard;
