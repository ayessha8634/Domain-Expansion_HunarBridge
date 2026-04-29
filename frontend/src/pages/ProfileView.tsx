import React, { useState } from 'react';
import { BadgeCheck, MapPin, Star, Phone, MessageSquare, ShieldCheck, Camera, Play, Plus, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import SkillProgress from '../components/artisan/SkillProgress';
import CouponWallet from '../components/artisan/CouponWallet';
import Button from '../components/common/Button';
import { Artisan } from '../types/models';

const ProfileView = () => {
  const userName = localStorage.getItem('hunarbridge_user_name') || 'Guest User';
  const userRole = localStorage.getItem('hunarbridge_user_role') || 'learner';

  const artisan: Artisan = {
    id: '1',
    name: userName,
    craft: userRole === 'artisan' ? 'Master Potter' : 'Enthusiastic Learner',
    bio: userRole === 'artisan' 
      ? "I have been working with clay for over 20 years. My craft was passed down to me by my father, and I specialize in traditional terracotta and contemporary glazed pottery."
      : "I am passionate about learning traditional Indian crafts. Currently exploring pottery and woodworking to connect with our heritage.",
    location: { lat: 19.033, lng: 72.85, address: "Local Community", state: "Maharashtra", district: "Mumbai" },
    rating: 4.9,
    reviewsCount: 128,
    profileImage: "/images/potter.png",
    portfolioImages: [],
    verified: true,
    trustScore: 98,
    skills: userRole === 'artisan' ? [
      { id: 's1', name: 'Wheel Pottery', level: 5, category: 'Potter' },
      { id: 's2', name: 'Glazing', level: 3, category: 'Potter' }
    ] : [
      { id: 'l1', name: 'Basic Woodworking', level: 2, category: 'Carpenter' }
    ],
    coupons: [],
    joinedDate: "2024-01-01"
  };

  return (
    <div className="pt-24 pb-32 px-6 max-w-6xl mx-auto">
      {/* Top Profile Card */}
      <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full md:w-96 aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl bg-brand-primary/10 flex items-center justify-center border-4 border-white"
        >
          {artisan.profileImage ? (
             <img src={artisan.profileImage} alt={artisan.name} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
          ) : null}
          {!artisan.profileImage && <User className="w-32 h-32 text-brand-primary/50" />}
          
          <button className="absolute bottom-6 right-6 bg-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform text-brand-primary">
            <Camera className="w-6 h-6" />
          </button>
          
          {artisan.verified && (
            <div className="absolute top-8 right-8 bg-brand-primary p-3 rounded-full shadow-lg">
              <BadgeCheck className="w-8 h-8 text-white" />
            </div>
          )}
        </motion.div>

        <div className="flex-grow pt-8">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-6xl md:text-7xl font-display">{artisan.name}</h1>
            <p className="text-2xl text-brand-primary font-bold uppercase tracking-widest">{artisan.craft}</p>
          </div>
          
          <div className="flex flex-wrap gap-8 mb-10">
            <div className="flex items-center gap-2 text-brand-dark/60 font-bold">
              <MapPin className="w-5 h-5 text-brand-primary" />
              <span>{artisan.location.address}, {artisan.location.district}</span>
            </div>
            <div className="flex items-center gap-2 text-brand-dark/60 font-bold">
              <Star className="w-5 h-5 text-brand-accent fill-brand-accent" />
              <span>{artisan.rating} Rating</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-bold">
              <ShieldCheck className="w-5 h-5" />
              <span>{artisan.trustScore}% Trust Score</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="px-10">
              <Plus className="w-5 h-5 mr-2" /> Edit Profile
            </Button>
            <Button size="lg" variant="outline">
              <MessageSquare className="w-5 h-5 mr-2" /> Messages
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
        <div className="lg:col-span-2 space-y-16">
          <section>
            <h2 className="text-4xl font-display mb-8">My Story</h2>
            <div className="glass p-10 rounded-[3rem] text-xl leading-relaxed text-brand-dark/70 border-brand-primary/5">
              {artisan.bio}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-display">Portfolio Gallery</h2>
              <div className="flex gap-2">
                <button className="glass px-4 py-2 rounded-2xl flex items-center gap-2 hover:bg-brand-primary/10 transition-colors text-sm font-bold">
                  <Upload className="w-4 h-4" /> Add Image
                </button>
                <button className="glass px-4 py-2 rounded-2xl flex items-center gap-2 hover:bg-brand-primary/10 transition-colors text-sm font-bold">
                  <Play className="w-4 h-4" /> Add Video
                </button>
              </div>
            </div>
            {artisan.portfolioImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-6">
                {artisan.portfolioImages.map((img, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                    className="aspect-square rounded-[3rem] overflow-hidden shadow-xl"
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass p-12 rounded-[3rem] flex flex-col items-center justify-center text-center border-dashed border-2 border-brand-primary/20">
                <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Camera className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-display mb-2">Showcase Your Work</h3>
                <p className="text-brand-dark/50 mb-6 max-w-md">Upload photos or videos of your masterpieces to build trust and attract buyers.</p>
                <Button>Upload Media</Button>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-12">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display">My Skills</h2>
              <button className="p-2 bg-brand-primary/10 text-brand-primary rounded-xl hover:scale-110 transition-transform">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {artisan.skills.map(skill => (
                <SkillProgress key={skill.id} skillName={skill.name} level={skill.level} />
              ))}
            </div>
          </section>
          
          {userRole === 'artisan' && (
            <section>
              <CouponWallet coupons={artisan.coupons} />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

import { User } from 'lucide-react';
export default ProfileView;
