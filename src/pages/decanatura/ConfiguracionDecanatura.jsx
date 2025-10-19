import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";

const userDecanatura = {
  nombreCompleto: "Nombre Decano",
  correo: "decanatura@escuelaing.edu.co",
  rol: "Decano",
  programa: "Ingeniería de Sistemas",
  opcionesMenu: [
    { nombre: "INICIO", ruta: "/decanatura", icono: "home" },
    { nombre: "SOLICITUDES", ruta: "/decanatura/solicitudes", icono: "description" },
    { nombre: "SEMÁFORO", ruta: "/decanatura/semaforo", icono: "traffic" },
    { nombre: "ESTUDIANTES", ruta: "/decanatura/estudiantes", icono: "groups" },
    { nombre: "GRUPOS Y MATERIAS", ruta: "/decanatura/grupos", icono: "menu_book" },
    { nombre: "CONFIGURACIÓN ACADÉMICA", ruta: "/decanatura/configuracion", icono: "settings" }
  ]
};

export default function ConfiguracionDecanatura() {
  return (
    <Dashboard user={userDecanatura}>
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>🚧 Página sin implementar</h2>
        <p>Esta sección está pendiente de desarrollo.<br />Por favor, consulta con el equipo antes de continuar.</p>
      </div>
    </Dashboard>
  );
}
