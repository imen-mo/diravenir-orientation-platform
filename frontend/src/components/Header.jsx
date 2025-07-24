import React from "react";
import logo from "../assets/logo.png"; // Assure-toi que le chemin est correct

export default function Header() {
    return (
        <header className="bg-[#4B2B5F] shadow-lg p-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center space-x-3">
                <img
                    src={logo}
                    alt="Diravenir Logo"
                    className="w-12 h-12 rounded-full shadow-md"
                />
                <h1 className="text-2xl font-bold text-[#F7C948] tracking-wide">
                    Diravenir Platform
                </h1>
            </div>
            <nav className="space-x-6">
                <a
                    href="#"
                    className="text-[#FDFDFD] hover:text-[#FFE082] font-medium transition duration-200"
                >
                    Accueil
                </a>
                <a
                    href="#"
                    className="text-[#FDFDFD] hover:text-[#FFE082] font-medium transition duration-200"
                >
                    Tests
                </a>
                <a
                    href="#"
                    className="text-[#FDFDFD] hover:text-[#FFE082] font-medium transition duration-200"
                >
                    Étudiants
                </a>
            </nav>
        </header>
    );
}
