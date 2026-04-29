import React from 'react';
import { Award, Star, CheckCircle2 } from 'lucide-react';
import { SkillLevel } from '../../types/models';

interface SkillProgressProps {
  skillName: string;
  level: SkillLevel;
  totalLevels?: number;
}

const SkillProgress = ({ skillName, level, totalLevels = 5 }: SkillProgressProps) => {
  return (
    <div className="glass p-6 rounded-3xl border-brand-accent/20 bg-brand-accent/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-accent/20 p-2 rounded-xl">
            <Award className="w-6 h-6 text-brand-accent" />
          </div>
          <h4 className="text-xl font-bold">{skillName}</h4>
        </div>
        <div className="flex items-center gap-1 text-brand-accent">
          <Star className="w-4 h-4 fill-brand-accent" />
          <span className="font-bold">Level {level}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {Array.from({ length: totalLevels }).map((_, i) => (
          <div 
            key={i}
            className={`h-2 flex-grow rounded-full transition-colors ${
              i < level ? 'bg-brand-accent' : 'bg-brand-accent/10'
            }`}
          />
        ))}
      </div>
      
      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-brand-dark/40 uppercase tracking-widest">
        {level === totalLevels ? (
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle2 className="w-3 h-3" /> Master Level Reached
          </span>
        ) : (
          <span>{totalLevels - level} levels to Mastery</span>
        )}
      </div>
    </div>
  );
};

export default SkillProgress;
