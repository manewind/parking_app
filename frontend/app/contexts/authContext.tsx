import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

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
    console.log('Токен из localStorage:', token);  // Логирование токена в консоль
    if (token) {
      login(token); // если токен есть, то делаем login
    } else {
      setIsLoggedIn(false); // если токена нет, то явно указываем isLoggedIn как false
    }
  }, []); // useEffect должен сработать только при монтировании компонента


  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true); // обновляем состояние, что пользователь залогинен

    axios
      .get('http://localhost:8000/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfilePicture(response.data.profilePicture);
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных пользователя:', error);
        logout(); // если ошибка - вызываем logout
      });
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