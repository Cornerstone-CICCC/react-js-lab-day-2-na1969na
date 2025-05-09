import { createContext } from 'react';

interface AuthContextType {
  user: string;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
