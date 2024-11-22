"use client";

import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
      <h1 className="text-5xl font-bold mb-4">Ops! Algo deu errado.</h1>
      <p className="text-lg mb-6">
        Não conseguimos processar sua solicitação. Por favor, tente novamente mais tarde.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Voltar para a Página Inicial
        </button>
        <button
          onClick={() => router.refresh()}
          className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400"
        >
          Tentar Novamente
        </button>
      </div>
      <img
        src="/error-image.png"
        alt="Imagem de erro"
        className="mt-10 max-w-xs"
      />
    </div>
  );
}
