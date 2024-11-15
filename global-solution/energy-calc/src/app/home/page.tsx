"use client";

import { useState } from "react";
import Image from "next/image";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpenLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  return (
    <main>
      <section className="flex items-center justify-between gap-4 max-w-6xl mx-auto p-4">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-4xl font-semibold">Renovando a sua energia!</h1>
          <h2 className="text-2xl font-semibold">
            Faça uma simulação para descobrir qual é o tipo de energia{" "}
            <span className="text-green-500">renovável</span> é ideal para você!
          </h2>
          <button
            onClick={handleOpenLogin}
            className="text-xl font-semibold p-2 rounded-xl bg-green-500 text-white transition hover:bg-green-600"
          >
            Vamos lá!
          </button>
        </div>
        <Image
          className="hidden sm:block"
          src="/imgs/welcome.svg"
          alt="Homem dando oi"
          width={300}
          height={400}
        />
      </section>

      {/* Seção verde que cobre toda a largura */}
      <section className="bg-green-200 text-black">
        <div className="max-w-6xl mx-auto p-4 flex flex-col items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Image
              src="/imgs/investindo.svg"
              alt="Homem e mulher analisando um gráfico"
              width={320}
              height={214}
            />
            <div>
              <h1 className="text-2xl font-semibold">
                Benefícios de se tornar uma empresa parceira
              </h1>
              <h2>
                Nós oferecemos uma oportunidade única de treinamento da equipe
                mecânica e alavancamos a sua visibilidade no mercado!
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto p-4 flex flex-col items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row-reverse items-center gap-4">
          <Image
            src="/imgs/contract.svg"
            alt="Homem e mulher fechando um contrato"
            width={320}
            height={214}
          />
          <div>
            <h1 className="text-2xl font-semibold">
              Como fazer parte do nosso ecossistema?
            </h1>
            <h2>
              Essa é uma tarefa bem simples! Entre em contato com a nossa equipe
              que te falaremos mais sobre as informações necessárias!
            </h2>
          </div>
        </div>
      </section>

      {/* Modal de Login */}
      {showLoginModal && <LoginForm onClose={handleCloseLogin} />}
    </main>
  );
}
