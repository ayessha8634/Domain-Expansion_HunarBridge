export const CHAT_KNOWLEDGE_BASE = [
  {
    category: 'onboarding',
    keywords: ['join', 'register', 'become artisan', 'start', 'how to join', 'create account', 'sign up'],
    answer: "To join HunarBridge, click the 'Join' button. Use your voice to describe your craft and camera to upload work. No resume needed!"
  },
  {
    category: 'discovery',
    keywords: ['find', 'search', 'buy', 'nearby', 'location', 'where', 'map', 'near me'],
    answer: "Go to the 'Discover' map to find artisans near you. You can search by skills like Pottery, Weaving, or Carpentry."
  },
  {
    category: 'pottery',
    keywords: ['potter', 'clay', 'pottery', 'ceramics', 'vases', 'terracotta'],
    answer: "Pottery is one of our most popular crafts! You can find master potters on our Discovery Map or register as one to start selling your clay masterpieces."
  },
  {
    category: 'weaving',
    keywords: ['weaver', 'weaving', 'loom', 'fabric', 'handloom', 'saree', 'textile'],
    answer: "Our weaving community covers everything from traditional handlooms to modern textiles. Check out the 'Masterpiece Gallery' for authentic woven goods."
  },
  {
    category: 'carpentry',
    keywords: ['carpenter', 'wood', 'furniture', 'carpentry', 'woodwork', 'carving'],
    answer: "Looking for woodcraft? Our registered carpenters specialize in everything from custom furniture to intricate traditional wood carvings."
  },
  {
    category: 'embroidery',
    keywords: ['embroidery', 'stitching', 'thread', 'needlework', 'zardozi', 'chikankari'],
    answer: "Embroidery and needlework are vital skills here. Whether it's Zardozi or Chikankari, you can find experts or list your own stitching services."
  },
  {
    category: 'tailoring',
    keywords: ['tailor', 'stitch', 'sewing', 'clothes', 'alteration', 'dressmaker'],
    answer: "Need something stitched? Our tailoring experts can help with custom clothing and alterations. Use the map to find a tailor in your neighborhood."
  },
  {
    category: 'trust',
    keywords: ['trust', 'verify', 'score', 'reliable', 'safe', 'security', 'quality'],
    answer: "HunarBridge uses a 'Trust Score' system. Artisans earn points through community verification and successful projects. Look for the 'Verified' badge."
  },
  {
    category: 'rewards',
    keywords: ['reward', 'coupon', 'points', 'token', 'coins', 'discount', 'wallet'],
    answer: "Earn tokens by completing your profile and uploading work! Redeem them in your Wallet for visibility boosts or partner discounts."
  },
  {
    category: 'privacy',
    keywords: ['privacy', 'password', 'contact', 'hide', 'visible', 'security', 'private', 'settings'],
    answer: "You can manage your privacy in Settings. You can choose to hide your contact details or change your password anytime."
  },
  {
    category: 'help',
    keywords: ['help', 'support', 'contact', 'human', 'issue', 'problem', 'stuck'],
    answer: "I am Hunar AI, your 24/7 assistant! If you have a technical issue, you can use the 'Feedback' section in Settings to alert our team."
  }
];

// Helper to calculate Levenshtein distance for fuzzy string matching (typo tolerance)
const getLevenshteinDistance = (a: string, b: string): number => {
  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return matrix[a.length][b.length];
};

export const getBotResponse = (input: string) => {
  const lowerInput = input.toLowerCase();
  const inputWords = lowerInput.split(/\s+/);
  
  // Scoring system
  let bestMatch = null;
  let maxScore = 0;

  for (const item of CHAT_KNOWLEDGE_BASE) {
    let currentScore = 0;
    
    for (const keyword of item.keywords) {
      // Exact substring match
      if (lowerInput.includes(keyword)) {
        currentScore += 5;
      } else {
        // Fuzzy match against individual words in the input to tolerate typos
        const keywordLength = keyword.length;
        // Allow 1 typo for short words (4-6 chars), 2 typos for long words (7+ chars)
        const allowedTypos = keywordLength > 6 ? 2 : (keywordLength > 3 ? 1 : 0);
        
        if (allowedTypos > 0) {
          for (const word of inputWords) {
            // Only compare if word lengths are somewhat similar
            if (Math.abs(word.length - keywordLength) <= allowedTypos) {
              const distance = getLevenshteinDistance(word, keyword);
              if (distance <= allowedTypos) {
                currentScore += 3; // Boost score for fuzzy match
                break;
              }
            }
          }
        }
      }
    }

    if (currentScore > maxScore) {
      maxScore = currentScore;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    return bestMatch.answer;
  }

  // Fallback for "wrong" questions that contain specific keywords
  if (lowerInput.length > 3) {
    return "I caught some interesting keywords there! I'm best at helping with onboarding, finding artisans (like tailors or potters), and explaining our trust system. How can I help you with those?";
  }

  return "I'm here to help! Try asking about 'how to join', 'finding a tailor', or 'how rewards work'.";
};
