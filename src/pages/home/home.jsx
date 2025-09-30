import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Home from "../../components/home/home"; // Importa el componente Home

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

function HomePage() {
  return (
    <Dashboard user={user}>
      <Home />
    </Dashboard>
  );
}

export default HomePage;