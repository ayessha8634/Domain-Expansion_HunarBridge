import React from 'react';
import CouponWallet from '../components/artisan/CouponWallet';
import { Coupon } from '../types/models';
import { Sparkles, Gift, TrendingUp } from 'lucide-react';

const RewardsPage = () => {
  const mockCoupons: Coupon[] = [
    { id: 'c1', title: 'Local Visibility Boost', description: 'Your profile will appear in the top 3 results for 48 hours.', code: 'BOOST48', expiryDate: '2026-05-15', status: 'active', rewardType: 'visibility_boost' },
    { id: 'c2', title: 'Premium Buyer Access', description: 'Unlock direct contact with boutique hotel owners.', code: 'HOTELPRO', expiryDate: '2026-06-01', status: 'active', rewardType: 'premium_buyer' },
    { id: 'c3', title: 'Exhibition Invite', description: 'Free entry to the National Artisan Fair 2026.', code: 'FAIRFREE', expiryDate: '2026-05-20', status: 'used', rewardType: 'brand_connection' },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-display mb-2">Rewards & Benefits</h1>
          <p className="text-brand-dark/40 font-bold uppercase tracking-widest text-xs">Unlock premium features with your activity</p>
        </div>
        <div className="flex items-center gap-4 bg-brand-accent/10 px-6 py-3 rounded-2xl border border-brand-accent/20">
          <Sparkles className="w-5 h-5 text-brand-accent" />
          <span className="font-bold text-brand-dark">2,450 Tokens</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CouponWallet coupons={mockCoupons} />
        </div>
        
        <div className="space-y-8">
          <div className="glass p-8 rounded-[2.5rem] bg-brand-primary text-white border-none shadow-2xl">
            <Gift className="w-12 h-12 mb-6 opacity-50" />
            <h3 className="text-2xl font-display mb-4">How to earn more?</h3>
            <ul className="space-y-4">
              {[
                { label: 'Complete your story', points: '+500' },
                { label: 'Upload 5 portfolio pieces', points: '+200' },
                { label: 'Get a 5-star review', points: '+100' },
                { label: 'Verify your ID', points: '+1000' }
              ].map((item, i) => (
                <li key={i} className="flex items-center justify-between text-sm font-bold bg-white/10 p-3 rounded-xl">
                  <span className="uppercase tracking-wider">{item.label}</span>
                  <span className="text-brand-accent">{item.points}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border-brand-primary/5">
            <h3 className="text-xl font-display mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { action: 'Redeemed Visibility Boost', time: '2 hours ago', icon: TrendingUp },
                { action: 'Earned 200 Tokens', time: 'Yesterday', icon: Sparkles }
              ].map((activity, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="bg-brand-primary/10 p-2 rounded-lg">
                    <activity.icon className="w-4 h-4 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-dark leading-none mb-1">{activity.action}</p>
                    <p className="text-[10px] text-brand-dark/40 font-bold uppercase tracking-widest">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
