import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { useNavigate } from "react-router-dom"; // No necesario si Dashboard maneja navegación
import "../../styles/GruposYMateriasDecanatura.css"; // Usa el CSS que me pases después

const materias = [
  { id: 1, nombre: "Introducción a la Programación", semestre: 1 },
  { id: 2, nombre: "Proyecto Integrador 1 Introducción a la Ingeniería de Sistemas", semestre: 1 },
  { id: 3, nombre: "Álgebra Lineal", semestre: 1 },
  { id: 4, nombre: "Diseño de Datos y Algoritmos", semestre: 2 },
  { id: 5, nombre: "Matemáticas para Informática", semestre: 2 },
  { id: 6, nombre: "Modelos y Servicios de Datos", semestre: 3 },
  { id: 7, nombre: "Desarrollo Orientado por Objetos", semestre: 4 },
  { id: 8, nombre: "Teoría de la Programación y la Computación", semestre: 4 },
  { id: 9, nombre: "Desarrollo y Operaciones Software", semestre: 5 },
  { id: 10, nombre: "Arquitecturas de Software", semestre: 6 },
];

const gruposPorMateria = {
  1: [
    {
      grupo: "A",
      docente: "Dr. Carlos Mendoza",
      capacidadActual: 28,
      cupoMaximo: 35,
      listaEspera: 3,
      horario: "L-M-V 7:00-8:30"
    },
    {
      grupo: "B",
      docente: "Mg. Ana Ruiz",
      capacidadActual: 35,
      cupoMaximo: 35,
      listaEspera: 8,
      horario: "L-M-V 8:30-10:00"
    },
    {
      grupo: "C",
      docente: "Dr. Pedro García",
      capacidadActual: 22,
      cupoMaximo: 30,
      listaEspera: 0,
      horario: "M-J-V 10:00-11:30"
    }
  ]
};

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

