import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'user' | 'porter' | 'admin';

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export const mockUsers: MockUser[] = [
  {
    id: 'user-1',
    name: 'Nguyễn Văn A',
    email: 'user@test.com',
    role: 'user',
  },
  {
    id: 'porter-1',
    name: 'Trần Văn Porter',
    email: 'porter@test.com',
    role: 'porter',
  },
  {
    id: 'admin-1',
    name: 'Admin VietTrekking',
    email: 'admin@viettrekking.com',
    role: 'admin',
  },
];

interface AuthContextType {
  currentUser: MockUser | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isPorter: boolean;
  login: (userId: string) => void;
  logout: () => void;
  switchAccount: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser | null>(() => {
    const savedUserId = localStorage.getItem('currentUserId');
    if (savedUserId) {
      return mockUsers.find(u => u.id === savedUserId) || null;
    }
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUserId', currentUser.id);
    } else {
      localStorage.removeItem('currentUserId');
    }
  }, [currentUser]);

  const login = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchAccount = (userId: string) => {
    login(userId);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isLoggedIn: !!currentUser,
      isAdmin: currentUser?.role === 'admin',
      isPorter: currentUser?.role === 'porter',
      login,
      logout,
      switchAccount,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
