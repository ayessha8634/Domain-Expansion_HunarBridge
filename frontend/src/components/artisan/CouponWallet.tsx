import React from 'react';
import { Ticket, Zap, Users, ExternalLink } from 'lucide-react';
import { Coupon } from '../../types/models';
import Button from '../common/Button';

interface CouponWalletProps {
  coupons: Coupon[];
}

const CouponWallet = ({ coupons }: CouponWalletProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'visibility_boost': return <Zap className="w-6 h-6" />;
      case 'premium_buyer': return <Users className="w-6 h-6" />;
      case 'brand_connection': return <ExternalLink className="w-6 h-6" />;
      default: return <Ticket className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl">My Rewards</h3>
        <span className="bg-brand-primary text-white px-4 py-1 rounded-full text-xs font-bold">
          {coupons.filter(c => c.status === 'active').length} Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coupons.map((coupon) => (
          <div 
            key={coupon.id} 
            className={`glass p-6 rounded-[2rem] relative overflow-hidden transition-all hover:shadow-2xl ${
              coupon.status !== 'active' ? 'opacity-50' : 'border-l-4 border-l-brand-primary'
            }`}
          >
            <div className="flex gap-4 items-start">
              <div className="bg-brand-primary/10 p-3 rounded-2xl text-brand-primary">
                {getIcon(coupon.rewardType)}
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-lg leading-tight mb-1">{coupon.title}</h4>
                <p className="text-xs text-brand-dark/50 mb-4">{coupon.description}</p>
                <div className="flex items-center justify-between">
                  <code className="bg-brand-dark/5 px-2 py-1 rounded font-mono text-sm">
                    {coupon.code}
                  </code>
                  <Button size="sm" variant={coupon.status === 'active' ? 'primary' : 'ghost'} disabled={coupon.status !== 'active'}>
                    Use Now
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Cut-out circles for ticket effect */}
            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-brand-light rounded-full transform -translate-y-1/2" />
            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-brand-light rounded-full transform -translate-y-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponWallet;
