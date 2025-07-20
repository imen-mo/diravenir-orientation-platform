import React from "react";

const students = [
    { name: "Fatima Zahra", email: "fatima@example.com" },
    { name: "Youssef El Idrissi", email: "youssef@example.com" },
    { name: "Imane Mourid", email: "imane@example.com" }
];

export default function Etudiants() {
    return (
        <div className="bg-[#FDFDFD] min-h-screen px-6 py-10">
            <h2 className="text-3xl font-bold text-[#4B2B5F] mb-6">Liste des Étudiants</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-[#4B2B5F] text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">Nom</th>
                        <th className="py-3 px-6 text-left">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student, index) => (
                        <tr key={index} className="border-b hover:bg-[#FFE08233]">
                            <td className="py-3 px-6">{student.name}</td>
                            <td className="py-3 px-6">{student.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
