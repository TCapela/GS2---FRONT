"use client";

import { useState } from "react";

export default function LoginForm({ onClose }: { onClose: () => void }) {
  const [isRegister, setIsRegister] = useState(false);


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

        {isRegister ? (
          /* Formulário de Registro */
          <RegisterForm onSwitch={() => setIsRegister(false)} />
        ) : (
          /* Tela de Login */
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Energy<span className="text-green-500">Calc</span>
            </h1>
            <div className="flex justify-center mb-6">
              <button className="px-6 py-2 bg-green-500 text-white rounded-l-lg hover:bg-green-600">
                Entrar
              </button>
              <button
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300"
                onClick={() => setIsRegister(true)} // Muda para a tela de registro
              >
                Criar conta
              </button>
            </div>

            <form className="space-y-4">
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
                  className="w-full border rounded-lg px-4 py-2 outline-green-500"
                  placeholder="exemplo@dominio.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-left text-gray-700 font-medium"
                >
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border rounded-lg px-4 py-2 outline-green-500"
                  placeholder="Digite sua senha"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
              >
                Entrar!
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Crie sua conta</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="nome" className="block font-medium">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Digite seu nome"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Digite seu e-mail"
          />
        </div>
        <div>
          <label htmlFor="senha" className="block font-medium">
            Senha
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Digite sua senha"
          />
        </div>
        <div>
          <label htmlFor="confirmarSenha" className="block font-medium">
            Confirmar Senha
          </label>
          <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Confirme sua senha"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600"
        >
          Criar Conta
        </button>
      </form>
      <button
        onClick={onSwitch}
        className="mt-4 text-green-500 hover:underline"
      >
        Já tem uma conta? Faça login
      </button>
    </div>
  );
}
