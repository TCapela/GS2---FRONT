"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";

export default function SimulationForm() {
  const { id: currentUserId } = useUser();
  const [formData, setFormData] = useState({
    tipoCliente: "",
    localizacao: "",
    custoMensal: "",
    orcamento: "",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent <HTMLFormElement> ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Dados do formulário enviados:", formData);
  
    try {
      const response = await fetch("/api/simulacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          custoMensal: parseFloat(formData.custoMensal),
          orcamento: parseFloat(formData.orcamento),
          usuarioId: currentUserId, 
        }),
        credentials: "include", 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Erro ao realizar a simulação.");
        return;
      }
  
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Erro de conexão:", err);
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Realizar Simulação</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo de Cliente */}
        <div>
          <label className="block font-medium mb-1">Tipo de Cliente</label>
          <select
            name="tipoCliente"
            value={formData.tipoCliente}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Residencial">Residencial</option>
            <option value="Comercial">Comercial</option>
          </select>
        </div>

        {/* Localização */}
        <div>
          <label className="block font-medium mb-1">Localização</label>
          <input
            type="text"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Custo Mensal */}
        <div>
          <label className="block font-medium mb-1">Custo Mensal (R$)</label>
          <input
            type="number"
            name="custoMensal"
            value={formData.custoMensal}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Orçamento */}
        <div>
          <label className="block font-medium mb-1">Orçamento Disponível (R$)</label>
          <input
            type="number"
            name="orcamento"
            value={formData.orcamento}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        {/* Erro */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Botão de Simular */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Simular"}
        </button>
      </form>

      {/* Resultado da Simulação */}
      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Resultado da Simulação</h3>
          <p><strong>Tipo de Energia Recomendada:</strong> {result.tipoEnergiaRecomendada || "N/A"}</p>
          <p>
            <strong>Economia Anual:</strong> R${" "}
            {result.economiaAnual !== undefined ? result.economiaAnual.toFixed(2) : "N/A"}
          </p>
          <p>
            <strong>Custo de Instalação:</strong> R${" "}
            {result.custoInstalacaoRecomendada !== undefined
              ? result.custoInstalacaoRecomendada.toFixed(2)
              : "N/A"}
          </p>
          <p>
            <strong>Tempo de Retorno:</strong>{" "}
            {result.tempoRetornoRecomendado !== undefined
              ? result.tempoRetornoRecomendado.toFixed(2)
              : "N/A"}{" "}
            anos
          </p>
        </div>
      )}
    </div>
  );
}
