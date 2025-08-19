import React from 'react';

const TestList = () => {
    const tests = [
        { id: 1, name: "Test d'Orientation", status: "Disponible", duration: "30 min" },
        { id: 2, name: "Évaluation des Compétences", status: "Complété", duration: "45 min" },
        { id: 3, name: "Test de Personnalité", status: "En cours", duration: "20 min" }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tests Disponibles</h3>
            <div className="space-y-3">
                {tests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <h4 className="font-medium text-gray-700">{test.name}</h4>
                            <p className="text-sm text-gray-500">Durée: {test.duration}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            test.status === 'Disponible' ? 'bg-green-100 text-green-800' :
                            test.status === 'Complété' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                            {test.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestList;
