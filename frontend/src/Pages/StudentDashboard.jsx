// Fichier : src/pages/StudentDashboard.jsx
import React from "react";
import StudentCard from "../components/StudentCard";
import TestList from "../components/TestList";

export default function StudentDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StudentCard
                name="Imane Mourid"
                university="EMSI Casablanca"
                avatar="https://randomuser.me/api/portraits/women/44.jpg"
                status="Active"
            />
            <TestList />
        </div>
    );
}
