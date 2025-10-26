import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import TrafficLight from "../../components/traffic_light/traffic_light";

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

function TrafficLightPage() {
  return (
    <Dashboard user={user}>
      <div className="traffic-light-content">
        <h2>Semáforo académico</h2>
        <TrafficLight />
      </div>
    </Dashboard>
  );
}

export default TrafficLightPage;
