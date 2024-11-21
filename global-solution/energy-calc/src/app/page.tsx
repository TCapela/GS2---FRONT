"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoadingPage() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true); // Verifica a conexão com a internet
  const [loading, setLoading] = useState(false); // Controla o estado de carregamento

  useEffect(() => {
    // Detecta mudanças no estado da conexão
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Detecta se a página foi carregada diretamente ou via navegação
    const entries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const isDirectNavigation = entries.some(
      (entry) => entry.type === "reload" || entry.type === "navigate"
    );

    if (isDirectNavigation) {
      setLoading(true); // Exibe a tela de carregamento apenas em recarregamentos
      const timer = setTimeout(() => {
        setLoading(false); // Finaliza o carregamento
        router.push("/home"); // Redireciona para a página principal
      }, 5000); // Ajuste o tempo de carregamento conforme necessário

      return () => clearTimeout(timer); 
    }

    // Cleanup dos listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [router]);

  if (!isOnline) {
    // Mensagem de erro caso a internet caia
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-600">Conexão Perdida</h1>
        <p className="text-lg mt-2">Verifique sua conexão com a internet.</p>
      </div>
    );
  }

  if (loading) {
    // Tela de carregamento
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-semibold">Carregando...</h1>
        <p className="text-lg mt-4">Aguarde enquanto carregamos o conteúdo.</p>
        <div className="mt-6 flex justify-center">
          <div className="animate-spin">
            <svg
              className="w-12 h-12 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return null; // Nenhuma tela de carregamento será exibida ao clicar em links
}
