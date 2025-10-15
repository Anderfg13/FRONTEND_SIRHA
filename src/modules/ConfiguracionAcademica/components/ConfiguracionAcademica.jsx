import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ConfiguracionAcademica.css";


const ConfiguracionAcademica = () => {
  const navigate = useNavigate();
  
  // Estados para la configuración de períodos
  const [modalidadActual, setModalidadActual] = useState("PRESENCIAL");
  const [horaInicio, setHoraInicio] = useState("07:00");
  const [horaFin, setHoraFin] = useState("18:00");
  const [fechaInicio, setFechaInicio] = useState("2025-10-01");
  const [fechaFin, setFechaFin] = useState("2025-10-15");
  
  // Estados para configuraciones adicionales
  const [periodoActual, setPeriodoActual] = useState("2025-2");
  const [estadoPeriodo, setEstadoPeriodo] = useState("ACTIVO");
  const [tipoConfiguracion, setTipoConfiguracion] = useState("CAMBIO_MATERIAS");

  // Configuraciones predefinidas
  const modalidades = [
    { value: "VIRTUAL", label: "Virtual" }
  ];

  const tiposConfiguracion = [
    { value: "CAMBIO_MATERIAS", label: "Cambio de Materias" },
    { value: "ADICION_MATERIAS", label: "Adición de Materias" },
    { value: "CANCELACION_MATERIAS", label: "Cancelación de Materias" },
    { value: "INSCRIPCIONES", label: "Inscripciones" },
    { value: "EVALUACIONES", label: "Evaluaciones" },
    { value: "VACACIONES", label: "Vacaciones Académicas" }
  ];

  const periodos = [
    { value: "2025-1", label: "2025-I" },
    { value: "2025-2", label: "2025-II" },
    { value: "2025-3", label: "2025-III (Intersemestral)" },
    { value: "2026-1", label: "2026-I" }
  ];

  // Configuraciones históricas
  const configuracionesHistoricas = [
    {
      id: 1,
      periodo: "2025-2",
      tipo: "CAMBIO_MATERIAS",
      modalidad: "VIRTUAL",
      fechaInicio: "2025-09-15",
      fechaFin: "2025-09-30",
      horaInicio: "07:00",
      horaFin: "18:00",
      estado: "VIGENTE",
      fechaCreacion: "2025-09-01"
    },
    {
      id: 2,
      periodo: "2025-2",
      tipo: "ADICION_MATERIAS",
      modalidad: "VIRTUAL",
      fechaInicio: "2025-08-20",
      fechaFin: "2025-08-25",
      horaInicio: "08:00",
      horaFin: "17:00",
      estado: "FINALIZADO",
      fechaCreacion: "2025-08-10"
    },
    {
      id: 3,
      periodo: "2025-1",
      tipo: "INSCRIPCIONES",
      modalidad: "VIRTUAL",
      fechaInicio: "2025-01-15",
      fechaFin: "2025-01-30",
      horaInicio: "06:00",
      horaFin: "20:00",
      estado: "FINALIZADO",
      fechaCreacion: "2025-01-01"
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

  const handleActualizar = () => {
    // Validaciones
    if (!modalidadActual || !horaInicio || !horaFin || !fechaInicio || !fechaFin) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    if (new Date(fechaInicio) >= new Date(fechaFin)) {
      alert("La fecha de inicio debe ser anterior a la fecha de fin");
      return;
    }

    if (horaInicio >= horaFin) {
      alert("La hora de inicio debe ser anterior a la hora de fin");
      return;
    }

    // Confirmación
    const confirmacion = window.confirm(
      `¿Confirma la actualización de la configuración académica?\n\n` +
      `Tipo: ${tiposConfiguracion.find(t => t.value === tipoConfiguracion)?.label}\n` +
      `Período: ${periodos.find(p => p.value === periodoActual)?.label}\n` +
      `Modalidad: ${modalidades.find(m => m.value === modalidadActual)?.label}\n` +
      `Fechas: ${fechaInicio} al ${fechaFin}\n` +
      `Horarios: ${horaInicio} a ${horaFin}`
    );

    if (confirmacion) {
      alert("Configuración académica actualizada exitosamente");
      // Aquí se enviarían los datos al backend
    }
  };

  const handleEliminarConfiguracion = (configId) => {
    const config = configuracionesHistoricas.find(c => c.id === configId);
    if (config.estado === "VIGENTE") {
      alert("No se puede eliminar una configuración vigente. Primero debe finalizar el período.");
      return;
    }

    const confirmacion = window.confirm("¿Está seguro de que desea eliminar esta configuración?");
    if (confirmacion) {
      alert("Configuración eliminada exitosamente");
      // Aquí se eliminaría del backend
    }
  };

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case "VIGENTE": return "estado-vigente";
      case "FINALIZADO": return "estado-finalizado";
      case "PROGRAMADO": return "estado-programado";
      default: return "estado-inactivo";
    }
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="configuracion-academica-container">
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
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/grupos-materias")}
            >
              <span className="material-icons">class</span> GRUPOS Y MATERIAS
            </li>
            <li className="nav-item active">
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
            <h1>Períodos de cambio de materias vigentes</h1>
            <p>Configuración de horarios y fechas para procedimientos académicos</p>
          </div>

          {/* Configuración Principal */}
          <div className="config-form-container">
            <div className="form-section">
              <h2>Configuración de Período</h2>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Período Académico:</label>
                  <select 
                    value={periodoActual} 
                    onChange={(e) => setPeriodoActual(e.target.value)}
                    className="form-select"
                  >
                    {periodos.map(periodo => (
                      <option key={periodo.value} value={periodo.value}>
                        {periodo.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Tipo de Configuración:</label>
                  <select 
                    value={tipoConfiguracion} 
                    onChange={(e) => setTipoConfiguracion(e.target.value)}
                    className="form-select"
                  >
                    {tiposConfiguracion.map(tipo => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Modalidad actual:</label>
                <input
                  type="text"
                  value={modalidades.find(m => m.value === modalidadActual)?.label || ""}
                  onChange={(e) => {
                    const modalidad = modalidades.find(m => m.label === e.target.value);
                    if (modalidad) setModalidadActual(modalidad.value);
                  }}
                  className="form-input"
                  list="modalidades-list"
                />
                <datalist id="modalidades-list">
                  {modalidades.map(modalidad => (
                    <option key={modalidad.value} value={modalidad.label} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Configuración de Horarios */}
            <div className="horarios-section">
              <h3>Horarios de Atención</h3>
              <div className="horarios-grid">
                <div className="horario-group">
                  <div className="radio-group">
                    <input type="radio" id="hora-inicio" name="horario-tipo" defaultChecked />
                    <label htmlFor="hora-inicio">Hora de inicio:</label>
                  </div>
                  <input
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    className="time-input"
                  />
                </div>

                <div className="horario-group">
                  <div className="radio-group">
                    <input type="radio" id="hora-fin" name="horario-tipo" defaultChecked />
                    <label htmlFor="hora-fin">Hora de fin:</label>
                  </div>
                  <input
                    type="time"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    className="time-input"
                  />
                </div>
              </div>
            </div>

            {/* Configuración de Fechas */}
            <div className="fechas-section">
              <h3>Período de Vigencia</h3>
              <div className="fechas-grid">
                <div className="fecha-group">
                  <div className="checkbox-group">
                    <input type="checkbox" id="fecha-inicio" defaultChecked />
                    <label htmlFor="fecha-inicio">Fecha de inicio:</label>
                  </div>
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="date-input"
                  />
                </div>

                <div className="fecha-group">
                  <div className="checkbox-group">
                    <input type="checkbox" id="fecha-fin" defaultChecked />
                    <label htmlFor="fecha-fin">Fecha de fin:</label>
                  </div>
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="date-input"
                  />
                </div>
              </div>
            </div>

            {/* Botón Actualizar */}
            <div className="form-actions">
              <button className="btn-actualizar" onClick={handleActualizar}>
                ACTUALIZAR
              </button>
            </div>
          </div>

          {/* Configuraciones Históricas */}
          <div className="historico-section">
            <h2>Configuraciones Históricas</h2>
            <div className="configuraciones-table-container">
              <table className="configuraciones-table">
                <thead>
                  <tr>
                    <th>Período</th>
                    <th>Tipo</th>
                    <th>Modalidad</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Horario</th>
                    <th>Estado</th>
                    <th>Creado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {configuracionesHistoricas.map((config) => (
                    <tr key={config.id}>
                      <td className="periodo-cell">
                        {periodos.find(p => p.value === config.periodo)?.label}
                      </td>
                      <td className="tipo-cell">
                        {tiposConfiguracion.find(t => t.value === config.tipo)?.label}
                      </td>
                      <td className="modalidad-cell">
                        {modalidades.find(m => m.value === config.modalidad)?.label}
                      </td>
                      <td className="fecha-cell">{formatFecha(config.fechaInicio)}</td>
                      <td className="fecha-cell">{formatFecha(config.fechaFin)}</td>
                      <td className="horario-cell">
                        {config.horaInicio} - {config.horaFin}
                      </td>
                      <td className="estado-cell">
                        <span className={`estado-badge ${getEstadoBadgeClass(config.estado)}`}>
                          {config.estado}
                        </span>
                      </td>
                      <td className="fecha-cell">{formatFecha(config.fechaCreacion)}</td>
                      <td className="acciones-cell">
                        <div className="acciones-buttons">
                          <button 
                            className="btn-accion editar"
                            title="Editar configuración"
                          >
                            <span className="material-icons">edit</span>
                          </button>
                          <button 
                            className="btn-accion eliminar"
                            onClick={() => handleEliminarConfiguracion(config.id)}
                            title="Eliminar configuración"
                          >
                            <span className="material-icons">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="info-section">
            <div className="info-cards">
              <div className="info-card">
                <div className="info-header">
                  <span className="material-icons">schedule</span>
                  <h4>Período Actual</h4>
                </div>
                <div className="info-content">
                  <p><strong>2025-II</strong></p>
                  <p>Cambio de Materias ACTIVO</p>
                  <p>Modalidad: Presencial</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-header">
                  <span className="material-icons">event</span>
                  <h4>Próximas Fechas</h4>
                </div>
                <div className="info-content">
                  <p><strong>Oct 15, 2025</strong></p>
                  <p>Fin cambio de materias</p>
                  <p><strong>Oct 20, 2025</strong></p>
                  <p>Inicio período académico</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-header">
                  <span className="material-icons">info</span>
                  <h4>Información</h4>
                </div>
                <div className="info-content">
                  <p>Los cambios afectan a todos los estudiantes de <strong>Ingeniería de Sistemas</strong></p>
                  <p>Horario de atención: 7:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConfiguracionAcademica;