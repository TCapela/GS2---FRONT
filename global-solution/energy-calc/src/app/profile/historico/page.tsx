"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import stateList from "@/data/states.json"
import Link from "next/link";

type Simulacao = {
  id: number;
  tipoCliente: string;
  localizacao: string;
  custoMensal: number;
  orcamento: number;
  tipoEnergiaEscolhida: string;
  economiaAnual: number;
  custoInstalacaoRecomendada: number;
  tempoRetornoRecomendado: number;
};

export default function HistoricoSimulacoes() {
  const { id: currentUserId } = useUser();
  const [simulacoes, setSimulacoes] = useState<Simulacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editingSimulacao, setEditingSimulacao] = useState<Simulacao | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedSimulacao, setSelectedSimulacao] = useState<Simulacao | null>(null); 

  useEffect(() => {
    if (!currentUserId) return;

    const fetchSimulacoes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/simulacao/usuario?usuarioId=${currentUserId}`
        );
        if (!response.ok) throw new Error("Erro ao carregar as simulações.");
        const data = await response.json();
        setSimulacoes(data);
      } catch (err) {
        console.error("Erro ao carregar a API", err)
      } finally {
        setLoading(false);
      }
    };

    fetchSimulacoes();
  }, [currentUserId]);

  const handleDelete = async () => {
    if (!selectedSimulacao) return;

    try {
      const response = await fetch(`http://localhost:8080/simulacao/${selectedSimulacao.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          usuarioId: String(currentUserId),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao excluir a simulação.");
      }

      setSimulacoes((prev) =>
        prev.filter((simulacao) => simulacao.id !== selectedSimulacao.id)
      );
      setIsModalOpen(false); // Fecha o modal após exclusão
      setSuccessMessage("Simulação excluída com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir a simulação", err)
    }
  };

  const openModal = (simulacao: Simulacao) => {
    setSelectedSimulacao(simulacao);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSimulacao(null);
  };

  const handleEdit = (simulacao: Simulacao) => {
    setEditingSimulacao(simulacao);
  };

  const handleUpdate = async (id: number, updatedData: Simulacao) => {
    try {
      const response = await fetch(`http://localhost:8080/simulacao/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          usuarioId: String(currentUserId),
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao atualizar a simulação.");
      }

      setSuccessMessage("Simulação atualizada com sucesso!");
      setSimulacoes((prev) =>
        prev.map((sim) => (sim.id === id ? { ...sim, ...updatedData } : sim))
      );
      setEditingSimulacao(null); // Feche o modo de edição
    } catch (err) {
      console.error("Erro ao atualizar", err)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editingSimulacao) {
      setEditingSimulacao({
        ...editingSimulacao,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Histórico de Simulações</h2>

      {successMessage && (
        <div className="mb-4 p-4 text-green-700 bg-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {editingSimulacao ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingSimulacao) {
                  handleUpdate(editingSimulacao.id, editingSimulacao);
                }
              }}
              className="space-y-4 mb-6"
            >
              <h3 className="text-xl font-semibold">Editar Simulação</h3>
              <div>
                <label className="block font-medium mb-1">Tipo de Cliente</label>
                <select
                  name="tipoCliente"
                  value={editingSimulacao.tipoCliente}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="Selecione">Selecione</option>
                  <option value="Residencial">Residencial</option>
                  <option value="Comercial">Comercial</option>
                </select>
              </div>
              <div>
            <label className="block font-medium mb-1">Localização</label>
            <select
              name="localizacao"
              value={editingSimulacao.localizacao}
              onChange={(e) => handleChange(e)}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="">Selecione o estado</option>
              {stateList.map((state) => (
                <option key={state.uf} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
          </div>
              <div>
                <label className="block font-medium mb-1">Custo Mensal (R$)</label>
                <input
                  type="number"
                  name="custoMensal"
                  value={editingSimulacao.custoMensal}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Orçamento (R$)</label>
                <input
                  type="number"
                  name="orcamento"
                  value={editingSimulacao.orcamento}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Atualizar
              </button>
              <button
                type="button"
                onClick={() => setEditingSimulacao(null)}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </form>
          ) : (
            <div className="overflow-x-auto">
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
                      <td className="border border-gray-200 px-4 py-2">
                        R$ {simulacao.economiaAnual.toFixed(2)}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <button
                          onClick={() => handleEdit(simulacao)}
                          className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => openModal(simulacao)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Excluir
                        </button>
                          <button className ="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                          <Link href={`/profile/historico/${simulacao.id}`}>Simulação</Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Modal de Confirmação */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Confirmação</h3>
            <p className="mb-4">Tem certeza de que deseja excluir esta simulação?</p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
