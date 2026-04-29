import React, { useState } from 'react';
import SkillProgress from '../components/artisan/SkillProgress';
import LearnerProgression from '../components/learner/LearnerProgression';
import GovernmentSchemes from '../components/learner/GovernmentSchemes';
import { Award, Star, ShieldCheck, Zap, Info } from 'lucide-react';
import Button from '../components/common/Button';

const SkillsPage = () => {
  const [isSchemesOpen, setIsSchemesOpen] = useState(false);
  const userRole = localStorage.getItem('hunarbridge_user_role') || 'learner';

  const artisanSkills = [
    { name: 'Wheel Pottery', level: 5, category: 'Potter' },
    { name: 'Glazing Techniques', level: 3, category: 'Potter' },
    { name: 'Clay Preparation', level: 4, category: 'Potter' },
  ];

  const learnerSkills = [
    { name: 'Basic Woodworking', level: 2, category: 'Carpenter' },
    { name: 'Tool Safety & Handling', level: 4, category: 'General' },
    { name: 'Sanding & Finishing', level: 1, category: 'Carpenter' },
  ];

  const skills = userRole === 'artisan' ? artisanSkills : learnerSkills;

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-5xl font-display mb-2">{userRole === 'artisan' ? 'Skill Mastery' : 'Learning Path'}</h1>
          <p className="text-brand-dark/40 font-bold uppercase tracking-widest text-xs">
            {userRole === 'artisan' ? 'Track your professional growth and expertise' : 'Complete levels to earn rewards and unlock schemes'}
          </p>
        </div>
        <Button variant="primary">Add New Skill</Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          
          {userRole === 'learner' && (
            <LearnerProgression 
              level={5} 
              coins={500} 
              onUnlockSchemes={() => setIsSchemesOpen(true)} 
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, i) => (
              <SkillProgress key={i} skillName={skill.name} level={skill.level as any} />
            ))}
          </div>

          <div className="glass p-10 rounded-[3rem] border-brand-primary/5">
            <h3 className="text-2xl font-display mb-8">Verification History</h3>
            <div className="space-y-6">
              {[
                { skill: skills[0].name, status: userRole === 'artisan' ? 'Master Verified' : 'Course Completed', date: 'April 15, 2026', icon: ShieldCheck, color: 'text-green-500' },
                { skill: skills[1].name, status: 'Pending Review', date: 'April 28, 2026', icon: Zap, color: 'text-amber-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-brand-primary/5 transition-all">
                  <div className="flex gap-4 items-center">
                    <div className={`p-3 rounded-xl bg-white shadow-sm ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-lg leading-none mb-1">{item.skill}</p>
                      <p className="text-[10px] text-brand-dark/40 font-bold uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white border border-brand-primary/10 ${item.color}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass p-8 rounded-[2.5rem] bg-brand-accent text-brand-dark border-none shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8" />
              <h3 className="text-2xl font-display uppercase tracking-tight">Master Level</h3>
            </div>
            <p className="font-bold text-sm leading-relaxed mb-8 opacity-80">
              Reaching Level 5 in any skill unlocks the "Verified Master" badge on your profile and doubles your trust score.
            </p>
            <div className="bg-white/30 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest">Global Rank</span>
                <span className="font-bold text-xl">#42</span>
              </div>
              <div className="h-1 bg-white/20 rounded-full">
                <div className="w-3/4 h-full bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem] border-brand-primary/5">
            <div className="flex items-center gap-2 mb-4 text-brand-primary">
              <Info className="w-5 h-5" />
              <h4 className="font-bold uppercase tracking-widest text-xs">Skill Tips</h4>
            </div>
            <p className="text-sm font-medium text-brand-dark/60 leading-relaxed italic">
              {userRole === 'artisan' 
                ? `"Upload a short video of you working on the wheel to get your ${skills[0].name} skill verified faster by the community."`
                : `"Practice your ${skills[0].name} daily and submit a picture of your work to gain extra coins."`
              }
            </p>
          </div>
        </div>
      </div>

      <GovernmentSchemes isOpen={isSchemesOpen} onClose={() => setIsSchemesOpen(false)} />
    </div>
  );
};

export default SkillsPage;
