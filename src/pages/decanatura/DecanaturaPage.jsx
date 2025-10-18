import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import ActivitySummaryDecanatura from '../../components/decanatura/ActivitySummaryDecanatura';

const userDecanatura = {
  nombreCompleto: "Nombre Decano",
  correo: "decanatura@escuelaing.edu.co",
  rol: "Decano",
  programa: "Ingeniería de Sistemas",
  opcionesMenu: [
    { nombre: "INICIO", ruta: "/decanatura", icono: "home" },
    { nombre: "SOLICITUDES", ruta: "/decanatura/solicitudes", icono: "bookmark" },
    { nombre: "SEMÁFORO", ruta: "/decanatura/semaforo", icono: "traffic" },
    { nombre: "ESTUDIANTES", ruta: "/decanatura/estudiantes", icono: "groups" },
    { nombre: "GRUPOS Y MATERIAS", ruta: "/decanatura/grupos", icono: "menu_book" },
    { nombre: "CONFIGURACIÓN ACADÉMICA", ruta: "/decanatura/configuracion", icono: "settings" }
  ]
};

export default function DecanaturaPage() {
  return (
    <Dashboard user={userDecanatura}>
      <ActivitySummaryDecanatura />
    </Dashboard>
  );
}
