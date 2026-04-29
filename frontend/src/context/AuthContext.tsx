import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      }, (error) => {
        console.error("Auth error:", error);
        setLoading(false);
      });
      
      // Safety timeout for local dev without keys
      const timer = setTimeout(() => setLoading(false), 2000);
      
      return () => {
        unsubscribe();
        clearTimeout(timer);
      };
    } catch (e) {
      console.warn("Firebase Auth failed to initialize. Check your .env keys.");
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
