import React from 'react';
import { BadgeCheck, MapPin, Star, Phone, MessageSquare, Award, Camera, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const ArtisanProfile = () => {
  const artisan = {
    name: "Arjun Sharma",
    craft: "Master Potter",
    location: "Dharavi, Mumbai",
    rating: 4.9,
    reviews: 128,
    image: "/images/potter.png",
    verified: true,
    bio: "I have been working with clay for over 20 years. My craft was passed down to me by my father, and I specialize in traditional terracotta and contemporary glazed pottery.",
    skills: ["Terracotta", "Glazing", "Kiln Management", "Custom Design"],
    gallery: [
      "/images/gallery/vases.png",
      "/images/gallery/textile.png",
      "/images/gallery/chair.png",
      "/images/potter.png"
    ]
  };

  return (
    <div className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full md:w-80 aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" />
          {artisan.verified && (
            <div className="absolute top-6 right-6 bg-brand-primary p-2 rounded-full shadow-lg">
              <BadgeCheck className="w-6 h-6 text-white" />
            </div>
          )}
        </motion.div>

        <div className="flex-grow pt-4">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-5xl md:text-6xl">{artisan.name}</h1>
          </div>
          <p className="text-2xl text-brand-primary font-medium mb-6">{artisan.craft}</p>
          
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-brand-dark/60 font-medium">
              <MapPin className="w-5 h-5" />
              <span>{artisan.location}</span>
            </div>
            <div className="flex items-center gap-2 text-brand-dark/60 font-medium">
              <Star className="w-5 h-5 text-brand-accent fill-brand-accent" />
              <span>{artisan.rating} ({artisan.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 card-hover shadow-lg shadow-brand-primary/20">
              <Phone className="w-5 h-5" /> Contact
            </button>
            <button className="glass px-8 py-4 rounded-2xl font-bold flex items-center gap-2 card-hover">
              <MessageSquare className="w-5 h-5" /> Message
            </button>
          </div>
        </div>
      </div>

      {/* Bio & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
        <div className="md:col-span-2">
          <h2 className="text-3xl mb-6">My Story</h2>
          <div className="glass p-8 rounded-[2rem] bg-white/50 leading-relaxed text-lg text-brand-dark/80">
            {artisan.bio}
          </div>
        </div>
        <div>
          <h2 className="text-3xl mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {artisan.skills.map(skill => (
              <span key={skill} className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-bold text-sm">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-8 glass p-6 rounded-2xl flex items-center gap-4 border-brand-accent/20 bg-brand-accent/5">
            <Award className="w-10 h-10 text-brand-accent" />
            <div>
              <p className="font-bold text-brand-accent">Community Verified</p>
              <p className="text-xs text-brand-dark/50">Trusted by 45 local artisans</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Portfolio Gallery */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl">Visual Portfolio</h2>
          <div className="flex gap-2">
            <div className="glass p-3 rounded-xl"><Camera className="w-5 h-5" /></div>
            <div className="glass p-3 rounded-xl"><Play className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {artisan.gallery.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="aspect-square rounded-3xl overflow-hidden shadow-lg"
            >
              <img src={img} alt="work" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;
