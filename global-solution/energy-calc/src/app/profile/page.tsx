"use client";

import { useUser } from "@/context/UserContext";
import SimulationForm from "@/components/SimulationForm/SimulationForm";

export default function ProfilePage() {
  const { name } = useUser();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold">Bem-vindo, {name}!</h1>
      <p className="text-lg mt-2">
        Aqui você pode acessar seu histórico de simulações e criar novas simulações.
      </p>

      {/* Formulário de Simulação */}
      <div className="mt-6">
        <SimulationForm />
      </div>
    </div>
  );
}
