"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserContextType = {
  id: number | null;
  name: string;
  setName: (name: string) => void;
  setId: (id: number | null) => void;
  setUser: (user: { id: number | null; name: string }) => void; // Nova função para definir o usuário diretamente
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<number | null>(null);

  // Carrega os dados do usuário do localStorage ao carregar o componente
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setId(user.id);
      setName(user.name);
    }
  }, []);

  // Função para salvar o usuário no contexto e no localStorage
  const setUser = (user: { id: number | null; name: string }) => {
    setId(user.id);
    setName(user.name);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  return (
    <UserContext.Provider value={{ id, name, setName, setId, setUser }}>
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
