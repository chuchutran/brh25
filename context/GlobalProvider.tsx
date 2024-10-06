// GlobalProvider.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCurrentUser, getAccount, signOut } from '@/lib/appwrite';

interface GlobalContextType {
  user: any;
  isLogged: boolean;
  loading: boolean;
  signOutUser: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await getAccount();  // Fetch current user session
        if (currentUser) {
          setUser(currentUser);
          setIsLogged(true);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error('No active session', error);
        setIsLogged(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession(); // Check if there's an active session on app load
  }, []);

  const signOutUser = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLogged(false);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <GlobalContext.Provider value={{ user, isLogged, loading, signOutUser }}>
      {children}
    </GlobalContext.Provider>
  );
};
