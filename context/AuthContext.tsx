'use client';

import React, { useState, useContext, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { TokenInterface } from '@/interfaces/token.interface';

type AuthContextType = {
  isAuthenticated: boolean;
  userInfoToken?: TokenInterface;
  varificationCode: string;
  userLogin: (token: string) => void;
  userLogout: () => void;
  setCode: (code: string) => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [varificationCode, setVarificationCode] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const LOCAL_STORAGE_TOKEN_KEY = 'authToken';
  const LOCAL_STORAGE_SESSION_TIME = 'expTime';
  const [userInfoToken, setUserInfoToken] = useState<TokenInterface | undefined>();
  const token =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
      : null;

  const now = Math.floor(new Date().getTime() / 1000);
  const expTime =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE_SESSION_TIME)
      : null;

  const tokenDecode = useCallback(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAuthenticated(true);

      if (decodedToken.exp !== undefined) {
        localStorage.setItem('expTime', decodedToken.exp.toString());
        setUserInfoToken(decodedToken);
        if (expTime && now > +expTime) {
          userLogout();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    tokenDecode();
  }, [tokenDecode]);

  const userLogin = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    tokenDecode();
  };

  const userLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const setCode = (code: string) => {
    setVarificationCode(code);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userLogin,
        userLogout,
        userInfoToken,
        varificationCode,
        setCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }
  return context;
};
