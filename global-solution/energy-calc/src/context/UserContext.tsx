"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  id: number | null; 
  name: string;
  setName: (name: string) => void;
  setId: (id: number | null) => void; 
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("");
  const [id, setId] = useState<number | null>(null); 

  return (
    <UserContext.Provider value={{ id, name, setName, setId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
