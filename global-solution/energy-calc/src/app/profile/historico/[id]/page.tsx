"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Simulacao } from "@/types";
import { useUser } from "@/context/UserContext";

export default function HistoricoPage() {

const { id: currentUserId } = useUser();
const [simulacao, setSimulacao] = useState<Simulacao>();
const { id }  = useParams();
  useEffect(() => {
    if (!currentUserId) return;

    const fetchSimulacoes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/simulacao/${id}`
        );
        if (!response.ok) throw new Error("Erro ao carregar as simulações.");
        const data = await response.json();
        setSimulacao(data);
        console.log("oi eu sou a data",data);
      } catch (err) {
        console.error("Erro ao carregar a API", err)
      }
    };

    fetchSimulacoes();
  }, [currentUserId]);


  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-500">
        Resultado da Simulação
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Tipo de Cliente:
          </h2>
          <p className="text-gray-800">{simulacao?.tipoCliente}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Tipo de Energia Escolhida:
          </h2>
          <p className="text-gray-800">{simulacao?.tipoEnergiaEscolhida}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Localização:</h2>
          <p className="text-gray-800">{simulacao?.localizacao}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Custo Mensal:</h2>
          <p className="text-gray-800">
            R$ {simulacao?.custoMensal.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Economia Anual:
          </h2>
          <p className="text-gray-800">
            R$ {simulacao?.economiaAnual.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Orçamento:</h2>
          <p className="text-gray-800">R$ {simulacao?.orcamento.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Custo de Instalação Recomendada:
          </h2>
          <p className="text-gray-800">
            R$ {simulacao?.custoInstalacaoRecomendada.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">
            Tempo de Retorno Recomendado:
          </h2>
          <p className="text-gray-800">
            {simulacao?.tempoRetornoRecomendado.toFixed(2)} anos
          </p>
        </div>
      </div>
    </div>
  );
}
