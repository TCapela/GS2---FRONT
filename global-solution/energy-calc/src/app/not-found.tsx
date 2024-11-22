"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
      <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
      <h2 className="text-2xl font-bold mb-2">Página não encontrada</h2>
      <p className="text-lg mb-6">
        O ID ou a página que você está procurando não existe ou foi removida.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Voltar para a Página Inicial
        </button>
        <button
          onClick={() => router.back()}
          className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400"
        >
          Voltar para a Página Anterior
        </button>
      </div>
      <img
        src="/not-found-image.png"
        alt="Página não encontrada"
        className="mt-10 max-w-xs"
      />
    </div>
  );
}
