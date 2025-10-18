import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";

export default function SinImplementar({ user }) {
  return (
    <Dashboard user={user}>
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>🚧 Página sin implementar</h2>
        <p>Esta sección está pendiente de desarrollo.<br />Por favor, consulta con el equipo antes de continuar.</p>
      </div>
    </Dashboard>
  );
}
