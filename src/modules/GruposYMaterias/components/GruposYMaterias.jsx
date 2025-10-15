import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GruposYMaterias.css";

const GruposYMaterias = () => {
  const navigate = useNavigate();
  const [selectedMateria, setSelectedMateria] = useState("");
  const [selectedGrupo, setSelectedGrupo] = useState(null);

  // Materias de Ingeniería de Sistemas
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

  // Grupos por materia
  const gruposPorMateria = {
    1: [ // Introducción a la Programación
      { grupo: "A", docente: "Dr. Carlos Mendoza", capacidadActual: 28, cupoMaximo: 35, listaEspera: 3, horario: "L-M-V 7:00-8:30" },
      { grupo: "B", docente: "Mg. Ana Ruiz", capacidadActual: 35, cupoMaximo: 35, listaEspera: 8, horario: "L-M-V 8:30-10:00" },
      { grupo: "C", docente: "Dr. Pedro García", capacidadActual: 22, cupoMaximo: 30, listaEspera: 0, horario: "M-J-V 10:00-11:30" },
    ],
    2: [ // Proyecto Integrador 1 Introducción a la Ingeniería de Sistemas
      { grupo: "A", docente: "Dr. María López", capacidadActual: 32, cupoMaximo: 35, listaEspera: 5, horario: "L-M-V 7:00-8:30" },
      { grupo: "B", docente: "Mg. Jorge Ramírez", capacidadActual: 30, cupoMaximo: 35, listaEspera: 2, horario: "M-J-V 8:30-10:00" },
    ],
    3: [ // Álgebra Lineal
      { grupo: "A", docente: "Dr. Luis Herrera", capacidadActual: 25, cupoMaximo: 30, listaEspera: 0, horario: "L-M-V 10:00-11:30" },
      { grupo: "B", docente: "Mg. Carmen Silva", capacidadActual: 28, cupoMaximo: 30, listaEspera: 3, horario: "M-J-V 2:00-3:30" },
    ],
    4: [ // Diseño de Datos y Algoritmos
      { grupo: "A", docente: "Dr. Roberto Díaz", capacidadActual: 30, cupoMaximo: 32, listaEspera: 6, horario: "L-M-V 8:30-10:00" },
      { grupo: "B", docente: "Mg. Sofía Torres", capacidadActual: 28, cupoMaximo: 32, listaEspera: 1, horario: "M-J-V 10:00-11:30" },
    ],
    5: [ // Matemáticas para Informática
      { grupo: "A", docente: "Dr. Fernando Castro", capacidadActual: 26, cupoMaximo: 30, listaEspera: 0, horario: "L-M-V 7:00-8:30" },
    ],
    6: [ // Modelos y Servicios de Datos
      { grupo: "A", docente: "Dr. Elena Vargas", capacidadActual: 24, cupoMaximo: 28, listaEspera: 2, horario: "M-J-V 8:30-10:00" },
    ],
    7: [ // Desarrollo Orientado por Objetos
      { grupo: "A", docente: "Mg. Andrés Morales", capacidadActual: 20, cupoMaximo: 25, listaEspera: 0, horario: "L-M-V 10:00-11:30" },
      { grupo: "B", docente: "Dr. Patricia Jiménez", capacidadActual: 22, cupoMaximo: 25, listaEspera: 4, horario: "M-J-V 2:00-3:30" },
    ],
    8: [ // Teoría de la Programación y la Computación
      { grupo: "A", docente: "Dr. Gabriel Sánchez", capacidadActual: 18, cupoMaximo: 22, listaEspera: 0, horario: "L-M-V 8:30-10:00" },
    ],
    9: [ // Desarrollo y Operaciones Software
      { grupo: "A", docente: "Mg. Isabella Cruz", capacidadActual: 26, cupoMaximo: 30, listaEspera: 3, horario: "M-J-V 10:00-11:30" },
    ],
    10: [ // Arquitecturas de Software
      { grupo: "A", docente: "Dr. Miguel Flores", capacidadActual: 16, cupoMaximo: 20, listaEspera: 0, horario: "L-M-V 2:00-3:30" },
    ],
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que quieres salir de la aplicación?");
    if (confirmLogout) {
      navigate("/");
    }
  };

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
      // Aquí iría la lógica para actualizar el cupo
      alert(`Cupo máximo del grupo ${grupo.grupo} actualizado a ${nuevoCupo}`);
    }
  };

  return (
    <div className="grupos-materias-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>SIRHA</h1>
          <p>Sistema Académico</p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/dashboard")}
            >
              <span className="material-icons">home</span> INICIO
            </li>
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/solicitudes")}
            >
              <span className="material-icons">description</span> SOLICITUDES
            </li>
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/semaforo")}
            >
              <span className="material-icons">traffic</span> SEMÁFORO
            </li>
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/estudiantes")}
            >
              <span className="material-icons">people</span> ESTUDIANTES
            </li>
            <li className="nav-item active">
              <span className="material-icons">class</span> GRUPOS Y MATERIAS
            </li>
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/configuracion")}
            >
              <span className="material-icons">settings</span> CONFIGURACIÓN ACADÉMICA
            </li>
          </ul>
        </nav>

        <div className="logout clickable" onClick={handleLogout}>
          <span className="material-icons">logout</span> SALIR
        </div>
      </aside>

      {/* Main content */}
      <div className="main-content">
        <header className="main-header">
          <img
            src="https://img.genial.ly/60942d42948f6b0f9f6d906d/b8e7c67d-b995-4bd0-befe-a271a218ef78.png"
            alt="Logo"
          />
          <div className="profile-icon">
            <span className="material-icons">person</span>
          </div>
        </header>

        <section className="content-section">
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
        </section>
      </div>
    </div>
  );
};

export default GruposYMaterias;