import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import VoiceRecorder from '../components/artisan/VoiceRecorder';
import CameraUpload from '../components/artisan/CameraUpload';
import Button from '../components/common/Button';
import { SkillCategory } from '../types/models';

const SKILL_CATEGORIES: SkillCategory[] = [
  'Tailoring', 'Weaver', 'Carpenter', 'Potter', 'Jewelry', 
  'Embroidery', 'Leather work', 'Food products', 'Painting', 'Repair work', 'Other'
];

const ArtisanOnboarding = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    skill: '' as SkillCategory,
    transcript: '',
    images: [] as string[]
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <div className="pt-24 md:pt-32 pb-32 px-6 max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-16 px-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex-grow flex flex-col gap-2">
            <div className={`h-2 rounded-full transition-all duration-500 ${
              step >= i ? 'bg-brand-primary' : 'bg-brand-dark/10'
            }`} />
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              step >= i ? 'text-brand-primary' : 'text-brand-dark/30'
            }`}>Step 0{i}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-5xl font-display mb-4">Choose your craft</h2>
            <p className="text-xl text-brand-dark/60 mb-10">Select the primary skill you want to showcase.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
              {SKILL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setData({ ...data, skill: cat })}
                  className={`p-6 rounded-3xl font-bold transition-all text-sm ${
                    data.skill === cat 
                      ? 'bg-brand-primary text-white shadow-xl scale-105' 
                      : 'glass hover:bg-brand-primary/5 text-brand-dark/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Button 
              size="lg" 
              className="w-full" 
              disabled={!data.skill} 
              onClick={nextStep}
            >
              Continue <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-5xl font-display mb-4">Tell your story</h2>
            <p className="text-xl text-brand-dark/60 mb-10">Use your voice to describe your journey and passion.</p>
            
            <VoiceRecorder onTranscriptComplete={(text) => setData({ ...data, transcript: text })} />

            <div className="flex gap-4 mt-12">
              <Button variant="ghost" onClick={prevStep}><ChevronLeft className="mr-2" /> Back</Button>
              <Button className="flex-grow" size="lg" disabled={!data.transcript} onClick={nextStep}>
                Next <ChevronRight className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-5xl font-display mb-4">Show your work</h2>
            <p className="text-xl text-brand-dark/60 mb-10">Upload photos of your masterpieces using your camera.</p>
            
            <CameraUpload onUploadComplete={(urls) => setData({ ...data, images: urls })} />

            <div className="flex gap-4 mt-12">
              <Button variant="ghost" onClick={prevStep}><ChevronLeft className="mr-2" /> Back</Button>
              <Button className="flex-grow" size="lg" disabled={data.images.length === 0} onClick={nextStep}>
                Create Visual CV <Sparkles className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-display mb-4">You're live!</h2>
            <p className="text-xl text-brand-dark/60 mb-12 max-w-md mx-auto">
              Your professional visual profile has been created and is now discoverable by buyers in your area.
            </p>
            <Button size="lg" onClick={() => window.location.href = '/'}>
              Go to Dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtisanOnboarding;
