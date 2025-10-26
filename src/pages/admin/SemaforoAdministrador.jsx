import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import "../../styles/TrafficLight.css";

const userAdmin = {
  nombreCompleto: "Nombre Admin",
  correo: "admin@escuelaing.edu.co",
  rol: "Administrador",
  opcionesMenu: [
    { nombre: "INICIO", ruta: "/admin", icono: "home" },
    { nombre: "HORARIO", ruta: "/admin/horario", icono: "calendar_today" },
    { nombre: "SEMÁFORO", ruta: "/admin/semaforo", icono: "traffic" },
    { nombre: "SOLICITUDES", ruta: "/admin/solicitudes", icono: "bookmark" },
    { nombre: "USUARIOS", ruta: "/admin/estudiantes", icono: "groups" },
    { nombre: "GRUPOS Y MATERIAS", ruta: "/admin/grupos", icono: "menu_book" },
    { nombre: "REPORTES Y ESTADÍSTICAS", ruta: "/admin/estadisticas", icono: "bar_chart" },
    { nombre: "CONFIGURACIÓN Y PERIODOS", ruta: "/admin/configuracion", icono: "settings" }
  ]
};

// Leyenda
const leyenda = [
  { texto: "Cursos Aprobados", clase: "aprobado" },
  { texto: "Cursos Reprobados", clase: "reprobado" },
  { texto: "Cursos Pendientes Cursar", clase: "pendiente" },
  { texto: "Cursos Matriculados", clase: "matriculado" }
];

// Datos mock de estudiantes
const estudiantes = [
  { id: 1, nombre: "Anderson Fabián García Nieto" },
  { id: 2, nombre: "María Camila Rodríguez López" },
  { id: 3, nombre: "Juan Carlos Martínez Gómez" },
  { id: 4, nombre: "Ana Sofía Torres Ramírez" }
];

