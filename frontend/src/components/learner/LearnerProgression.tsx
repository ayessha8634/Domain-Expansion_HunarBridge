import React from 'react';
import { Award, Target, Star, ChevronRight, Unlock } from 'lucide-react';
import { motion } from 'framer-motion';

interface LearnerProgressionProps {
  level: number;
  coins: number;
  onUnlockSchemes: () => void;
}

const LearnerProgression = ({ level, coins, onUnlockSchemes }: LearnerProgressionProps) => {
  const maxLevel = 5;
  const progressPercentage = (level / maxLevel) * 100;

  return (
    <div className="space-y-6">
      <div className="glass p-8 rounded-[2.5rem] border-brand-primary/5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
        
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div>
            <h3 className="text-3xl font-display flex items-center gap-3">
              <Target className="w-8 h-8 text-brand-primary" />
              Learning Journey
            </h3>
            <p className="text-sm font-bold text-brand-dark/40 uppercase tracking-widest mt-1">Level {level} of {maxLevel}</p>
          </div>
          <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-sm">
            <Star className="w-5 h-5 fill-current" />
            <span>{coins} Coins</span>
          </div>
        </div>

        <div className="relative z-10 mb-8">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-2">
            <span>Beginner</span>
            <span>Mastery</span>
          </div>
          <div className="h-4 bg-brand-light/50 rounded-full overflow-hidden border border-brand-primary/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-brand-primary/80 to-brand-primary rounded-full relative"
            >
              <div className="absolute top-0 right-0 bottom-0 w-20 bg-white/20 -skew-x-12 animate-pulse" />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 relative z-10">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div key={lvl} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                lvl <= level 
                  ? 'bg-brand-primary border-brand-primary text-white shadow-lg' 
                  : 'bg-white border-brand-primary/20 text-brand-dark/40'
              }`}>
                {lvl}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">Lvl {lvl}</span>
            </div>
          ))}
        </div>
      </div>

      {level >= maxLevel ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-[2.5rem] bg-green-50/80 border-green-500/20 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform"
          onClick={onUnlockSchemes}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                <Unlock className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-display text-green-800">Mastery Achieved!</h4>
                <p className="text-sm font-medium text-green-700/80">You've unlocked Government Mentoring Sessions.</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-green-500" />
          </div>
        </motion.div>
      ) : (
        <div className="glass p-6 rounded-3xl border-brand-primary/5 flex items-center gap-4 opacity-70">
          <div className="p-3 bg-brand-light rounded-xl">
            <Award className="w-6 h-6 text-brand-dark/30" />
          </div>
          <p className="text-sm font-bold text-brand-dark/50">Reach Level 5 to unlock Government Mentoring Sessions & Schemes.</p>
        </div>
      )}
    </div>
  );
};

export default LearnerProgression;
