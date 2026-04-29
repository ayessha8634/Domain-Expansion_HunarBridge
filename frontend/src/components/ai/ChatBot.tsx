import React, { useState, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChatMessage } from '../../types/models';
import { getBotResponse } from '../../utils/chatbotData';

const ChatBot = () => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Initialize with translated welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          id: '1', 
          text: t('ai.welcome_msg'), 
          sender: 'bot', 
          timestamp: Date.now(), 
          language: i18n.language 
        }
      ]);
    }
  }, [t, i18n.language, messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { 
      id: Date.now().toString(), 
      text: input, 
      sender: 'user', 
      timestamp: Date.now(), 
      language: i18n.language 
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Trained Bot response
    setTimeout(() => {
      const responseText = getBotResponse(input);
      const botMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        text: responseText, 
        sender: 'bot', 
        timestamp: Date.now(),
        language: i18n.language
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  return (
    <div className="glass flex flex-col h-[600px] rounded-[3rem] overflow-hidden border-brand-primary/10 shadow-2xl">
      <div className="bg-brand-primary p-8 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-inner">
            <Sparkles className="w-8 h-8 text-brand-secondary" />
          </div>
          <div>
            <h3 className="font-display text-2xl leading-none tracking-tight">{t('ai.header')}</h3>
            <p className="text-white/60 text-xs mt-2 font-bold uppercase tracking-widest">{t('ai.sub_header')}</p>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-8 space-y-6 bg-white/50">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-1 shadow-md ${
                  msg.sender === 'user' ? 'bg-brand-dark text-white' : 'bg-brand-primary text-white'
                }`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-5 rounded-3xl text-sm font-bold leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-brand-dark text-white rounded-tr-none' 
                    : 'bg-white text-brand-dark rounded-tl-none border border-brand-primary/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-brand-light/30 border-t border-brand-primary/5">
        <div className="bg-white rounded-[2rem] p-3 flex gap-3 items-center shadow-xl border border-brand-primary/10">
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`p-4 rounded-2xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'}`}
          >
            <Mic className="w-6 h-6" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('ai.placeholder')}
            className="flex-grow bg-transparent px-2 py-2 outline-none text-brand-dark font-bold text-lg placeholder:text-brand-dark/20"
          />
          <button
            onClick={handleSend}
            className="bg-brand-primary text-white p-4 rounded-2xl shadow-lg hover:bg-brand-dark transition-all active:scale-90"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
