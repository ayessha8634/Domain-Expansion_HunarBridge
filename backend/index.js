const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Mock Artisan Matching Algorithm
exports.matchArtisans = functions.https.onCall(async (data, context) => {
  const { location, craft } = data;
  
  // In a real app, this would query Firestore
  console.log(`Matching artisans for ${craft} at ${location}`);
  
  return [
    { id: 1, name: 'Arshad Khan', distance: '1.2km', score: 98 },
    { id: 2, name: 'Lakshmi Devi', distance: '2.5km', score: 95 }
  ];
});

// Mock Chatbot Assistant Logic
exports.hunarAssistant = functions.https.onCall(async (data, context) => {
  const { message } = data;
  
  // Logic to process voice transcript or text
  if (message.includes('portfolio') || message.includes('work')) {
    return { reply: "I can help you upload your work. Would you like to open the camera?" };
  }
  
  return { reply: "I'm Hunar AI. How can I assist you with your craft today?" };
});
