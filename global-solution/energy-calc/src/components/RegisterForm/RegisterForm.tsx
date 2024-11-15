"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Conta criada com sucesso!");
    console.log("Dados enviados: ", formData);
    onClose();

    router.push("/profile")

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
                className="w-full border rounded-lg px-4 py-2 outline-green-500"
                placeholder="Digite seu nome"
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
                className="w-full border rounded-lg px-4 py-2 outline-green-500"
                placeholder="exemplo@dominio.com"
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
              />
            </div>
            <div>
              <label
                htmlFor="confirmarSenha"
                className="block text-left text-gray-700 font-medium"
              >
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 outline-green-500"
                placeholder="Confirme sua senha"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
            >
              Criar Conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
