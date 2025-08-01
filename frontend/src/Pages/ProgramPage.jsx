import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProgramPage() {
  const { programName } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Exemple d'appel API, à adapter selon ton backend
    axios.get(`/api/programs/${programName}`)
      .then(res => {
        setProgram(res.data);
        setLoading(false);
      }),end
      .catch(err => {
        setError("Erreur de chargement du programme");
        setLoading(false);
      });
  }, [programName]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!program) return <div>Programme non trouvé</div>;

  return (
    <div style={{ padding: 40 }}>
      <h2>{program.title || programName.replace(/-/g, ' ')}</h2>
      <p>{program.description}</p>
      {/* Ajoute ici plus d'infos selon ta structure */}
    </div>
  );
}
