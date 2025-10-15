import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Solicitudes.css";

const Solicitudes = () => {
  const navigate = useNavigate();
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [estadoFilter, setEstadoFilter] = useState("TODOS");
  const [fechaFilter, setFechaFilter] = useState("");

  // Datos de ejemplo para las solicitudes
  const solicitudes = [
    {
      id: 1,
      codigo: "SOL-001",
      estudiante: "Juan Pérez García",
      materia: "Cálculo Diferencial",
      estado: "PENDIENTE",
      fecha: "2025-09-15",
      fechaCreacion: "2025-09-15",
      idEstudiante: "2021001234",
      semestre: "3",
      carrera: "Ingeniería de Sistemas",
      materiaActual: "Cálculo I",
      materiaSolicitada: "Cálculo Diferencial",
      capacidadActual: 28,
      cupoMaximo: 30,
      listaEspera: 3,
      diasRestantes: 3
    },
    {
      id: 2,
      codigo: "SOL-002",
      estudiante: "María González López",
      materia: "Programación I",
      estado: "APROBADA",
      fecha: "2025-09-14",
      fechaCreacion: "2025-09-14",
      idEstudiante: "2021001235",
      semestre: "2",
      carrera: "Ingeniería de Sistemas",
      materiaActual: "Fundamentos de Programación",
      materiaSolicitada: "Programación I",
      capacidadActual: 25,
      cupoMaximo: 35,
      listaEspera: 0,
      diasRestantes: 0
    },
    {
      id: 3,
      codigo: "SOL-003",
      estudiante: "Carlos Rodríguez Sánchez",
      materia: "Física I",
      estado: "RECHAZADA",
      fecha: "2025-09-13",
      fechaCreacion: "2025-09-13",
      idEstudiante: "2021001236",
      semestre: "1",
      carrera: "Ingeniería Civil",
      materiaActual: "Física Básica",
      materiaSolicitada: "Física I",
      capacidadActual: 30,
      cupoMaximo: 30,
      listaEspera: 5,
      diasRestantes: 0
    },
    {
      id: 4,
      codigo: "SOL-004",
      estudiante: "Ana Martínez Ruiz",
      materia: "Álgebra Lineal",
      estado: "PENDIENTE",
      fecha: "2025-09-16",
      fechaCreacion: "2025-09-16",
      idEstudiante: "2021001237",
      semestre: "4",
      carrera: "Ingeniería de Sistemas",
      materiaActual: "Matemáticas II",
      materiaSolicitada: "Álgebra Lineal",
      capacidadActual: 27,
      cupoMaximo: 30,
      listaEspera: 1,
      diasRestantes: 4
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que quieres salir de la aplicación?");
    if (confirmLogout) {
      navigate("/");
    }
  };

  const filteredSolicitudes = solicitudes.filter(sol => {
    const matchEstado = estadoFilter === "TODOS" || sol.estado === estadoFilter;
    const matchFecha = !fechaFilter || sol.fecha === fechaFilter;
    return matchEstado && matchFecha;
  });

  const handleSolicitudClick = (solicitud) => {
    setSelectedSolicitud(solicitud);
  };

  const handleAprobar = () => {
    if (selectedSolicitud) {
      // Validaciones de decanatura
      if (selectedSolicitud.capacidadActual >= selectedSolicitud.cupoMaximo) {
        alert(`No se puede aprobar: El grupo ya está lleno (${selectedSolicitud.cupoMaximo}/${selectedSolicitud.cupoMaximo})`);
        return;
      }
      
      if (selectedSolicitud.diasRestantes <= 0) {
        alert("No se puede aprobar: La solicitud ha excedido el plazo máximo de resolución");
        return;
      }

      // Verificar si el grupo está cerca del límite
      const porcentajeCapacidad = (selectedSolicitud.capacidadActual / selectedSolicitud.cupoMaximo) * 100;
      if (porcentajeCapacidad >= 90) {
        const confirmacion = window.confirm(
          `ADVERTENCIA: El grupo está al ${Math.round(porcentajeCapacidad)}% de su capacidad. ¿Desea continuar con la aprobación?`
        );
        if (!confirmacion) return;
      }

      alert(`Solicitud ${selectedSolicitud.codigo} aprobada exitosamente`);
      // Aquí se actualizaría el estado de la solicitud
    }
  };

  const handleRechazar = () => {
    if (selectedSolicitud) {
      const motivo = prompt("Ingrese el motivo del rechazo:");
      if (motivo) {
        alert(`Solicitud ${selectedSolicitud.codigo} rechazada. Motivo: ${motivo}`);
        // Aquí se actualizaría el estado de la solicitud
      }
    }
  };

  const handleSolicitarInfo = () => {
    if (selectedSolicitud) {
      const informacion = prompt("¿Qué información adicional necesita?");
      if (informacion) {
        alert(`Se ha solicitado información adicional al estudiante: ${informacion}`);
        // Aquí se enviaría la solicitud de información
      }
    }
  };

  return (
    <div className="solicitudes-container">
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
              <span className="material-icons">home</span>
              INICIO
            </li>
            <li className="nav-item active">
              <span className="material-icons">description</span>
              SOLICITUDES
            </li>
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/semaforo")}
            >
              <span className="material-icons">traffic</span>
              SEMÁFORO
            </li>
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/estudiantes")}
            >
              <span className="material-icons">people</span>
              ESTUDIANTES
            </li>
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/grupos-materias")}
            >
              <span className="material-icons">class</span>
              GRUPOS Y MATERIAS
            </li>
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/configuracion")}
            >
              <span className="material-icons">settings</span>
              CONFIGURACIÓN ACADÉMICA
            </li>
          </ul>
        </nav>

        <div className="logout clickable" onClick={handleLogout}>
          <span className="material-icons">exit_to_app</span>
          SALIR
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <img
            src="https://img.genial.ly/60942d42948f6b0f9f6d906d/b8e7c67d-b995-4bd0-befe-a271a218ef78.png"
            alt="Logo Escuela Colombiana de Ingeniería"
            className="logo-image"
          />
          <div className="profile-icon">
            <span className="material-icons">person_outline</span>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          <h1>Gestión de solicitudes</h1>
          <p className="subtitle">Consulta y gestión de solicitudes de cambio de materia de su facultad</p>

          <div className="solicitudes-layout">
            {/* Panel izquierdo - Listado de solicitudes */}
            <div className="left-panel">
              <div className="panel-header">
                <h2>LISTADO DE SOLICITUDES</h2>
                <div className="filters">
                  <div className="filter-group">
                    <label>ESTADO</label>
                    <select 
                      value={estadoFilter} 
                      onChange={(e) => setEstadoFilter(e.target.value)}
                      className="filter-select"
                    >
                      <option value="TODOS">TODOS</option>
                      <option value="PENDIENTE">PENDIENTE</option>
                      <option value="APROBADA">APROBADA</option>
                      <option value="RECHAZADA">RECHAZADA</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>FECHA</label>
                    <input 
                      type="date" 
                      value={fechaFilter}
                      onChange={(e) => setFechaFilter(e.target.value)}
                      className="filter-input"
                    />
                  </div>
                </div>
              </div>

              <div className="solicitudes-table">
                <div className="table-header">
                  <div className="header-cell">Código</div>
                  <div className="header-cell">Nombre del estudiante</div>
                  <div className="header-cell">Materia solicitada</div>
                </div>
                <div className="table-body">
                  {filteredSolicitudes.map(solicitud => (
                    <div 
                      key={solicitud.id}
                      className={`table-row ${selectedSolicitud?.id === solicitud.id ? 'selected' : ''}`}
                      onClick={() => handleSolicitudClick(solicitud)}
                    >
                      <div className="cell">{solicitud.codigo}</div>
                      <div className="cell">{solicitud.estudiante}</div>
                      <div className="cell">{solicitud.materia}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel derecho - Detalles de la solicitud */}
            <div className="right-panel">
              <h2>DETALLES DE LA SOLICITUD</h2>
              
              {selectedSolicitud ? (
                <div className="details-content">
                  <div className="details-grid">
                    <div className="detail-group">
                      <label>Código de la solicitud</label>
                      <input type="text" value={selectedSolicitud.codigo} readOnly />
                    </div>
                    <div className="detail-group">
                      <label>Materia actual</label>
                      <input type="text" value={selectedSolicitud.materiaActual} readOnly />
                    </div>
                    <div className="detail-group">
                      <label>Materia solicitada</label>
                      <input type="text" value={selectedSolicitud.materiaSolicitada} readOnly />
                    </div>
                    <div className="detail-group">
                      <label>Estado</label>
                      <input 
                        type="text" 
                        value={selectedSolicitud.estado} 
                        readOnly 
                        className={`status-input ${selectedSolicitud.estado.toLowerCase()}`}
                      />
                    </div>
                    <div className="detail-group">
                      <label>Fecha de creación</label>
                      <input type="text" value={selectedSolicitud.fechaCreacion} readOnly />
                    </div>
                    <div className="detail-group">
                      <label>Días restantes para resolver</label>
                      <input 
                        type="text" 
                        value={`${selectedSolicitud.diasRestantes} días`} 
                        readOnly 
                        className={selectedSolicitud.diasRestantes <= 1 ? 'urgent' : ''}
                      />
                    </div>
                  </div>

                  <div className="student-section">
                    <h3>DATOS DEL ESTUDIANTE</h3>
                    <div className="student-grid">
                      <div className="detail-group">
                        <label>ID del estudiante</label>
                        <input type="text" value={selectedSolicitud.idEstudiante} readOnly />
                      </div>
                      <div className="detail-group">
                        <label>Nombre del estudiante</label>
                        <input type="text" value={selectedSolicitud.estudiante} readOnly />
                      </div>
                      <div className="detail-group">
                        <label>Semestre</label>
                        <input type="text" value={selectedSolicitud.semestre} readOnly />
                      </div>
                      <div className="detail-group">
                        <label>Carrera</label>
                        <input type="text" value={selectedSolicitud.carrera} readOnly />
                      </div>
                    </div>
                  </div>

                  <div className="capacity-section">
                    <h3>DISPONIBILIDAD DEL GRUPO</h3>
                    <div className="capacity-info">
                      <div className="capacity-item">
                        <label>Capacidad actual</label>
                        <div className="capacity-bar">
                          <div 
                            className="capacity-fill" 
                            style={{
                              width: `${(selectedSolicitud.capacidadActual / selectedSolicitud.cupoMaximo) * 100}%`,
                              backgroundColor: (selectedSolicitud.capacidadActual / selectedSolicitud.cupoMaximo) >= 0.9 ? '#ef4444' : '#10b981'
                            }}
                          ></div>
                          <span className="capacity-text">
                            {selectedSolicitud.capacidadActual}/{selectedSolicitud.cupoMaximo}
                          </span>
                        </div>
                      </div>
                      <div className="capacity-details">
                        <div className="detail-group">
                          <label>Cupo máximo del grupo</label>
                          <input type="text" value={selectedSolicitud.cupoMaximo} readOnly />
                        </div>
                        <div className="detail-group">
                          <label>Lista de espera</label>
                          <input 
                            type="text" 
                            value={selectedSolicitud.listaEspera > 0 ? `${selectedSolicitud.listaEspera} estudiantes` : 'Sin lista de espera'} 
                            readOnly 
                          />
                        </div>
                      </div>
                      
                      {(selectedSolicitud.capacidadActual / selectedSolicitud.cupoMaximo) >= 0.9 && (
                        <div className="alert-warning">
                          ⚠️ ALERTA: El grupo está al {Math.round((selectedSolicitud.capacidadActual / selectedSolicitud.cupoMaximo) * 100)}% de su capacidad
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="actions-section">
                    <div className="action-buttons">
                      <button 
                        className="btn-aprobar" 
                        onClick={handleAprobar}
                        disabled={selectedSolicitud.capacidadActual >= selectedSolicitud.cupoMaximo}
                      >
                        Aprobar
                      </button>
                      <button className="btn-rechazar" onClick={handleRechazar}>
                        Rechazar
                      </button>
                      <button className="btn-info" onClick={handleSolicitarInfo}>
                        Solicitar más información
                      </button>
                    </div>
                    <div className="comments-section">
                      <label>Comentarios:</label>
                      <textarea 
                        placeholder="Agregar comentarios sobre la solicitud... (Ej: Grupo lleno, documentación incompleta, etc.)"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-selection">
                  <p>Seleccione una solicitud de la lista para ver los detalles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Solicitudes;