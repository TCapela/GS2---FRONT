"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Atualizado para 'next/navigation'
import { useUser } from "@/context/UserContext"; // Importa o contexto do usuário

export default function RegisterForm({
  onClose,
  onSwitchToLogin,
}: {
  onClose: () => void;
  onSwitchToLogin?: () => void; // Propriedade opcional
}) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senhaHash: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { setName } = useUser(); // Obtém a função para atualizar o nome no contexto

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null); // Limpa o erro ao alterar os campos
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.senhaHash) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senhaHash: formData.senhaHash,
        }),
      });

      if (response.ok) {
        // Atualiza o nome no contexto
        setName(formData.nome);

        // Redireciona para a página de perfil
        router.push("/profile");
      } else if (response.status === 409) {
        // Caso o servidor retorne conflito (e-mail já existe)
        setError("Este e-mail já está cadastrado. Tente novamente.");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao criar usuário.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 sm:w-2/4 p-6 rounded-lg shadow-lg relative">
        {/* Botão para fechar o modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 text-xl font-bold"
        >
          &times;
        </button>

        {/* Tela de Registro */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Energy<span className="text-green-500">Calc</span>
          </h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="nome"
                className="block text-left text-gray-700 font-medium"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2 outline-green-500 ${
                  error && "border-red-500"
                }`}
                placeholder="Digite seu nome"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-left text-gray-700 font-medium"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2 outline-green-500 ${
                  error?.includes("e-mail") && "border-red-500"
                }`}
                placeholder="exemplo@dominio.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="senha"
                className="block text-left text-gray-700 font-medium"
              >
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senhaHash"
                value={formData.senhaHash}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2 outline-green-500 ${
                  error && "border-red-500"
                }`}
                placeholder="Digite sua senha"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Criar Conta"}
            </button>
          </form>
          <button
            onClick={onSwitchToLogin}
            className="mt-4 text-green-500 hover:underline"
          >
            Já tem uma conta? Faça login
          </button>
        </div>
      </div>
    </div>
  );
}
