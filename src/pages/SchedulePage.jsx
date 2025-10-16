import React, { useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import Schedule from "../components/schedule/Schedule";
import "../styles/Schedule.css";

// Simulación de datos de usuario (puedes reemplazarlo por props o contexto)
const user = {
  nombreCompleto: "Anderson Fabián García Nieto",
  correo: "anderson.garcia-n@mail.escuelaing.edu.co",
  rol: "Estudiante",
  programa: "Ingeniería de Sistemas",
  opcionesMenu: [
    { nombre: "INICIO", ruta: "/dashboard", icono: "home" },
    { nombre: "HORARIO", ruta: "/horario", icono: "calendar_today" },
    { nombre: "SEMAFORO", ruta: "/semaforo", icono: "traffic" },
    { nombre: "SOLICITUDES", ruta: "/solicitudes", icono: "description" }
  ]
};

const semestres = [
  "Primer semestre 2025 (2025 - 1)",
  "Segundo semestre 2024 (2024 - 2)",
  "Primer semestre 2024 (2024 - 1)"
];

function SchedulePage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(semestres[0]);

  const handleSelect = (semestre) => {
    setSelected(semestre);
    setOpen(false);
  };

  return (
    <Dashboard user={user}>
      <div className="schedule-header" style={{ position: "relative" }}>
        <button
          className="schedule-dropdown-btn"
          onClick={() => setOpen(!open)}
        >
          {selected}
        </button>
        {open && (
          <div className="schedule-dropdown-menu">
            {semestres.map((semestre) => (
              <div
                key={semestre}
                className="schedule-dropdown-item"
                onClick={() => handleSelect(semestre)}
              >
                {semestre}
              </div>
            ))}
          </div>
        )}
      </div>
      <Schedule />
    </Dashboard>
  );
}

export default SchedulePage;
