"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes, FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    {
      text: "Home",
      url: "/",
      icon: <FaHome />,
    },
    {
      text: "Equipe",
      url: "/membros",
      icon: <FaPeopleGroup />,
    },
  ];

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
          {links.map((link) => (
            <li key={link.url}>
              <Link
                href={link.url}
                className={`flex items-center space-x-2 transition ${
                  pathname === link.url
                    ? "text-black"
                    : "hover:text-green-600"
                }`}
                onClick={() => setIsMenuOpen(false)} 
              >
                {link.icon}
                <span>{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
