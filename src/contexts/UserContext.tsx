import React, { createContext, useState, ReactNode } from 'react';

export interface IUser {
  firstName: string;
  lastName: string;
}

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
