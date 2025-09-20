import React, { createContext, useContext, useEffect, useState } from 'react';
import { listenToAuthChanges, type User } from '../../function/models/authService';

const UserContext = createContext<User | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(setUser);
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
