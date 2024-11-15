"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaHistory } from "react-icons/fa";

export default function NavbarProfile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-green-500 text-white py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">
          Energy<span className="text-black">Calc</span>
        </h1>
        <button
          className="text-3xl sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul
          className={`absolute sm:static top-16 left-0 w-full sm:w-auto bg-green-500 sm:bg-transparent z-10 sm:flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-lg px-4 sm:px-0 ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <li>
            <Link href="/profile" className="hover:text-black">
              <FaHome /> <span>Perfil</span>
            </Link>
          </li>
          <li>
            <Link href="/profile/history" className="hover:text-black">
              <FaHistory /> <span>Histórico</span>
            </Link>
          </li>
          <li>
            <Link href="/profile/simulation" className="hover:text-black">
              Nova Simulação
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
