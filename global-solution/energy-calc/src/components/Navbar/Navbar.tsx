"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaHistory, FaPlusCircle } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Navbar() {
  const pathname = usePathname(); // Obtém o caminho atual da página
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Verifica se o usuário está na página de perfil
  const isProfilePage = pathname.startsWith("/profile");

  return (
    <nav className="bg-green-200 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-black">
          Energy<span className="text-green-500">Calc</span>
        </h1>

        {/* Botão Hamburguer */}
        <button
          className="text-3xl sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links de Navegação */}
        <ul
          className={`absolute sm:static top-16 left-0 w-full sm:w-auto bg-green-200 sm:bg-transparent z-10 sm:flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-lg px-4 sm:px-0 ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          {/* Link Home */}
          <li>
            <Link href="/" className="flex items-center space-x-2 hover:text-green-600">
              <FaHome />
              <span>Home</span>
            </Link>
          </li>

          {/* Link Equipe */}
          <li>
            <Link href="/membros" className="flex items-center space-x-2 hover:text-green-600">
              <FaPeopleGroup />
              <span>Equipe</span>
            </Link>
          </li>

          {/* Links Específicos para o Profile */}
          {isProfilePage && (
            <>
              {/* Link Histórico */}
              <li>
                <Link
                  href="/profile/historico"
                  className="flex items-center space-x-2 hover:text-green-600"
                >
                  <FaHistory />
                  <span>Histórico de Simulações</span>
                </Link>
              </li>

              {/* Link Simular */}
              <li>
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 hover:text-green-600"
                >
                  <FaPlusCircle />
                  <span>Simular</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
