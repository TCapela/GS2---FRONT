"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

type Simulacao = {
  id: number;
  tipoCliente: string;
  localizacao: string;
  custoMensal: number;
  orcamento: number;
  tipoEnergiaRecomendada: string;
  economiaAnual: number;
  custoInstalacaoRecomendada: number;
  tempoRetornoRecomendado: number;
};

export default function HistoricoSimulacoes() {
  const { id: currentUserId } = useUser();
  const [simulacoes, setSimulacoes] = useState<Simulacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUserId) return;

    const fetchSimulacoes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/simulacoes?usuarioId=${currentUserId}`);
        if (!response.ok) throw new Error("Erro ao carregar as simulações.");

        const data = await response.json();
        setSimulacoes(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSimulacoes();
  }, [currentUserId]);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta simulação?")) return;

    try {
      const response = await fetch(`/api/simulacoes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao excluir a simulação.");

      setSimulacoes((prev) => prev.filter((simulacao) => simulacao.id !== id));
      alert("Simulação excluída com sucesso.");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (simulacao: Simulacao) => {
    console.log("Editar simulação:", simulacao);
  };

 

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Histórico de Simulações</h2>

      {simulacoes.length === 0 ? (
        <p>Nenhuma simulação encontrada.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Tipo Cliente</th>
              <th className="border border-gray-200 px-4 py-2">Localização</th>
              <th className="border border-gray-200 px-4 py-2">Economia Anual</th>
              <th className="border border-gray-200 px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {simulacoes.map((simulacao) => (
              <tr key={simulacao.id}>
                <td className="border border-gray-200 px-4 py-2">{simulacao.id}</td>
                <td className="border border-gray-200 px-4 py-2">{simulacao.tipoCliente}</td>
                <td className="border border-gray-200 px-4 py-2">{simulacao.localizacao}</td>
                <td className="border border-gray-200 px-4 py-2">R$ {simulacao.economiaAnual.toFixed(2)}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    onClick={() => handleEdit(simulacao)}
                    className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(simulacao.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
