"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log("Página carregada!");

    // Exemplo: Redirecionar para outra página após 5 segundos
    const timer = setTimeout(() => {
      console.log("Redirecionando para /register");
      router.push("/home"); // Substitua pelo destino desejado
    }, 5000);

    return () => clearTimeout(timer); // Cleanup do timer quando o componente desmontar
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold">Bem-vindo à Home!</h1>
      <p className="text-lg mt-4">
        Você será redirecionado para a página de cadastro em breve...
      </p>
    </main>
  );
}
