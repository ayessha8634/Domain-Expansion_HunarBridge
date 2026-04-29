export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  category: SkillCategory;
  proofUrls?: string[];
}

export type SkillCategory = 
  | 'Tailoring'
  | 'Weaver'
  | 'Carpenter'
  | 'Potter'
  | 'Jewelry'
  | 'Embroidery'
  | 'Leather work'
  | 'Food products'
  | 'Painting'
  | 'Repair work'
  | 'Other';

export interface Artisan {
  id: string;
  name: string;
  bio: string;
  craft: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    state: string;
    district: string;
  };
  rating: number;
  reviewsCount: number;
  profileImage: string;
  portfolioImages: string[];
  voiceIntroUrl?: string;
  verified: boolean;
  trustScore: number;
  skills: Skill[];
  coupons: Coupon[];
  joinedDate: string;
}

export interface Coupon {
  id: string;
  title: string;
  description: string;
  code: string;
  expiryDate: string;
  status: 'active' | 'used' | 'expired';
  rewardType: 'visibility_boost' | 'premium_buyer' | 'brand_connection';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  language: string;
}