// Datos de semáforo por estudiante
const semaforosPorEstudiante = {
  1: [ // Anderson Fabián García Nieto
    {
      nombre: "Semestre 1",
      materias: [
        { codigo: "CALD", estado: "aprobado" },
        { codigo: "ALLI", estado: "aprobado" },
        { codigo: "PRI2IS", estado: "aprobado" },
        { codigo: "IPRO", estado: "aprobado" },
        { codigo: "FCO1", estado: "aprobado" },
        { codigo: "CLE1", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 2",
      materias: [
        { codigo: "CALI", estado: "aprobado" },
        { codigo: "FIS1", estado: "aprobado" },
        { codigo: "DDYA", estado: "aprobado" },
        { codigo: "MPIN", estado: "aprobado" },
        { codigo: "HGCL", estado: "aprobado" },
        { codigo: "CLE2", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 3",
      materias: [
        { codigo: "CALV", estado: "aprobado" },
        { codigo: "PRYE", estado: "aprobado" },
        { codigo: "FUEC", estado: "aprobado" },
        { codigo: "MYSD", estado: "aprobado" },
        { codigo: "LYMD", estado: "aprobado" },
        { codigo: "CLE3", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 4",
      materias: [
        { codigo: "FIS2", estado: "aprobado" },
        { codigo: "ODSC", estado: "aprobado" },
        { codigo: "FUPR", estado: "matriculado" },
        { codigo: "DOPO", estado: "aprobado" },
        { codigo: "TPYC", estado: "aprobado" },
        { codigo: "CLE4", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 5",
      materias: [
        { codigo: "ECDI", estado: "aprobado" },
        { codigo: "AYSR", estado: "matriculado" },
        { codigo: "PRI2IS", estado: "matriculado" },
        { codigo: "DOSW", estado: "matriculado" },
        { codigo: "CLE5", estado: "aprobado" },
        { codigo: "CLE6", estado: "matriculado" }
      ]
    },
    {
      nombre: "Semestre 6",
      materias: [
        { codigo: "FDSI", estado: "pendiente" },
        { codigo: "ARSW", estado: "pendiente" },
        { codigo: "PTIA", estado: "pendiente" },
        { codigo: "CIPP", estado: "pendiente" },
        { codigo: "CLE7", estado: "pendiente" },
        { codigo: "CLE8", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 7",
      materias: [
        { codigo: "SOGR", estado: "pendiente" },
        { codigo: "TDSE", estado: "pendiente" },
        { codigo: "SWNT", estado: "pendiente" },
        { codigo: "ET01", estado: "pendiente" },
        { codigo: "ET02", estado: "pendiente" },
        { codigo: "CLE9", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 8",
      materias: [
        { codigo: "OGR1", estado: "pendiente" },
        { codigo: "OGR2", estado: "pendiente" },
        { codigo: "OGR3", estado: "pendiente" },
        { codigo: "OGR4", estado: "pendiente" },
        { codigo: "ET03", estado: "pendiente" }
      ]
    }
  ],
  2: [ // María Camila Rodríguez López
    {
      nombre: "Semestre 1",
      materias: [
        { codigo: "CALD", estado: "aprobado" },
        { codigo: "ALLI", estado: "aprobado" },
        { codigo: "PRI2IS", estado: "aprobado" },
        { codigo: "IPRO", estado: "aprobado" },
        { codigo: "FCO1", estado: "aprobado" },
        { codigo: "CLE1", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 2",
      materias: [
        { codigo: "CALI", estado: "aprobado" },
        { codigo: "FIS1", estado: "aprobado" },
        { codigo: "DDYA", estado: "aprobado" },
        { codigo: "MPIN", estado: "aprobado" },
        { codigo: "HGCL", estado: "aprobado" },
        { codigo: "CLE2", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 3",
      materias: [
        { codigo: "CALV", estado: "aprobado" },
        { codigo: "PRYE", estado: "aprobado" },
        { codigo: "FUEC", estado: "aprobado" },
        { codigo: "MYSD", estado: "aprobado" },
        { codigo: "LYMD", estado: "aprobado" },
        { codigo: "CLE3", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 4",
      materias: [
        { codigo: "FIS2", estado: "aprobado" },
        { codigo: "ODSC", estado: "aprobado" },
        { codigo: "FUPR", estado: "aprobado" },
        { codigo: "DOPO", estado: "aprobado" },
        { codigo: "TPYC", estado: "aprobado" },
        { codigo: "CLE4", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 5",
      materias: [
        { codigo: "ECDI", estado: "aprobado" },
        { codigo: "AYSR", estado: "aprobado" },
        { codigo: "PRI2IS", estado: "aprobado" },
        { codigo: "DOSW", estado: "aprobado" },
        { codigo: "CLE5", estado: "aprobado" },
        { codigo: "CLE6", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 6",
      materias: [
        { codigo: "FDSI", estado: "aprobado" },
        { codigo: "ARSW", estado: "matriculado" },
        { codigo: "PTIA", estado: "matriculado" },
        { codigo: "CIPP", estado: "matriculado" },
        { codigo: "CLE7", estado: "aprobado" },
        { codigo: "CLE8", estado: "matriculado" }
      ]
    },
    {
      nombre: "Semestre 7",
      materias: [
        { codigo: "SOGR", estado: "pendiente" },
        { codigo: "TDSE", estado: "pendiente" },
        { codigo: "SWNT", estado: "pendiente" },
        { codigo: "ET01", estado: "pendiente" },
        { codigo: "ET02", estado: "pendiente" },
        { codigo: "CLE9", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 8",
      materias: [
        { codigo: "OGR1", estado: "pendiente" },
        { codigo: "OGR2", estado: "pendiente" },
        { codigo: "OGR3", estado: "pendiente" },
        { codigo: "OGR4", estado: "pendiente" },
        { codigo: "ET03", estado: "pendiente" }
      ]
    }
  ],
  3: [ // Juan Carlos Martínez Gómez
    {
      nombre: "Semestre 1",
      materias: [
        { codigo: "CALD", estado: "aprobado" },
        { codigo: "ALLI", estado: "aprobado" },
        { codigo: "PRI2IS", estado: "aprobado" },
        { codigo: "IPRO", estado: "aprobado" },
        { codigo: "FCO1", estado: "aprobado" },
        { codigo: "CLE1", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 2",
      materias: [
        { codigo: "CALI", estado: "aprobado" },
        { codigo: "FIS1", estado: "reprobado" },
        { codigo: "DDYA", estado: "aprobado" },
        { codigo: "MPIN", estado: "aprobado" },
        { codigo: "HGCL", estado: "aprobado" },
        { codigo: "CLE2", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 3",
      materias: [
        { codigo: "CALV", estado: "aprobado" },
        { codigo: "PRYE", estado: "aprobado" },
        { codigo: "FUEC", estado: "aprobado" },
        { codigo: "MYSD", estado: "aprobado" },
        { codigo: "LYMD", estado: "aprobado" },
        { codigo: "CLE3", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 4",
      materias: [
        { codigo: "FIS2", estado: "matriculado" },
        { codigo: "ODSC", estado: "matriculado" },
        { codigo: "FUPR", estado: "matriculado" },
        { codigo: "DOPO", estado: "matriculado" },
        { codigo: "TPYC", estado: "aprobado" },
        { codigo: "CLE4", estado: "matriculado" }
      ]
    },
    {
      nombre: "Semestre 5",
      materias: [
        { codigo: "ECDI", estado: "pendiente" },
        { codigo: "AYSR", estado: "pendiente" },
        { codigo: "PRI2IS", estado: "pendiente" },
        { codigo: "DOSW", estado: "pendiente" },
        { codigo: "CLE5", estado: "pendiente" },
        { codigo: "CLE6", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 6",
      materias: [
        { codigo: "FDSI", estado: "pendiente" },
        { codigo: "ARSW", estado: "pendiente" },
        { codigo: "PTIA", estado: "pendiente" },
        { codigo: "CIPP", estado: "pendiente" },
        { codigo: "CLE7", estado: "pendiente" },
        { codigo: "CLE8", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 7",
      materias: [
        { codigo: "SOGR", estado: "pendiente" },
        { codigo: "TDSE", estado: "pendiente" },
        { codigo: "SWNT", estado: "pendiente" },
        { codigo: "ET01", estado: "pendiente" },
        { codigo: "ET02", estado: "pendiente" },
        { codigo: "CLE9", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 8",
      materias: [
        { codigo: "OGR1", estado: "pendiente" },
        { codigo: "OGR2", estado: "pendiente" },
        { codigo: "OGR3", estado: "pendiente" },
        { codigo: "OGR4", estado: "pendiente" },
        { codigo: "ET03", estado: "pendiente" }
      ]
    }
  ],
  4: [ // Ana Sofía Torres Ramírez
    {
      nombre: "Semestre 1",
      materias: [
        { codigo: "CALD", estado: "aprobado" },
        { codigo: "ALLI", estado: "aprobado" },
        { codigo: "PRI2IS", estado: "aprobado" },
        { codigo: "IPRO", estado: "aprobado" },
        { codigo: "FCO1", estado: "aprobado" },
        { codigo: "CLE1", estado: "aprobado" }
      ]
    },
    {
      nombre: "Semestre 2",
      materias: [
        { codigo: "CALI", estado: "matriculado" },
        { codigo: "FIS1", estado: "matriculado" },
        { codigo: "DDYA", estado: "matriculado" },
        { codigo: "MPIN", estado: "matriculado" },
        { codigo: "HGCL", estado: "aprobado" },
        { codigo: "CLE2", estado: "matriculado" }
      ]
    },
    {
      nombre: "Semestre 3",
      materias: [
        { codigo: "CALV", estado: "pendiente" },
        { codigo: "PRYE", estado: "pendiente" },
        { codigo: "FUEC", estado: "pendiente" },
        { codigo: "MYSD", estado: "pendiente" },
        { codigo: "LYMD", estado: "pendiente" },
        { codigo: "CLE3", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 4",
      materias: [
        { codigo: "FIS2", estado: "pendiente" },
        { codigo: "ODSC", estado: "pendiente" },
        { codigo: "FUPR", estado: "pendiente" },
        { codigo: "DOPO", estado: "pendiente" },
        { codigo: "TPYC", estado: "pendiente" },
        { codigo: "CLE4", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 5",
      materias: [
        { codigo: "ECDI", estado: "pendiente" },
        { codigo: "AYSR", estado: "pendiente" },
        { codigo: "PRI2IS", estado: "pendiente" },
        { codigo: "DOSW", estado: "pendiente" },
        { codigo: "CLE5", estado: "pendiente" },
        { codigo: "CLE6", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 6",
      materias: [
        { codigo: "FDSI", estado: "pendiente" },
        { codigo: "ARSW", estado: "pendiente" },
        { codigo: "PTIA", estado: "pendiente" },
        { codigo: "CIPP", estado: "pendiente" },
        { codigo: "CLE7", estado: "pendiente" },
        { codigo: "CLE8", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 7",
      materias: [
        { codigo: "SOGR", estado: "pendiente" },
        { codigo: "TDSE", estado: "pendiente" },
        { codigo: "SWNT", estado: "pendiente" },
        { codigo: "ET01", estado: "pendiente" },
        { codigo: "ET02", estado: "pendiente" },
        { codigo: "CLE9", estado: "pendiente" }
      ]
    },
    {
      nombre: "Semestre 8",
      materias: [
        { codigo: "OGR1", estado: "pendiente" },
        { codigo: "OGR2", estado: "pendiente" },
        { codigo: "OGR3", estado: "pendiente" },
        { codigo: "OGR4", estado: "pendiente" },
        { codigo: "ET03", estado: "pendiente" }
      ]
    }
  ]
};

export default function SemaforoAdministrador() {
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  // Obtener los semestres del estudiante seleccionado
  const semestres = selectedStudentId ? semaforosPorEstudiante[selectedStudentId] : [];

  const handleStudentChange = (e) => {
    const estudianteId = Number.parseInt(e.target.value, 10);
    setSelectedStudentId(estudianteId || null);
  };

  return (
    <Dashboard user={userAdmin}>
      <div className="traffic-light-content">
        <h2>Semáforo académico</h2>
        
        {/* Selector de estudiante */}
        <div style={{ marginBottom: "20px" }}>
          <select
            value={selectedStudentId || ""}
            onChange={handleStudentChange}
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "12px 16px",
              fontSize: "16px",
              border: "2px solid #8B0000",
              borderRadius: "8px",
              backgroundColor: "white",
              cursor: "pointer",
              outline: "none"
            }}
          >
            <option value="">Seleccione un estudiante</option>
            {estudiantes.map((estudiante) => (
              <option key={estudiante.id} value={estudiante.id}>
                {estudiante.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar semáforo solo si hay un estudiante seleccionado */}
        {selectedStudentId ? (
          <div className="traffic-light-container">
            {/* Leyenda */}
            <div className="traffic-light-leyenda">
              {leyenda.map((item) => (
                <div key={item.clase} className={`leyenda-item leyenda-${item.clase}`}>
                  {item.texto}
                </div>
              ))}
            </div>
            {/* Scroll horizontal de semestres */}
            <div className="traffic-light-scroll">
              {semestres.map((sem) => (
                <div className="semestre-col" key={sem.nombre}>
                  <div className="semestre-title">{sem.nombre}</div>
                  {sem.materias.map((mat) => (
                    <div key={mat.codigo} className={`materia materia-${mat.estado}`}>
                      {mat.codigo}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "12px",
            marginTop: "30px"
          }}>
            <span className="material-icons" style={{ fontSize: "64px", color: "#999", marginBottom: "16px" }}>
              person_search
            </span>
            <p style={{ fontSize: "18px", color: "#666" }}>
              Seleccione un estudiante para ver su semáforo académico
            </p>
          </div>
        )}
      </div>
    </Dashboard>
  );
}
