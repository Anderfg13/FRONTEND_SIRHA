import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";


export default function Dashboard() {
  const navigate = useNavigate();
  const [showAlertDetails, setShowAlertDetails] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Función para manejar el logout con confirmación
  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que quieres salir de la aplicación?");
    
    if (confirmLogout) {
      // Aquí puedes agregar lógica adicional como limpiar localStorage, etc.
      navigate("/"); // Redirige a la página de login
    }
    
  };

  // Función para manejar el click en alertas
  const handleAlertClick = () => {
    setShowAlertDetails(!showAlertDetails);
  };

  // Datos detallados de las solicitudes que van a expirar
  const solicitudesExpirandose = [
    {
      id: "SOL-001",
      estudiante: "Carlos Andrés Rodríguez",
      materia: "Cálculo Diferencial",
      fechaExpiracion: "2025-10-31",
      diasRestantes: 2,
      estado: "PENDIENTE"
    },
    {
      id: "SOL-015",
      estudiante: "María José Hernández", 
      materia: "Física I",
      fechaExpiracion: "2025-10-31",
      diasRestantes: 2,
      estado: "EN_REVISION"
    },
    {
      id: "SOL-023",
      estudiante: "Luis Fernando García",
      materia: "Programación II",
      fechaExpiracion: "2025-11-01",
      diasRestantes: 3,
      estado: "PENDIENTE"
    },
    {
      id: "SOL-031",
      estudiante: "Ana Sofía Martínez",
      materia: "Base de Datos I",
      fechaExpiracion: "2025-11-01",
      diasRestantes: 3,
      estado: "PENDIENTE"
    },
    {
      id: "SOL-045",
      estudiante: "Diego Alejandro López",
      materia: "Algoritmos",
      fechaExpiracion: "2025-11-01",
      diasRestantes: 3,
      estado: "EN_REVISION"
    }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>SIRHA</h1>
          <p>Sistema Académico</p>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li
              className="nav-item active"
              onClick={() => handleNavigation("/dashboard")}
            >
              <span className="material-icons">home</span>
              INICIO
            </li>
            <li
              className="nav-item clickable"
              onClick={() => handleNavigation("/solicitudes")}
            >
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

        {/* Cambio aquí: usar handleLogout que incluye la confirmación */}
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
          <h2>Panel de Decanatura</h2>

          {/* Tarjeta ancha de decanatura */}
          <div className="student-wide-card">
            <div className="student-header">
              <div className="student-avatar-compact">
                <span className="material-icons">person</span>
              </div>
              <h3 className="student-name-wide">CLAUDIA PATRICIA SANTIAGO CELY</h3>
            </div>

            <div className="student-details-horizontal">
              <div className="detail-column">
                <div className="detail-item-wide">
                  <span className="detail-label-wide">Nombre completo:</span>
                  <span className="detail-value-wide">
                    Claudia Patricia Santiago Cely
                  </span>
                </div>

                <div className="detail-item-wide">
                  <span className="detail-label-wide">Cargo:</span>
                  <span className="detail-value-wide">Decana</span>
                </div>
              </div>

              <div className="detail-column">
                <div className="detail-item-wide">
                  <span className="detail-label-wide">Facultad:</span>
                  <span className="detail-value-wide">
                    Ingeniería de Sistemas
                  </span>
                </div>

                <div className="detail-item-wide">
                  <span className="detail-label-wide">ID Institucional:</span>
                  <span className="detail-value-wide student-id-wide">
                    1000098321
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de Actividad */}
          <div className="activity-summary">
            <h3>Resumen de Actividad</h3>
            
            <div className="dashboard-grid">
              {/* Panel izquierdo - Métricas y gráfico */}
              <div className="left-panel">
                {/* Métricas de solicitudes */}
                <div className="metrics-section">
                  <div className="metric-card pending">
                    <span className="metric-label">Solicitudes pendientes</span>
                    <span className="metric-value">15</span>
                  </div>
                  
                  <div className="metric-card processing">
                    <span className="metric-label">Solicitudes en proceso</span>
                    <span className="metric-value">7</span>
                  </div>
                  
                  <div className="metric-card approved">
                    <span className="metric-label">Solicitudes aprobadas</span>
                    <span className="metric-value">20</span>
                  </div>
                  
                  <div className="metric-card rejected">
                    <span className="metric-label">Solicitudes rechazadas</span>
                    <span className="metric-value">5</span>
                  </div>
                </div>

                {/* Gráfico circular */}
                <div className="chart-section">
                  <h4>Estado de solicitudes</h4>
                  <div className="pie-chart-container">
                    <div className="pie-chart">
                      <div className="slice approved-slice"></div>
                      <div className="slice pending-slice"></div>
                      <div className="slice rejected-slice"></div>
                      <div className="slice processing-slice"></div>
                    </div>
                    <div className="chart-labels">
                      <div className="label-item">
                        <span className="label-color approved"></span>
                        <span>Aprobadas</span>
                      </div>
                      <div className="label-item">
                        <span className="label-color pending"></span>
                        <span>Pendientes</span>
                      </div>
                      <div className="label-item">
                        <span className="label-color rejected"></span>
                        <span>Rechazadas</span>
                      </div>
                      <div className="label-item">
                        <span className="label-color processing"></span>
                        <span>En proceso</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel derecho - Calendario y alertas */}
              <div className="right-panel">
                {/* Calendario */}
                <div className="calendar-section">
                  <div className="calendar-header">
                    <h4>Calendario académico</h4>
                    <div className="calendar-nav">
                      <button className="nav-btn">‹</button>
                      <span className="calendar-month">Octubre 2025</span>
                      <button className="nav-btn">›</button>
                    </div>
                  </div>
                  
                  <div className="calendar-grid">
                    <div className="calendar-days">
                      <span>DOM</span><span>LUN</span><span>MAR</span><span>MIE</span><span>JUE</span><span>VIE</span><span>SAB</span>
                    </div>
                    <div className="calendar-dates">
                      {/* Última semana de septiembre */}
                      <span className="prev-month">28</span>
                      <span className="prev-month">29</span>
                      <span className="prev-month">30</span>
                      
                      {/* Primera semana de octubre */}
                      <span className="event-day clases">1</span>
                      <span className="event-day clases">2</span>
                      <span className="event-day clases">3</span>
                      <span className="event-day clases">4</span>
                      
                      {/* Segunda semana */}
                      <span className="event-day domingo">5</span>
                      <span className="event-day receso-clases">6</span>
                      <span className="event-day receso-clases">7</span>
                      <span className="event-day receso-clases">8</span>
                      <span className="event-day receso-clases">9</span>
                      <span className="event-day receso-clases">10</span>
                      <span className="event-day receso-clases">11</span>
                      
                      {/* Tercera semana */}
                      <span className="event-day domingo">12</span>
                      <span className="event-day clases">13</span>
                      <span className="event-day clases">14</span>
                      <span className="event-day clases">15</span>
                      <span className="event-day clases">16</span>
                      <span className="event-day clases">17</span>
                      <span className="event-day clases">18</span>
                      
                      {/* Cuarta semana */}
                      <span className="event-day domingo">19</span>
                      <span className="event-day aniversario">20</span>
                      <span className="event-day clases">21</span>
                      <span className="event-day clases">22</span>
                      <span className="event-day clases">23</span>
                      <span className="event-day clases">24</span>
                      <span className="event-day clases">25</span>
                      
                      {/* Quinta semana */}
                      <span className="event-day domingo">26</span>
                      <span className="event-day clases">27</span>
                      <span className="event-day clases">28</span>
                      <span className="current-day clases">29</span>
                      <span className="event-day clases">30</span>
                      <span className="event-day clases">31</span>
                      
                      {/* Primera semana de noviembre */}
                      <span className="next-month">1</span>
                    </div>
                  </div>
                  
                  {/* Leyenda del calendario */}
                  <div className="calendar-legend">
                    <div className="legend-item">
                      <span className="legend-color aniversario"></span>
                      <span>Aniversario</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color recepcion"></span>
                      <span>Recepción</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color clases"></span>
                      <span>Clases</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color examenes-finales"></span>
                      <span>Exámenes finales</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color limite-entrega"></span>
                      <span>Límite entrega notas</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color periodo-intermedio"></span>
                      <span>Período intermedio</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color vacaciones"></span>
                      <span>Vacaciones</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color receso-clases"></span>
                      <span>Receso de clases</span>
                    </div>
                  </div>
                </div>

                {/* Alertas y notificaciones */}
                <div className="alerts-section">
                  <h4 className="alerts-header clickable" onClick={handleAlertClick}>
                    Alertas y notificaciones 
                    <span className={`expand-icon ${showAlertDetails ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  </h4>
                  
                  <div className="alert-item">
                    <span className="alert-icon">�</span>
                    <span className="alert-text">Exámenes finales del 1-4 de octubre</span>
                  </div>
                  
                  <div className="alert-item">
                    <span className="alert-icon">🎓</span>
                    <span className="alert-text">Aniversario ECI - 20 de octubre</span>
                  </div>
                  
                  <div className="alert-item">
                    <span className="alert-icon">🔔</span>
                    <span className="alert-text">3 grupos están al 90% de la capacidad</span>
                  </div>
                  
                  <div className="alert-item clickable" onClick={handleAlertClick}>
                    <span className="alert-icon">⚠️</span>
                    <span className="alert-text">5 solicitudes expiran en 2 días - Click para ver detalles</span>
                  </div>

                  {/* Panel de detalles expandible */}
                  {showAlertDetails && (
                    <div className="alert-details-panel">
                      <h5>Solicitudes que van a expirar</h5>
                      <div className="solicitudes-expirando">
                        {solicitudesExpirandose.map((solicitud) => (
                          <div key={solicitud.id} className="solicitud-item">
                            <div className="solicitud-header">
                              <span className="solicitud-id">{solicitud.id}</span>
                              <span className={`solicitud-estado ${solicitud.estado.toLowerCase()}`}>
                                {solicitud.estado.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="solicitud-details">
                              <p><strong>Estudiante:</strong> {solicitud.estudiante}</p>
                              <p><strong>Materia:</strong> {solicitud.materia}</p>
                              <p><strong>Fecha límite:</strong> {new Date(solicitud.fechaExpiracion).toLocaleDateString('es-ES')}</p>
                              <p className={`dias-restantes ${solicitud.diasRestantes <= 2 ? 'urgente' : 'normal'}`}>
                                <strong>Días restantes:</strong> {solicitud.diasRestantes}
                              </p>
                            </div>
                            <div className="solicitud-actions">
                              <button 
                                className="btn-revisar"
                                onClick={() => navigate('/solicitudes')}
                              >
                                Revisar
                              </button>
                              <button 
                                className="btn-aprobar"
                                onClick={() => alert(`Aprobar solicitud ${solicitud.id}`)}
                              >
                                Aprobar
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="panel-actions">
                        <button 
                          className="btn-ver-todas"
                          onClick={() => navigate('/solicitudes')}
                        >
                          Ver todas las solicitudes
                        </button>
                        <button 
                          className="btn-cerrar"
                          onClick={() => setShowAlertDetails(false)}
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}