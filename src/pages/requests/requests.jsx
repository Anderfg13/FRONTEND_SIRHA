import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Requests from "../../components/requests/requests"; // Importa el componente creado

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

function RequestsPage() {
  return (
    <Dashboard user={user}>
      <Requests /> {/* Aquí se añade el componente de solicitudes */}
    </Dashboard>
  );
}

export default RequestsPage;