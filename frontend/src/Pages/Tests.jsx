import React from "react";

export default function Tests() {
    return (
        <div className="bg-[#FDFDFD] min-h-screen px-6 py-10">
            <h2 className="text-3xl font-bold text-[#4B2B5F] mb-6">Liste des Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((id) => (
                    <div key={id} className="bg-white p-6 rounded-lg shadow-md border border-[#eee]">
                        <h3 className="text-xl font-semibold text-[#4B2B5F] mb-2">Test {id}</h3>
                        <p className="text-gray-600 mb-4">
                            Description du test {id} pour aider à l’orientation.
                        </p>
                        <button className="bg-[#F7C948] hover:bg-[#FFE082] text-[#4B2B5F] font-medium px-4 py-2 rounded transition duration-200">
                            Démarrer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
