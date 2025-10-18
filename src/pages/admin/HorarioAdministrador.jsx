import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import ScheduleTable from "../../components/schedule/ScheduleTable";
import StudentSelector from "../../components/ui/StudentSelector";
import "../../styles/Schedule.css";

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

// Mock data de estudiantes
const estudiantes = [
  "Anderson Fabián García Nieto",
  "María Camila Rodríguez López",
  "Juan Carlos Martínez Gómez",
  "Ana Sofía Pérez Torres",
  "Carlos Eduardo Ruiz Sánchez"
];

export default function HorarioAdministrador() {
  const [selectedStudent, setSelectedStudent] = useState("");

  return (
    <Dashboard user={userAdmin}>
      <div className="schedule-container">
        <h1 className="schedule-title">Horario</h1>
        
        {/* Selector de estudiante */}
        <StudentSelector
          estudiantes={estudiantes}
          selectedStudent={selectedStudent}
          onSelectStudent={setSelectedStudent}
          placeholder="Nombre del estudiante"
        />

        {/* Tabla de horario */}
        <ScheduleTable />
      </div>
    </Dashboard>
  );
}
