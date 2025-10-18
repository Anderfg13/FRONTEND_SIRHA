import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";

const userAdmin = {
  nombreCompleto: "Nombre Admin",
  correo: "admin@escuelaing.edu.co",
  rol: "Administrador",
  opcionesMenu: [
    { nombre: "INICIO", ruta: "/admin", icono: "home" },
    { nombre: "HORARIO", ruta: "/horario", icono: "calendar_today" },
    { nombre: "SEMÁFORO", ruta: "/semaforo", icono: "traffic" },
    { nombre: "SOLICITUDES", ruta: "/solicitudes", icono: "bookmark" },
    { nombre: "ESTUDIANTES", ruta: "/estudiantes", icono: "groups" },
    { nombre: "GRUPOS Y MATERIAS", ruta: "/grupos", icono: "menu_book" },
    { nombre: "REPORTES Y ESTADÍSTICAS", ruta: "/estadisticas", icono: "bar_chart" },
    { nombre: "CONFIGURACIÓN Y PERIODOS", ruta: "/configuracion", icono: "settings" }
  ]
};

export default function AdminPage() {
  return (
    <Dashboard user={userAdmin}>
      <h2>Bienvenido Administrador</h2>
      {/* Aquí puedes agregar widgets, tablas, etc. específicos para administrador */}
    </Dashboard>
  );
}
