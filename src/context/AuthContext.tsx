import React, {createContext, useState, useEffect} from 'react';
import {getData, removeData} from '../utils/async-storage';

export const AuthContext = createContext<null | {
  isLogin: boolean;
  onLogout: () => void;
  onLogin: () => void;
}>(null);

export default function AuthProvider({children}: {children: React.ReactNode}) {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const token = await getData('ACCESS_TOKEN');
      if (token) {
        setIsLogin(true);
        return;
      }
      setIsLogin(false);
    };
    getToken();
  }, []);

  const onLogout = async () => {
    await removeData('ACCESS_TOKEN');
    setIsLogin(false);
  };

  const onLogin = async () => {
    setIsLogin(true);
  };

  return (
    <AuthContext.Provider value={{isLogin, onLogout, onLogin}}>
      {children}
    </AuthContext.Provider>
  );
}
