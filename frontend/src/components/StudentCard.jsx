import React from "react";

export default function StudentCard({ name, university, avatar, status }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
            <div className="flex items-center space-x-4">
                <img
                    src={avatar}
                    alt={name}
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div>
                    <h2 className="text-lg font-bold text-gray-900">{name}</h2>
                    <p className="text-sm text-gray-600">{university}</p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
            {status}
          </span>
                </div>
            </div>
        </div>
    );
}