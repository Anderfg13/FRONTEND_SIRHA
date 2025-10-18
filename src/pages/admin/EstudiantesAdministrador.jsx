import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";

const userAdmin = {
  nombreCompleto: "Nombre Admin",
  correo: "admin@escuelaing.edu.co",
  rol: "Administrador",
  opcionesMenu: [
    { nombre: "INICIO", ruta: "/admin", icono: "home" },
    { nombre: "HORARIO", ruta: "/admin/horario", icono: "calendar_today" },
    { nombre: "SEMÁFORO", ruta: "/admin/semaforo", icono: "traffic" },
    { nombre: "SOLICITUDES", ruta: "/admin/solicitudes", icono: "bookmark" },
    { nombre: "ESTUDIANTES", ruta: "/admin/estudiantes", icono: "groups" },
    { nombre: "GRUPOS Y MATERIAS", ruta: "/admin/grupos", icono: "menu_book" },
    { nombre: "REPORTES Y ESTADÍSTICAS", ruta: "/admin/estadisticas", icono: "bar_chart" },
    { nombre: "CONFIGURACIÓN Y PERIODOS", ruta: "/admin/configuracion", icono: "settings" }
  ]
};

export default function EstudiantesAdministrador() {
  return (
    <Dashboard user={userAdmin}>
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>🚧 Página sin implementar</h2>
        <p>Esta sección está pendiente de desarrollo.<br />Por favor, consulta con el equipo antes de continuar.</p>
      </div>
    </Dashboard>
  );
}
