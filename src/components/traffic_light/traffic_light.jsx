import React from "react";
import "./traffic_light.css";

// Ejemplo de datos
const semestres = [
  {
    nombre: "Semestre 1",
    materias: [
      { codigo: "CALD", estado: "aprobado" },
      { codigo: "ALLI", estado: "aprobado" },
      { codigo: "PRI2IS", estado: "aprobado" },
      { codigo: "IPRO", estado: "aprobado" },
      { codigo: "FC01", estado: "aprobado" },
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
      { codigo: "PRI2IS", estado: "aprobado" },
      { codigo: "DOSW", estado: "matriculado" },
      { codigo: "CLE5", estado: "aprobado" }
    ]
  },
  {
    nombre: "Semestre 6",
    materias: [
      { codigo: "FDSI", estado: "aprobado" },
      { codigo: "ARSW", estado: "matriculado" },
      { codigo: "PTIA", estado: "aprobado" },
      { codigo: "CIPP", estado: "aprobado" },
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
      { codigo: "CLE9", estado: "matriculado" }
    ]
  },
  {
    nombre: "Semestre 8",
    materias: [
      { codigo: "OGR1", estado: "pendiente" },
      { codigo: "OGR2", estado: "pendiente" },
      { codigo: "OGR3", estado: "pendiente" },
      { codigo: "OGR4", estado: "pendiente" },
      { codigo: "ETO3", estado: "pendiente" }
    ]
  }
];

const leyenda = [
  { texto: "Cursos Aprobados", clase: "aprobado" },
  { texto: "Cursos Reprobados", clase: "reprobado" },
  { texto: "Cursos Pendientes Cursar", clase: "pendiente" },
  { texto: "Cursos Matriculados", clase: "matriculado" }
];

function TrafficLight() {
  return (
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
        {semestres.map((sem, idx) => (
          <div className="semestre-col" key={sem.nombre}>
            <div className="semestre-title">{sem.nombre}</div>
            {sem.materias.map((mat, i) => (
              <div key={i} className={`materia materia-${mat.estado}`}>
                {mat.codigo}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrafficLight;