// Fichier : src/components/TestList.jsx
import React from "react";

const tests = [
    { id: 1, name: "Test d’orientation", date: "2025-07-15", result: "Complété" },
    { id: 2, name: "Test de personnalité", date: "2025-07-17", result: "En cours" },
];

export default function TestList() {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Mes Tests</h3>
            <ul className="space-y-3">
                {tests.map((test) => (
                    <li
                        key={test.id}
                        className="flex items-center justify-between border-b pb-2"
                    >
                        <div>
                            <p className="text-gray-800 font-medium">{test.name}</p>
                            <p className="text-sm text-gray-500">{test.date}</p>
                        </div>
                        <span className={`text-sm font-semibold ${test.result === "Complété" ? "text-green-600" : "text-yellow-500"}`}>
              {test.result}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}