import React, { useState, useEffect } from 'react';
import { Mic, Square, RotateCcw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';

interface VoiceRecorderProps {
  onTranscriptComplete: (transcript: string) => void;
}

const VoiceRecorder = ({ onTranscriptComplete }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = 'en-IN'; // Default to English (India), can be dynamic

      recog.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(prev => prev + currentTranscript);
      };

      setRecognition(recog);
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognition?.stop();
    } else {
      setTranscript('');
      recognition?.start();
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="glass p-8 rounded-[2.5rem] text-center">
      <div className="relative flex justify-center mb-10">
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.2, 0.5] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute w-24 h-24 bg-brand-primary rounded-full"
            />
          )}
        </AnimatePresence>
        <button
          onClick={toggleRecording}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all ${
            isRecording ? 'bg-brand-dark' : 'bg-brand-primary'
          }`}
        >
          {isRecording ? <Square className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
        </button>
      </div>

      <div className="min-h-[100px] mb-8 bg-brand-light/50 p-6 rounded-2xl italic text-brand-dark/70 border border-brand-primary/10">
        {transcript || "Speak about your craft..."}
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="ghost" onClick={() => setTranscript('')} disabled={!transcript}>
          <RotateCcw className="w-4 h-4 mr-2" /> Reset
        </Button>
        <Button onClick={() => onTranscriptComplete(transcript)} disabled={!transcript || isRecording}>
          <Check className="w-4 h-4 mr-2" /> Save Story
        </Button>
      </div>
    </div>
  );
};

export default VoiceRecorder;
