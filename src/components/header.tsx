"use client";

import Image from "next/image";
import Logo from "../images/Huoli.png";
import { LoginBtn } from "./loginBtn";
import { RegistreBtn } from "./registreBtn";
import "../app/globals.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verificar se o usuário está autenticado
    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white relative">
            <div className="flex items-center space-x-4">
                <Link href={'/'}>
                    <Image src={Logo} alt="Huoli Logo" width={80} height={60} />
                </Link>
                <h1 className="text-xl font-bold text-gray-800 hidden sm:block">HUOLI TECH</h1>
            </div>
            <nav>
                <ul className="hidden md:flex space-x-6 gap-8">
                    <li>
                        <Link href={'/'} className="text-gray-700 font-medium hover:text-teal-600 transition duration-300">Home</Link>
                    </li>
                    <li>
                        <Link href={'/pages/eletrodomesticos'} className="text-gray-700 font-medium hover:text-teal-600 transition duration-300">Cadastro Eletrodoméstico</Link>
                    </li>
                    <li>
                        <Link href={'/pages/meus-aparelhos'} className="text-gray-700 font-medium hover:text-teal-600 transition duration-300">Consumo</Link>
                    </li>
                    <li>
                        <Link href={'/pages/visao-geral'} className="text-gray-700 font-medium hover:text-teal-600 transition duration-300">Visão Geral</Link>
                    </li>
                    <li>
                        <Link href={'/pages/profile'} className="text-gray-700 font-medium hover:text-teal-600 transition duration-300">Meu Perfil</Link>
                    </li>
                </ul>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
                <RegistreBtn link="/pages/registro" />
                <span className="text-gray-500">ou</span>
                <LoginBtn link="/pages/login" />
            </div>

            <div className="md:hidden flex items-center relative">
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="text-gray-700 focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>

                {menuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 h-auto bg-white shadow-lg rounded-md p-4 z-50 flex flex-col space-y-2">
                        <Link href="/" className="text-teal-700 font-semibold hover:underline">
                            Home
                        </Link>
                        <Link href="/pages/eletrodomesticos" className="text-teal-700 font-semibold hover:underline">
                            Cadastro Eletrodoméstico
                        </Link>
                        <Link href="/pages/meus-aparelhos" className="text-teal-700 font-semibold hover:underline">
                            Consumo
                        </Link>
                        <Link href={'/pages/visao-geral'} className="text-teal-700 font-semibold hover:underline">Visão Geral</Link>
                        <Link href="/pages/registro" className="text-teal-700 font-semibold hover:underline">
                            Registrar
                        </Link>
                        <Link href="/pages/login" className="text-teal-700 font-semibold hover:underline">
                            Iniciar sessão
                        </Link>
                        <Link href="/pages/profile" className="text-teal-700 font-semibold hover:underline">
                            Meu Perfil
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
