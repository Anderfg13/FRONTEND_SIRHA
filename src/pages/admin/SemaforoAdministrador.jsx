import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import StudentSelector from "../../components/ui/StudentSelector";
import SemaforoGrid from "../../components/semaforo/SemaforoGrid";
import "../../styles/Semaforo.css";

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

const estudiantes = [
  "Anderson Fabián García Nieto",
  "María Camila Rodríguez López",
  "Juan Carlos Martínez Gómez"
];

const semestreData = {
  1: [
    { codigo: "CALD", estado: "aprobada" },
    { codigo: "ALLI", estado: "aprobada" },
    { codigo: "PRI2IS", estado: "aprobada" },
    { codigo: "IPRO", estado: "aprobada" },
    { codigo: "FCO1", estado: "aprobada" },
    { codigo: "CLE1", estado: "aprobada" }
  ],
  2: [
    { codigo: "CALI", estado: "aprobada" },
    { codigo: "FIS1", estado: "aprobada" },
    { codigo: "DDYA", estado: "aprobada" },
    { codigo: "MPIN", estado: "aprobada" },
    { codigo: "HGCL", estado: "aprobada" },
    { codigo: "CLE2", estado: "aprobada" }
  ],
  3: [
    { codigo: "CALV", estado: "aprobada" },
    { codigo: "PRYE", estado: "aprobada" },
    { codigo: "FUEC", estado: "aprobada" },
    { codigo: "MYSD", estado: "aprobada" },
    { codigo: "LYMD", estado: "aprobada" },
    { codigo: "CLE3", estado: "aprobada" }
  ],
  4: [
    { codigo: "FIS2", estado: "aprobada" },
    { codigo: "ODSC", estado: "aprobada" },
    { codigo: "FUPR", estado: "en-curso" },
    { codigo: "DOPO", estado: "aprobada" },
    { codigo: "TPYC", estado: "aprobada" },
    { codigo: "CLE4", estado: "aprobada" }
  ],
  5: [
    { codigo: "ECDI", estado: "aprobada" },
    { codigo: "AYSR", estado: "en-curso" },
    { codigo: "PRI2IS", estado: "en-curso" },
    { codigo: "DOSW", estado: "en-curso" },
    { codigo: "CLE5", estado: "aprobada" },
    { codigo: "CLE6", estado: "en-curso" }
  ],
  6: [
    { codigo: "FDSI", estado: "pendiente" },
    { codigo: "ARSW", estado: "pendiente" },
    { codigo: "PTIA", estado: "pendiente" },
    { codigo: "CIPP", estado: "pendiente" },
    { codigo: "CLE7", estado: "pendiente" },
    { codigo: "CLE8", estado: "pendiente" }
  ],
  7: [
    { codigo: "SOGR", estado: "pendiente" },
    { codigo: "TDSE", estado: "pendiente" },
    { codigo: "SWNT", estado: "pendiente" },
    { codigo: "ET01", estado: "pendiente" },
    { codigo: "ET02", estado: "pendiente" },
    { codigo: "CLE9", estado: "pendiente" }
  ],
  8: [
    { codigo: "OGR1", estado: "pendiente" },
    { codigo: "OGR2", estado: "pendiente" },
    { codigo: "OGR3", estado: "pendiente" },
    { codigo: "OGR4", estado: "pendiente" },
    { codigo: "ET03", estado: "pendiente" }
  ]
};

export default function SemaforoAdministrador() {
  const [selectedStudent, setSelectedStudent] = useState("");

  return (
    <Dashboard user={userAdmin}>
      <div className="semaforo-content">
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "30px" }}>Semáforo</h1>
        
        <StudentSelector
          estudiantes={estudiantes}
          selectedStudent={selectedStudent}
          onSelectStudent={setSelectedStudent}
          placeholder="Nombre del estudiante"
        />

        <SemaforoGrid semestreData={semestreData} showLegend={true} />
      </div>
    </Dashboard>
  );
}
