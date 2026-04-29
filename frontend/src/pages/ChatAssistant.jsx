import React, { useState } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! I'm your HunarBridge Assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages([...messages, userMsg]);
    setInput('');

    // Mock response
    setTimeout(() => {
      const botMsg = { 
        id: Date.now() + 1, 
        text: "That sounds like a great question! I can help you find master artisans or guide you through creating your own visual portfolio. What would you like to see?", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="pt-24 h-screen flex flex-col max-w-4xl mx-auto px-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Skill Assistant</h2>
          <p className="text-sm text-brand-dark/50">Ask me anything about crafts or masters</p>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto mb-6 space-y-6 pr-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-brand-dark text-white' : 'bg-brand-primary text-white'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-brand-dark text-white rounded-tr-none' 
                    : 'glass text-brand-dark rounded-tl-none'
                }`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="pb-32">
        <div className="glass p-2 rounded-full flex gap-2 border-brand-primary/20">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-grow bg-transparent px-6 py-4 outline-none font-medium"
          />
          <button
            onClick={handleSend}
            className="bg-brand-primary text-white p-4 rounded-full shadow-lg card-hover"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
