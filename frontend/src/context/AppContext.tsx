import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppContext.Provider value={{ language, setLanguage, isSidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
