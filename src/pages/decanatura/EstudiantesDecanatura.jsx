import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/EstudiantesDecanatura.css";
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

export default function EstudiantesDecanatura() {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterSemestre, setFilterSemestre] = useState("");
  const [filterEstado, setFilterEstado] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const estudiantes = [
    { id: 1, codigo: "2021001234", nombre: "Ana María González Rodríguez", carrera: "Ingeniería de Sistemas", semestre: 6, estado: "ACTIVO", promedio: 4.2, creditos: 120, materiasActuales: 5, riesgoAcademico: false, telefono: "3001234567", email: "ana.gonzalez@estudiante.edu.co" },
    { id: 2, codigo: "2020001235", nombre: "Carlos Eduardo Ruiz Martínez", carrera: "Ingeniería de Sistemas", semestre: 8, estado: "ACTIVO", promedio: 3.8, creditos: 140, materiasActuales: 4, riesgoAcademico: false, telefono: "3007654321", email: "carlos.ruiz@estudiante.edu.co" },
    { id: 3, codigo: "2021001236", nombre: "Diana Patricia López Sánchez", carrera: "Ingeniería de Sistemas", semestre: 4, estado: "ACTIVO", promedio: 3.1, creditos: 80, materiasActuales: 6, riesgoAcademico: true, telefono: "3009876543", email: "diana.lopez@estudiante.edu.co" },
    { id: 4, codigo: "2019001237", nombre: "Felipe Andrés Martín Torres", carrera: "Ingeniería de Sistemas", semestre: 8, estado: "ACTIVO", promedio: 4.5, creditos: 160, materiasActuales: 3, riesgoAcademico: false, telefono: "3001112233", email: "felipe.martin@estudiante.edu.co" },
    { id: 5, codigo: "2021001238", nombre: "Gabriela Sofía Torres Herrera", carrera: "Ingeniería de Sistemas", semestre: 2, estado: "ACTIVO", promedio: 4.0, creditos: 40, materiasActuales: 5, riesgoAcademico: false, telefono: "3005556666", email: "gabriela.torres@estudiante.edu.co" },
    { id: 6, codigo: "2020001239", nombre: "Héctor Manuel Jiménez Vargas", carrera: "Ingeniería de Sistemas", semestre: 7, estado: "SUSPENDIDO", promedio: 2.8, creditos: 110, materiasActuales: 0, riesgoAcademico: true, telefono: "3007778888", email: "hector.jimenez@estudiante.edu.co" },
    { id: 7, codigo: "2022001240", nombre: "Isabella Cruz Mendoza", carrera: "Ingeniería de Sistemas", semestre: 3, estado: "ACTIVO", promedio: 3.9, creditos: 60, materiasActuales: 5, riesgoAcademico: false, telefono: "3004445555", email: "isabella.cruz@estudiante.edu.co" },
    { id: 8, codigo: "2020001241", nombre: "Jorge Luis Ramírez Castro", carrera: "Ingeniería de Sistemas", semestre: 8, estado: "ACTIVO", promedio: 4.1, creditos: 150, materiasActuales: 4, riesgoAcademico: false, telefono: "3006667777", email: "jorge.ramirez@estudiante.edu.co" },
    { id: 9, codigo: "2021001242", nombre: "Karla Daniela Soto Pérez", carrera: "Ingeniería de Sistemas", semestre: 5, estado: "ACTIVO", promedio: 3.7, creditos: 100, materiasActuales: 5, riesgoAcademico: false, telefono: "3008889999", email: "karla.soto@estudiante.edu.co" },
    { id: 10, codigo: "2019001243", nombre: "Luis Fernando Herrera Díaz", carrera: "Ingeniería de Sistemas", semestre: 8, estado: "GRADUADO", promedio: 4.3, creditos: 170, materiasActuales: 0, riesgoAcademico: false, telefono: "3002223333", email: "luis.herrera@estudiante.edu.co" }
  ];

  const estados = ["ACTIVO", "SUSPENDIDO", "GRADUADO"];

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const filteredStudents = estudiantes.filter(student => {
    return (
      (filterSemestre === "" || student.semestre.toString() === filterSemestre) &&
      (filterEstado === "" || student.estado === filterEstado) &&
      (searchTerm === "" || 
        student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.codigo.includes(searchTerm))
    );
  });

  return (
    <Dashboard user={userDecanatura}>
      <div className="decanatura-main-box">
        <div className="estudiantes-container">
          <section className="content-section">
            <div className="page-header">
              <h1>Gestión de Estudiantes</h1>
              <p>Facultad de Ingeniería - Programa de Ingeniería de Sistemas</p>
            </div>
            <div className="filters-section">
              <div className="search-box">
                <span className="material-icons">search</span>
                <input
                  type="text"
                  placeholder="Buscar por nombre o código..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filters">
                <select 
                  value={filterSemestre} 
                  onChange={(e) => setFilterSemestre(e.target.value)}
                >
                  <option value="">Todos los semestres</option>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem}>Semestre {sem}</option>
                  ))}
                </select>
                <select 
                  value={filterEstado} 
                  onChange={(e) => setFilterEstado(e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="estudiantes-layout">
              <div className="left-panel">
                <div className="panel-header">
                  <h2>Lista de Estudiantes ({filteredStudents.length})</h2>
                </div>
                <div className="students-list">
                  {filteredStudents.map(student => (
                    <div 
                      key={student.id}
                      className={`student-card ${selectedStudent?.id === student.id ? 'selected' : ''}`}
                      onClick={() => handleStudentSelect(student)}
                    >
                      <div className="student-main-info">
                        <h3>{student.nombre}</h3>
                        <p className="student-code">{student.codigo}</p>
                      </div>
                      <div className="student-details">
                        <span className="semestre">Sem. {student.semestre}</span>
                        <span className={`estado ${student.estado.toLowerCase()}`}>
                          {student.estado}
                        </span>
                      </div>
                      <div className="student-indicators">
                        {student.riesgoAcademico && (
                          <span className="risk-indicator">
                            <span className="material-icons">warning</span>
                            Riesgo
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="right-panel">
                {selectedStudent ? (
                  <div className="student-details-view">
                    <div className="details-header">
                      <h2>Información Detallada</h2>
                      <div className="student-photo">
                        <span className="material-icons">account_circle</span>
                      </div>
                    </div>
                    <div className="details-content">
                      <div className="info-section">
                        <h3>Datos Personales</h3>
                        <div className="info-grid">
                          <div className="info-item">
                            <label>Código Estudiantil:</label>
                            <span>{selectedStudent.codigo}</span>
                          </div>
                          <div className="info-item">
                            <label>Nombre Completo:</label>
                            <span>{selectedStudent.nombre}</span>
                          </div>
                          <div className="info-item">
                            <label>Programa:</label>
                            <span>Ingeniería de Sistemas</span>
                          </div>
                          <div className="info-item">
                            <label>Semestre Actual:</label>
                            <span>{selectedStudent.semestre}</span>
                          </div>
                          <div className="info-item">
                            <label>Estado:</label>
                            <span className={`status ${selectedStudent.estado.toLowerCase()}`}>
                              {selectedStudent.estado}
                            </span>
                          </div>
                          <div className="info-item">
                            <label>Email:</label>
                            <span>{selectedStudent.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="info-section">
                        <h3>Información Académica</h3>
                        <div className="academic-stats">
                          <div className="stat-card">
                            <span className="stat-value">{selectedStudent.promedio}</span>
                            <span className="stat-label">Promedio</span>
                          </div>
                          <div className="stat-card">
                            <span className="stat-value">{selectedStudent.creditos}</span>
                            <span className="stat-label">Créditos</span>
                          </div>
                          <div className="stat-card">
                            <span className="stat-value">{selectedStudent.materiasActuales}</span>
                            <span className="stat-label">Materias Actuales</span>
                          </div>
                        </div>
                      </div>
                      {selectedStudent.riesgoAcademico && (
                        <div className="info-section alert-section">
                          <h3>
                            <span className="material-icons">warning</span>
                            Alertas Académicas
                          </h3>
                          <div className="alert-item">
                            <span className="material-icons">error</span>
                            <span>Estudiante en riesgo académico - Promedio bajo</span>
                          </div>
                        </div>
                      )}
                      <div className="info-section">
                        <h3>Acciones Rápidas</h3>
                        <div className="action-buttons">
                          <button className="btn-action primary">
                            <span className="material-icons">visibility</span>
                            Ver Semáforo
                          </button>
                          <button className="btn-action secondary">
                            <span className="material-icons">schedule</span>
                            Ver Horario
                          </button>
                          <button className="btn-action warning">
                            <span className="material-icons">edit</span>
                            Editar Información
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-selection">
                    <span className="material-icons">people</span>
                    <h3>Selecciona un estudiante</h3>
                    <p>Elige un estudiante de la lista para ver su información detallada</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Dashboard>
  );
}
