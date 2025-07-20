import React from "react";

export default function Home() {
    return (
        <div className="bg-[#4B2B5F] min-h-screen flex flex-col items-center justify-center text-[#FDFDFD] px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                Bienvenue sur Diravenir
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl text-center">
                Une plateforme dédiée à l’orientation scolaire pour guider les étudiants vers leur avenir.
            </p>
            <a
                href="#"
                className="bg-[#F7C948] hover:bg-[#FFE082] text-[#4B2B5F] font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
            >
                Commencer le Test
            </a>
        </div>
    );
}
