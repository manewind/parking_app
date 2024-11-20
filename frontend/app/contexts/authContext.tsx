import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  profilePicture: string | null;
  username: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Токен из localStorage при монтировании:', token);  // Логирование токена при монтировании
    if (token) {
      // Просто обновляем состояние, если токен найден
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // если токена нет, то явно указываем isLoggedIn как false
    }
  }, []);  // useEffect сработает при монтировании компонента

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true); // Обновляем состояние логина при успешном входе
  };

  const logout = () => {
    setIsLoggedIn(false);
    setProfilePicture(null);
    setUsername(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, profilePicture, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
