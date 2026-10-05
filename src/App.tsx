import React, { useState, useEffect } from 'react';
import { User } from './types';
import { initializeDatabase, getCurrentSession, saveCurrentSession, getUsers } from './db';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { AuthScreen } from './components/AuthScreen';
import { LandingPage } from './components/LandingPage';
import { DashboardScreen } from './components/DashboardScreen';
import { VaultsScreen } from './components/VaultsScreen';
import { BuyCryptoScreen } from './components/BuyCryptoScreen';
import { InviteScreen } from './components/InviteScreen';
import { WalletScreen } from './components/WalletScreen';
import { SupportScreen } from './components/SupportScreen';
import { AdminScreen } from './components/AdminScreen';

const TAB_STORAGE_KEY = 'vaultix_current_tab_v10';

export function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentTab, setCurrentTabState] = useState<NavTab>('dashboard');
  const [isInitialized, setIsInitialized] = useState(false);
  const [showAuthScreen, setShowAuthScreen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    initializeDatabase();

    // Synchronous session recovery with triple-key fallback
    const recoveredSession = getCurrentSession();
    if (recoveredSession) {
      const allUsers = getUsers();
      const freshUser = allUsers.find((u) => u.userId === recoveredSession.userId || u.email.toLowerCase() === recoveredSession.email.toLowerCase()) || recoveredSession;
      setCurrentUser(freshUser);

      // Restore saved active tab on page refresh
      const savedTab = (localStorage.getItem(TAB_STORAGE_KEY) || sessionStorage.getItem(TAB_STORAGE_KEY)) as NavTab | null;
      if (savedTab) {
        if (savedTab === 'admin' && freshUser.role !== 'ADMIN') {
          setCurrentTabState('dashboard');
        } else {
          setCurrentTabState(savedTab);
        }
      } else if (freshUser.role === 'ADMIN') {
        setCurrentTabState('admin');
      }
    }

    setIsInitialized(true);
  }, []);

  const setCurrentTab = (tab: NavTab) => {
    setCurrentTabState(tab);
    try {
      localStorage.setItem(TAB_STORAGE_KEY, tab);
      sessionStorage.setItem(TAB_STORAGE_KEY, tab);
    } catch {
      // Fallback
    }
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthScreen(true);
  };

  const handleLoginSuccess = (user: User) => {
    const freshUser = getUsers().find((u) => u.userId === user.userId || u.email.toLowerCase() === user.email.toLowerCase()) || user;
    setCurrentUser(freshUser);
    saveCurrentSession(freshUser);
    setShowAuthScreen(false);

    if (freshUser.role === 'ADMIN') {
      setCurrentTab('admin');
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleUserUpdated = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    saveCurrentSession(updatedUser);
  };

  const handleLogout = () => {
    saveCurrentSession(null);
    try {
      localStorage.removeItem(TAB_STORAGE_KEY);
      sessionStorage.removeItem(TAB_STORAGE_KEY);
    } catch {
      // Fallback
    }
    setCurrentUser(null);
    setShowAuthScreen(false);
    setCurrentTabState('dashboard');
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-[#D4AF37] flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#D4AF37] mb-3"></div>
        <span className="text-xs font-bold tracking-widest uppercase">Verifying Authenticated Session...</span>
      </div>
    );
  }

  // Unauthenticated Visitors: Public Landing Page or Auth Screen
  if (!currentUser) {
    if (showAuthScreen) {
      return (
        <AuthScreen
          onLoginSuccess={handleLoginSuccess}
          initialTab={authMode}
          onBackToLanding={() => setShowAuthScreen(false)}
        />
      );
    }
    return <LandingPage onOpenAuth={handleOpenAuth} />;
  }

  // Authenticated Users: Full Wealth Management Application
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col font-sans">
      <Navbar user={currentUser} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar currentTab={currentTab} onSelectTab={setCurrentTab} user={currentUser} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {currentTab === 'dashboard' && (
            <DashboardScreen user={currentUser} onNavigateToTab={setCurrentTab} />
          )}
          {currentTab === 'vaults' && (
            <VaultsScreen user={currentUser} onUserUpdated={handleUserUpdated} />
          )}
          {currentTab === 'buy_crypto' && <BuyCryptoScreen />}
          {currentTab === 'invite' && (
            <InviteScreen user={currentUser} onUserUpdated={handleUserUpdated} />
          )}
          {currentTab === 'wallet' && (
            <WalletScreen user={currentUser} onUserUpdated={handleUserUpdated} />
          )}
          {currentTab === 'support' && <SupportScreen user={currentUser} />}
          {currentTab === 'admin' && currentUser.role === 'ADMIN' && (
            <AdminScreen currentAdmin={currentUser} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
