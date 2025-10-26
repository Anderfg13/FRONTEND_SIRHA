import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import "../../styles/SemaforoDecanatura.css";

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

export default function SemaforoDecanatura() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState("");

  // Lista de estudiantes disponibles
  const students = [
    { id: "", name: "Seleccionar estudiante" },
    { id: "1", name: "Ana María González" },
    { id: "2", name: "Carlos Eduardo Ruiz" },
    { id: "3", name: "Diana Patricia López" },
    { id: "4", name: "Felipe Andrés Martín" },
    { id: "5", name: "Gabriela Sofía Torres" },
    { id: "6", name: "Héctor Manuel Jiménez" },
    { id: "7", name: "Isabella Cruz Vega" },
    { id: "8", name: "Jorge Luis Ramírez" },
    { id: "9", name: "Karla Daniela Soto" },
    { id: "10", name: "Luis Fernando Herrera" },
  ];

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  // Datos simulados de materias por estudiante
  const materiasPorEstudiante = {
    "1": {
      "1": [
        { nombre: "Matemáticas I", estado: "aprobada" },
        { nombre: "Programación I", estado: "aprobada" },
        { nombre: "Física I", estado: "en_curso" },
      ],
      "2": [
        { nombre: "Matemáticas II", estado: "pendiente" },
        { nombre: "Programación II", estado: "en_curso" },
      ],
      "3": [
        { nombre: "Estadística", estado: "aprobada" },
      ],
      "4": [
        { nombre: "Bases de Datos", estado: "pendiente" },
      ],
      "5": [
        { nombre: "Redes", estado: "pendiente" },
      ],
      "6": [
        { nombre: "Sistemas Operativos", estado: "pendiente" },
      ],
      "7": [
        { nombre: "Inteligencia Artificial", estado: "pendiente" },
      ],
      "8": [
        { nombre: "Proyecto Final", estado: "pendiente" },
      ],
    },
    "2": {
      "1": [
        { nombre: "Matemáticas I", estado: "aprobada" },
        { nombre: "Programación I", estado: "aprobada" },
      ],
      "2": [
        { nombre: "Matemáticas II", estado: "aprobada" },
        { nombre: "Programación II", estado: "en_curso" },
      ],
      "3": [
        { nombre: "Estadística", estado: "en_curso" },
      ],
      "4": [
        { nombre: "Bases de Datos", estado: "pendiente" },
      ],
      "5": [
        { nombre: "Redes", estado: "pendiente" },
      ],
      "6": [
        { nombre: "Sistemas Operativos", estado: "pendiente" },
      ],
      "7": [
        { nombre: "Inteligencia Artificial", estado: "pendiente" },
      ],
      "8": [
        { nombre: "Proyecto Final", estado: "pendiente" },
      ],
    },
    // ...agrega más estudiantes si lo deseas
  };

  // Función para obtener materias por semestre del estudiante seleccionado
  const getMateriasSemestre = (semestre) => {
    if (!selectedStudent || !materiasPorEstudiante[selectedStudent]) return [];
    return materiasPorEstudiante[selectedStudent][semestre] || [];
  };

  return (
    <Dashboard user={userDecanatura}>
      <div className="decanatura-semaforo-container">
        <section className="decanatura-content-section">
          {/* Selector de estudiante */}
          <div className="decanatura-student-selector">
            <h2>Semáforo Académico</h2>
            <div className="decanatura-selector-container">
              <label htmlFor="student-select">Seleccionar estudiante:</label>
              <div className="decanatura-select-wrapper">
                <select 
                  id="student-select"
                  value={selectedStudent} 
                  onChange={handleStudentChange}
                  className="decanatura-student-dropdown"
                >
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                <span className="material-icons decanatura-select-arrow">keyboard_arrow_down</span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="decanatura-semaforo-cards">
            <div className="decanatura-semaforo-card decanatura-card-green">Aprobadas</div>
            <div className="decanatura-semaforo-card decanatura-card-yellow">En curso</div>
            <div className="decanatura-semaforo-card decanatura-card-red">Pendientes</div>
          </div>

          {/* Tablas */}
          <div className="decanatura-semester-tables">
            <div className="decanatura-semester-table">
              <h3>Semestres 1 - 4</h3>
              {/* Botones de semestre eliminados, solo queda la tabla */}
              {/* Materias por semestre 1-4 */}
                <table className="decanatura-materias-table">
                  <thead>
                    <tr>
                      {[1,2,3,4].map(num => (
                        <th key={num} className="decanatura-semestre-btn">SEMESTRE {num}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {[1,2,3,4].map(num => (
                        <td key={num}>
                          {getMateriasSemestre(num.toString()).length === 0 ? (
                            <span className="decanatura-materia-estado" style={{ opacity: 0.5 }}>Sin materias</span>
                          ) : (
                            getMateriasSemestre(num.toString()).map((mat, idx) => (
                              <div key={idx} className="decanatura-materia-item">
                                <span
                                  className={
                                    "decanatura-materia-badge " +
                                    (mat.estado === "aprobada"
                                      ? "decanatura-materia-aprobada"
                                      : mat.estado === "en_curso"
                                      ? "decanatura-materia-curso"
                                      : "decanatura-materia-pendiente")
                                  }
                                >
                                  {mat.nombre}
                                </span>
                                <span className="decanatura-materia-estado">
                                  {mat.estado === "aprobada" ? "Aprobada" : mat.estado === "en_curso" ? "En curso" : "Pendiente"}
                                </span>
                              </div>
                            ))
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
            </div>

            <div className="decanatura-semester-table">
              <h3>Semestres 5 - 8</h3>
              {/* Botones de semestre eliminados, solo queda la tabla */}
              {/* Materias por semestre 5-8 */}
                <table className="decanatura-materias-table">
                  <thead>
                    <tr>
                      {[5,6,7,8].map(num => (
                        <th key={num} className="decanatura-semestre-btn">SEMESTRE {num}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {[5,6,7,8].map(num => (
                        <td key={num}>
                          {getMateriasSemestre(num.toString()).length === 0 ? (
                            <span className="decanatura-materia-estado" style={{ opacity: 0.5 }}>Sin materias</span>
                          ) : (
                            getMateriasSemestre(num.toString()).map((mat, idx) => (
                              <div key={idx} className="decanatura-materia-item">
                                <span
                                  style={{
                                    background:
                                      mat.estado === "aprobada"
                                        ? "#059669"
                                        : mat.estado === "en_curso"
                                        ? "#f59e0b"
                                        : "#dc2626",
                                    color: "#fff",
                                    borderRadius: "6px",
                                    padding: "4px 12px",
                                    fontWeight: 600,
                                    marginRight: "8px"
                                  }}
                                >
                                  {mat.nombre}
                                </span>
                                <span style={{ fontWeight: 400, color: "#374151" }}>
                                  {mat.estado === "aprobada" ? "Aprobada" : mat.estado === "en_curso" ? "En curso" : "Pendiente"}
                                </span>
                              </div>
                            ))
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </section>
      </div>
    </Dashboard>
  );
}
