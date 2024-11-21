"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import stateList from "@/data/states.json";


interface SimulationResult {
  tipoEnergiaEscolhida: string;
  tipoCliente: string;
  economiaAnual: number;
  custoInstalacaoRecomendada: number;
  tempoRetornoRecomendado: number;
}

// Tipo esperado para o resultado do cálculo de média
interface AverageResult {
  mediaGasto: number;
  mediaConsumo: number;
}

export default function SimulationForm() {
  const { id: currentUserId } = useUser();

  const [formData, setFormData] = useState({
    tipoCliente: "",
    localizacao: "",
    custoMensal: "",
    tipoEnergiaEscolhida: "",
    orcamento: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null); // Para identificar se estamos editando uma simulação
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const [averageData, setAverageData] = useState<Record<string, string>>({
    gastoMes1: "",
    gastoMes2: "",
    gastoMes3: "",
    consumoKwhMes1: "",
    consumoKwhMes2: "",
    consumoKwhMes3: "",
  });

  const [averageResult, setAverageResult] = useState<AverageResult | null>(null);
  const [averageError, setAverageError] = useState<string | null>(null);
  const [averageLoading, setAverageLoading] = useState(false);
  useEffect(() => {
    // Verifica se há simulação salva no sessionStorage (para edição)
    const simulacaoEdicao = sessionStorage.getItem("simulacaoEdicao");
    if (simulacaoEdicao) {
      const simulacao = JSON.parse(simulacaoEdicao);
      setEditingId(simulacao.id); // Define o ID da simulação em edição
      setFormData({
        tipoCliente: simulacao.tipoCliente,
        localizacao: simulacao.localizacao,
        custoMensal: String(simulacao.custoMensal),
        tipoEnergiaEscolhida: simulacao.tipoEnergiaEscolhida,
        orcamento: String(simulacao.orcamento),
      });
      sessionStorage.removeItem("simulacaoEdicao"); // Remove após carregar os dados
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    isAverageForm = false
  ) => {
    if (isAverageForm) {
      setAverageData({
        ...averageData,
        [e.target.name]: e.target.value,
      });
      setAverageError(null);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        ...formData,
        custoMensal: parseFloat(formData.custoMensal),
        orcamento: parseFloat(formData.orcamento),
        usuarioId: currentUserId,
      };

      const response = await fetch("/api/simulacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          usuarioId: String(currentUserId),
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error("Erro ao cadastrar")
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Erro de conexão:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAverageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAverageLoading(true);
    setAverageError(null);

    try {
      const body = {
        usuarioId: currentUserId,
        gastoMes1: parseFloat(averageData.gastoMes1),
        gastoMes2: parseFloat(averageData.gastoMes2),
        gastoMes3: parseFloat(averageData.gastoMes3),
        consumoKwhMes1: parseFloat(averageData.consumoKwhMes1),
        consumoKwhMes2: parseFloat(averageData.consumoKwhMes2),
        consumoKwhMes3: parseFloat(averageData.consumoKwhMes3),
      };

      const response = await fetch("/api/consumo/calcular-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setAverageError(errorData.error || "Erro ao calcular a média.");
        return;
      }

      const data = await response.json();
      setAverageResult(data);
    } catch (err) {
      console.error("Erro de conexão:", err);
      setAverageError("Erro de conexão com o servidor.");
    } finally {
      setAverageLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-20 mt-10">
      {/* Primeiro Formulário */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Editar Simulação" : "Realizar Simulação"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Tipo de Energia</label>
            <select
              name="tipoEnergiaEscolhida"
              value={formData.tipoEnergiaEscolhida}
              onChange={(e) => handleChange(e)}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="">Selecione</option>
              <option value="Solar">Solar</option>
              <option value="Eolica">Eólica</option>
              <option value="Hidrica">Hídrica</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Tipo de Cliente</label>
            <select
              name="tipoCliente"
              value={formData.tipoCliente}
              onChange={(e) => handleChange(e)}
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
              value={formData.localizacao}
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
              min="0"
              name="custoMensal"
              value={formData.custoMensal}
              onChange={(e) => handleChange(e)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Orçamento Disponível (R$)</label>
            <input
              type="number"
              min="0"
              name="orcamento"
              value={formData.orcamento}
              onChange={(e) => handleChange(e)}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Simular"}
          </button>
        </form>
        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Resultado da Simulação</h3>
            <p>
              <strong>Tipo de Energia Escolhida:</strong> {result.tipoEnergiaEscolhida || "N/A"}
            </p>
            <p>
              <strong>Tipo do Cliente:</strong> {result.tipoCliente || "N/A"}
            </p>
            <p>
              <strong>Economia Anual:</strong> R$ {result.economiaAnual?.toFixed(2) || "N/A"}
            </p>
            <p>
              <strong>Custo de Instalação:</strong> R$ {result.custoInstalacaoRecomendada?.toFixed(2) || "N/A"}
            </p>
            <p>
              <strong>Tempo de Retorno:</strong> {result.tempoRetornoRecomendado?.toFixed(2) || "N/A"}
            </p>
          </div>
        )}
      </div>

      {/* Segundo Formulário */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Calcular Média de Consumo</h2>
        <form onSubmit={handleAverageSubmit} className="space-y-4">
          {["gastoMes1", "gastoMes2", "gastoMes3"].map((field, idx) => (
            <div key={idx}>
              <label className="block font-medium mb-1">Gasto Mês {idx + 1} (R$)</label>
              <input
                type="number"
                min="0"
                name={field}
                value={averageData[field]}
                onChange={(e) => handleChange(e, true)}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
          ))}
          {["consumoKwhMes1", "consumoKwhMes2", "consumoKwhMes3"].map((field, idx) => (
            <div key={idx}>
              <label className="block font-medium mb-1">Consumo Mês {idx + 1} (kWh)</label>
              <input
                type="number"
                min="0"
                name={field}
                value={averageData[field]}
                onChange={(e) => handleChange(e, true)}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
          ))}
          {averageError && <p className="text-red-500">{averageError}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
            disabled={averageLoading}
          >
            {averageLoading ? "Carregando..." : "Calcular"}
          </button>
        </form>
        {averageResult && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Resultado da Média</h3>
            <p>
              <strong>Média de Gasto:</strong> R$ {averageResult.mediaGasto?.toFixed(2) || "N/A"}
            </p>
            <p>
              <strong>Média de Consumo:</strong> {averageResult.mediaConsumo?.toFixed(2) || "N/A"} kWh
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
