"use client";

import { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";

interface AuthContextProps {
  currentUser: User | null;
  userLoggedIn: boolean;
  setUserLoggedIn: (value: boolean) => void;
  loading: boolean;
}

const defaultAuthContext: AuthContextProps = {
  currentUser: null,
  userLoggedIn: false,
  setUserLoggedIn: () => {},
  loading: true,
};

const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedInState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const setUserLoggedIn = useCallback((value: boolean) => {
    setUserLoggedInState(value);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserLoggedIn(!!user); 
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [setUserLoggedIn]); 

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userLoggedIn,
        setUserLoggedIn,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
