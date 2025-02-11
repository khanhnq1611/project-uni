// contexts/user-context.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { verifyAuth } from '../lib/auth';

type UserContextType = {
  user: any; // Replace 'any' with proper TypeScript interface
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  refreshAuth: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      setIsLoading(true);
      const result = await verifyAuth();
      setUser(result.isAuthenticated ? result.userData?.user?.user : null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, refreshAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);