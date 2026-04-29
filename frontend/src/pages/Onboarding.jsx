import React, { useState } from 'react';
import { Mic, Camera, Check, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);

  const steps = [
    { id: 1, title: "Your Voice", icon: Mic, description: "Tell us about your craft in your own language." },
    { id: 2, title: "Your Work", icon: Camera, description: "Show us what you've made today." },
    { id: 3, title: "Verification", icon: Check, description: "Trust built by your community." }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-32 px-6 max-w-2xl mx-auto">
      <div className="flex justify-between mb-12">
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              step >= s.id ? 'bg-brand-primary text-white' : 'bg-brand-dark/10 text-brand-dark/40'
            }`}>
              <s.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-bold ${step >= s.id ? 'text-brand-primary' : 'text-brand-dark/40'}`}>
              {s.title}
            </span>
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
            className="text-center"
          >
            <h2 className="text-4xl mb-6">Describe your craft</h2>
            <p className="text-lg text-brand-dark/60 mb-12">{steps[0].description}</p>
            
            <div className="relative flex justify-center mb-12">
              {isRecording && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute w-32 h-32 bg-brand-primary rounded-full"
                />
              )}
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-colors shadow-2xl ${
                  isRecording ? 'bg-brand-dark' : 'bg-brand-primary'
                }`}
              >
                <Mic className={`w-12 h-12 text-white ${isRecording ? 'animate-pulse' : ''}`} />
              </button>
            </div>
            
            <p className={`font-medium mb-8 ${isRecording ? 'text-brand-primary' : 'text-brand-dark/40'}`}>
              {isRecording ? 'Listening...' : 'Tap to start speaking'}
            </p>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              Next Step <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <h2 className="text-4xl mb-6">Show your masterpieces</h2>
            <p className="text-lg text-brand-dark/60 mb-12">{steps[1].description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="aspect-square bg-brand-dark/5 rounded-3xl border-2 border-dashed border-brand-dark/10 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-brand-dark/10 transition-colors">
                <Camera className="w-8 h-8 text-brand-dark/20 group-hover:text-brand-primary transition-colors" />
                <span className="text-xs font-bold text-brand-dark/30">Add Photo</span>
              </div>
              <div className="aspect-square bg-brand-dark/5 rounded-3xl border-2 border-dashed border-brand-dark/10 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-brand-dark/10 transition-colors">
                <Play className="w-8 h-8 text-brand-dark/20 group-hover:text-brand-primary transition-colors" />
                <span className="text-xs font-bold text-brand-dark/30">Add Video</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-brand-dark/5 text-brand-dark py-4 rounded-2xl font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-[2] bg-brand-dark text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                Complete Portfolio <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Check className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl mb-4">Portfolio Created!</h2>
            <p className="text-lg text-brand-dark/60 mb-12">
              Your craft is now live on HunarBridge. Local buyers can now discover your work.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold"
            >
              Go to Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