const GruposMateriaDecanatura = () => {
  const [selectedMateria, setSelectedMateria] = useState("");
  const [selectedGrupo, setSelectedGrupo] = useState(null);

  const handleMateriaChange = (event) => {
    setSelectedMateria(event.target.value);
    setSelectedGrupo(null);
  };

  const handleGrupoSelect = (grupo) => {
    setSelectedGrupo(grupo);
  };

  const getGruposActuales = () => {
    if (!selectedMateria) return [];
    return gruposPorMateria[selectedMateria] || [];
  };

  const getCapacidadPorcentaje = (actual, maximo) => {
    return Math.round((actual / maximo) * 100);
  };

  const getEstadoCapacidad = (porcentaje) => {
    if (porcentaje >= 90) return "critico";
    if (porcentaje >= 75) return "alerta";
    return "normal";
  };

  const handleModificarCupo = (grupo) => {
    const nuevoCupo = prompt(`Modificar cupo máximo para grupo ${grupo.grupo}:`, grupo.cupoMaximo);
    if (nuevoCupo && !isNaN(nuevoCupo)) {
      alert(`Cupo máximo del grupo ${grupo.grupo} actualizado a ${nuevoCupo}`);
    }
  };

  return (
    <Dashboard user={userDecanatura}>
      <div className="grupos-materias-content">
        <div className="page-header">
          <h1>Gestión de grupos y materias</h1>
          <p>Administración de capacidades y cupos por grupo</p>
        </div>

        {/* Selector de materia */}
        <div className="materia-selector">
          <label htmlFor="materia-select">MATERIAS</label>
          <div className="select-wrapper">
            <select 
              id="materia-select"
              value={selectedMateria} 
              onChange={handleMateriaChange}
              className="materia-dropdown"
            >
              <option value="">Seleccionar materia</option>
              {materias.map(materia => (
                <option key={materia.id} value={materia.id}>
                  {materia.nombre} (Semestre {materia.semestre})
                </option>
              ))}
            </select>
            <span className="material-icons select-arrow">keyboard_arrow_down</span>
          </div>
        </div>

        {/* Tabla de grupos disponibles */}
        {selectedMateria && (
          <div className="grupos-section">
            <h2>GRUPOS DISPONIBLES</h2>
            <div className="grupos-table-container">
              <table className="grupos-table">
                <thead>
                  <tr>
                    <th>Grupo</th>
                    <th>Docente</th>
                    <th>Capacidad actual</th>
                    <th>Cupos</th>
                    <th>Lista de espera</th>
                    <th>Horario</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {getGruposActuales().map((grupo, index) => {
                    const porcentaje = getCapacidadPorcentaje(grupo.capacidadActual, grupo.cupoMaximo);
                    const estado = getEstadoCapacidad(porcentaje);
                    
                    return (
                      <tr 
                        key={index} 
                        className={selectedGrupo === grupo ? 'selected' : ''}
                        onClick={() => handleGrupoSelect(grupo)}
                      >
                        <td className="grupo-cell">{grupo.grupo}</td>
                        <td>{grupo.docente}</td>
                        <td className="capacidad-cell">
                          <span className="capacidad-numero">{grupo.capacidadActual}</span>
                        </td>
                        <td className="cupos-cell">
                          <span className="cupos-numero">{grupo.cupoMaximo}</span>
                        </td>
                        <td className="espera-cell">
                          {grupo.listaEspera > 0 ? (
                            <span className="espera-numero">{grupo.listaEspera}</span>
                          ) : (
                            <span className="sin-espera">0</span>
                          )}
                        </td>
                        <td className="horario-cell">{grupo.horario}</td>
                        <td className="estado-cell">
                          <div className={`estado-indicator ${estado}`}>
                            <div className="capacidad-bar">
                              <div 
                                className="capacidad-fill" 
                                style={{ width: `${porcentaje}%` }}
                              ></div>
                            </div>
                            <span className="porcentaje">{porcentaje}%</span>
                          </div>
                        </td>
                        <td className="acciones-cell">
                          <button 
                            className="btn-modificar"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleModificarCupo(grupo);
                            }}
                          >
                            <span className="material-icons">edit</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Panel de detalles del grupo seleccionado */}
        {selectedGrupo && (
          <div className="grupo-details">
            <h3>Detalles del Grupo {selectedGrupo.grupo}</h3>
            <div className="details-grid">
              <div className="detail-card">
                <h4>Información General</h4>
                <div className="detail-item">
                  <label>Docente:</label>
                  <span>{selectedGrupo.docente}</span>
                </div>
                <div className="detail-item">
                  <label>Horario:</label>
                  <span>{selectedGrupo.horario}</span>
                </div>
                <div className="detail-item">
                  <label>Cupo Máximo:</label>
                  <span>{selectedGrupo.cupoMaximo} estudiantes</span>
                </div>
              </div>

              <div className="detail-card">
                <h4>Estado de Capacidad</h4>
                <div className="capacidad-detalle">
                  <div className="capacidad-visual">
                    <div className="capacidad-circle">
                      <span className="capacidad-text">
                        {getCapacidadPorcentaje(selectedGrupo.capacidadActual, selectedGrupo.cupoMaximo)}%
                      </span>
                    </div>
                  </div>
                  <div className="capacidad-info">
                    <p><strong>Estudiantes inscritos:</strong> {selectedGrupo.capacidadActual}</p>
                    <p><strong>Cupos disponibles:</strong> {selectedGrupo.cupoMaximo - selectedGrupo.capacidadActual}</p>
                    <p><strong>Lista de espera:</strong> {selectedGrupo.listaEspera}</p>
                  </div>
                </div>
              </div>

              <div className="detail-card">
                <h4>Acciones Administrativas</h4>
                <div className="admin-actions">
                  <button className="btn-action primary">
                    <span className="material-icons">people</span>
                    Ver Estudiantes
                  </button>
                  <button className="btn-action secondary">
                    <span className="material-icons">add</span>
                    Aumentar Cupo
                  </button>
                  <button className="btn-action warning">
                    <span className="material-icons">remove</span>
                    Reducir Cupo
                  </button>
                  <button className="btn-action info">
                    <span className="material-icons">list</span>
                    Gestionar Lista
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!selectedMateria && (
          <div className="no-selection">
            <span className="material-icons">school</span>
            <h3>Selecciona una materia</h3>
            <p>Elige una materia del menú desplegable para ver sus grupos disponibles</p>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default GruposMateriaDecanatura;
