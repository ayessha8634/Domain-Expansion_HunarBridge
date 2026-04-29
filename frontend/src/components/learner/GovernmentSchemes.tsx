import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Briefcase, Wrench, Sprout, Landmark } from 'lucide-react';

interface GovernmentSchemesProps {
  isOpen: boolean;
  onClose: () => void;
}

const schemes = [
  {
    title: 'PM Vishwakarma Yojana',
    desc: 'The Universal Artisan Scheme for 18 traditional trades.',
    benefits: ['₹15,000 Toolkit e-voucher', 'Collateral-free loans up to ₹3 lakh @ 5%', '₹500 daily stipend during training', 'Official ID & Certificate'],
    icon: Wrench,
    color: 'text-orange-600',
    bg: 'bg-orange-100',
  },
  {
    title: 'PM Formalisation of Micro Food Processing (PMFME)',
    desc: 'For scaling up small home-based food units.',
    benefits: ['35% capital subsidy (up to ₹10 lakh)', '₹40,000 seed capital for SHGs', '50% grant for branding & marketing'],
    icon: Sprout,
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  {
    title: 'Prime Minister’s Employment Generation Programme (PMEGP)',
    desc: 'Job Creation scheme for new micro-enterprises.',
    benefits: ['Loans up to ₹50 lakh for manufacturing', '15%-35% Margin Money subsidy', 'No income ceiling for setting up projects'],
    icon: Briefcase,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  {
    title: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
    desc: 'Recognition of Prior Learning (RPL).',
    benefits: ['Formal assessment & certification', 'Monetary reward (~₹500)', '3-year personal accident insurance'],
    icon: Building2,
    color: 'text-purple-600',
    bg: 'bg-purple-100',
  },
  {
    title: 'Sector-Specific Support',
    desc: 'National Handicrafts Development Programme & Weaver MUDRA Scheme.',
    benefits: ['Free stalls in national exhibitions (Gandhi Shilp Bazar)', 'Concessional credit at 6% interest', 'Margin money assistance'],
    icon: Briefcase,
    color: 'text-teal-600',
    bg: 'bg-teal-100',
  }
];

const GovernmentSchemes = ({ isOpen, onClose }: GovernmentSchemesProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass bg-white/95 rounded-[3rem] p-8 md:p-12 shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-3 rounded-full hover:bg-brand-primary/10 text-brand-dark/50 hover:text-brand-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
              <Landmark className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-display text-brand-dark">Government Mentoring</h2>
              <p className="text-brand-dark/50 font-bold uppercase tracking-widest text-sm mt-1">Integrated Official Schemes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme, idx) => (
              <div key={idx} className="p-6 rounded-[2rem] border border-brand-primary/10 hover:border-brand-primary/30 transition-all bg-white shadow-sm hover:shadow-md">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${scheme.bg} ${scheme.color}`}>
                  <scheme.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 leading-tight">{scheme.title}</h3>
                <p className="text-sm text-brand-dark/60 mb-4">{scheme.desc}</p>
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/30 mb-2">Key Benefits</p>
                  <ul className="space-y-2">
                    {scheme.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                        <span className="text-brand-dark/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="mt-6 w-full py-3 rounded-xl border-2 border-brand-primary text-brand-primary font-bold hover:bg-brand-primary hover:text-white transition-colors text-sm">
                  Apply Now via JanSamarth
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GovernmentSchemes;
