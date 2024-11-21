"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

type User = {
  id: number;
  name: string;
};

export default function LoginForm({
  onClose,
  onSwitchToRegister,
}: {
  onClose: () => void;
  onSwitchToRegister?: () => void;
  onSwitchToLogin?: () => void;
}) {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useUser();

  const router = useRouter();

  // Função para salvar o usuário no contexto e localStorage
  const handleLogin = (user: User) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setUser(user); // Atualiza o contexto com o usuário
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.senha) {
      alert("E-mail e senha são obrigatórios!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          senhaHash: formData.senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = { id: data.id, name: data.nome };
        handleLogin(user); // Salva o usuário
        router.push("/profile");
      } else if (response.status === 401) {
        setError("Email ou senha incorretos.");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao fazer login.");
      }
    } catch (err) {
      alert("Erro de conexão com o servidor.");
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

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            Energy<span className="text-green-500">Calc</span>
          </h1>
        </div>

        {/* Botões de Login e Registro */}
        <div className="flex justify-center mb-6">
          <button className="px-6 py-2 bg-green-500 text-white rounded-l-lg hover:bg-green-600">
            Entrar
          </button>
          <button
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300"
            onClick={onSwitchToRegister}
          >
            Criar conta
          </button>
        </div>

        {/* Formulário de Login */}
        <div className="text-center">
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                className="w-full border rounded-lg px-4 py-2 outline-green-500"
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
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 outline-green-500"
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
              {loading ? "Carregando..." : "Entrar!"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
