import React from 'react';
import AppRouter from './router/AppRouter';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <WelcomeScreen />
        <AppRouter />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
