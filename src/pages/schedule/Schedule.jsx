import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Schedule from "../../components/schedule/Schedule";
import "./Schedule.css"; // Importa el CSS de la página

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
    // Aquí podrías cargar el horario correspondiente al semestre seleccionado
  };

  return (
    <Dashboard user={user}>
      <div className="schedule-header" style={{ position: "relative" }}>
        <button
          className="schedule-dropdown-btn"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>{selected}</span>
          <span className="schedule-arrow" style={{ transform: open ? "rotate(180deg)" : "none" }}>
            &#9660;
          </span>
        </button>
        {open && (
          <ul className="schedule-dropdown">
            {semestres.map((sem, idx) => (
              <li
                key={idx}
                className={sem === selected ? "selected" : ""}
                onClick={() => handleSelect(sem)}
              >
                {sem}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Schedule />
    </Dashboard>
  );
}

export default SchedulePage;