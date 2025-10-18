import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import MetricCard from '../../components/ui/MetricCard';
import StatusBadge from '../../components/ui/StatusBadge';
import ProfileModal from '../../components/ui/ProfileModal';
import '../../styles/DashboardEstudiantePage.css';
import '../../styles/ProfileModal.css';

/**
 * Dashboard principal para estudiantes
 * Muestra resumen académico, métricas, calendario y alertas
 */
const DashboardEstudiantePage = () => {
  // Mock data del estudiante
  const estudiante = {
    nombre: "Anderson Fabián García Nieto",
    codigo: "2020102050",
    programa: "Ingeniería de Sistemas",
    semestre: 7,
    promedio: 4.2,
    creditosAprobados: 112,
    creditosTotales: 160,
    materiasActuales: 5
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [profileOpen, setProfileOpen] = useState(false);

  // Datos de métricas
  const metricas = [
    {
      title: "Promedio General",
      value: estudiante.promedio.toFixed(1),
      icon: "star",
      color: "green",
      trend: "+0.2"
    },
    {
      title: "Créditos Aprobados",
      value: `${estudiante.creditosAprobados}/${estudiante.creditosTotales}`,
      icon: "school",
      color: "blue",
      trend: `${Math.round((estudiante.creditosAprobados / estudiante.creditosTotales) * 100)}%`
    },
    {
      title: "Materias Actuales",
      value: estudiante.materiasActuales,
      icon: "menu_book",
      color: "yellow"
    },
    {
      title: "Semestre",
      value: estudiante.semestre,
      icon: "calendar_today",
      color: "red"
    }
  ];

  // Materias actuales
  const materiasActuales = [
    { nombre: "Arquitecturas de Software", profesor: "Dr. Miguel Flores", creditos: 4, dia: "L-M-V", hora: "2:00-3:30", progreso: 65 },
    { nombre: "Desarrollo y Operaciones Software", profesor: "Mg. Isabella Cruz", creditos: 3, dia: "M-J-V", hora: "10:00-11:30", progreso: 72 },
    { nombre: "Teoría de la Programación", profesor: "Dr. Gabriel Sánchez", creditos: 3, dia: "L-M-V", hora: "8:30-10:00", progreso: 58 },
    { nombre: "Inteligencia Artificial", profesor: "Dr. Carlos Mendoza", creditos: 4, dia: "M-J-V", hora: "2:00-3:30", progreso: 80 },
    { nombre: "Proyecto Integrador VI", profesor: "Mg. Ana Ruiz", creditos: 2, dia: "L-V", hora: "4:00-6:00", progreso: 45 }
  ];

  // Alertas y notificaciones
  const alertas = [
    { tipo: "danger", icon: "warning", mensaje: "Fecha límite: Entrega Proyecto IA - 20 Oct", fecha: "Hoy" },
    { tipo: "warning", icon: "assignment", mensaje: "Taller DevOps pendiente de revisión", fecha: "Ayer" },
    { tipo: "success", icon: "check_circle", mensaje: "Calificación publicada: Arquitecturas - 4.5", fecha: "Hace 2 días" },
    { tipo: "info", icon: "info", mensaje: "Inscripción de materias para próximo semestre abre el 25 Oct", fecha: "Hace 3 días" }
  ];

  // Eventos próximos
  const eventosProximos = [
    { fecha: "15 Oct", titulo: "Parcial Teoría de la Programación", hora: "8:30 AM", tipo: "exam" },
    { fecha: "18 Oct", titulo: "Entrega Proyecto DevOps", hora: "11:59 PM", tipo: "assignment" },
    { fecha: "22 Oct", titulo: "Presentación Proyecto IA", hora: "2:00 PM", tipo: "presentation" },
    { fecha: "25 Oct", titulo: "Inicio inscripción materias", hora: "8:00 AM", tipo: "event" }
  ];

  const menuItems = [
    { path: '/dashboard', icon: 'home', label: 'INICIO' },
    { path: '/semaforo', icon: 'traffic', label: 'SEMÁFORO' },
    { path: '/horario', icon: 'schedule', label: 'HORARIO' },
    { path: '/grupos', icon: 'class', label: 'INSCRIPCIÓN' },
    { path: '/solicitudes', icon: 'description', label: 'SOLICITUDES' },
  ];

  return (
    <>
      <MainLayout
        menuItems={menuItems}
        userName={estudiante.nombre}
        onProfileClick={() => setProfileOpen(true)}
      >
        <div className="dashboard-page">
          {/* Header con bienvenida */}
          <div className="dashboard-header">
            <div>
              <h1>¡Bienvenido de nuevo, {estudiante.nombre.split(' ')[0]}!</h1>
              <p>{estudiante.programa} - Semestre {estudiante.semestre}</p>
            </div>
            <div className="quick-actions">
              <button className="btn-quick-action">
                <span className="material-icons">schedule</span>
                Ver Horario
              </button>
              <button className="btn-quick-action">
                <span className="material-icons">class</span>
                Inscribir Materias
              </button>
            </div>
          </div>

          {/* Grid de métricas */}
          <div className="metrics-grid">
            {metricas.map((metrica, index) => (
              <MetricCard key={index} {...metrica} />
            ))}
          </div>

          {/* Contenido principal en dos columnas */}
          <div className="dashboard-content">
            {/* Columna izquierda - Materias y alertas */}
            <div className="main-column">
              {/* Materias actuales */}
              <div className="section-card">
                <div className="section-header">
                  <h2>
                    <span className="material-icons">menu_book</span>
                    Materias Actuales
                  </h2>
                  <StatusBadge status={`${estudiante.materiasActuales} materias`} variant="info" />
                </div>
                <div className="materias-list">
                  {materiasActuales.map((materia, index) => (
                    <div key={index} className="materia-item">
                      <div className="materia-info">
                        <h3>{materia.nombre}</h3>
                        <p className="materia-profesor">{materia.profesor}</p>
                        <div className="materia-detalles">
                          <span className="materia-creditos">
                            <span className="material-icons">star</span>
                            {materia.creditos} créditos
                          </span>
                          <span className="materia-horario">
                            <span className="material-icons">schedule</span>
                            {materia.dia} {materia.hora}
                          </span>
                        </div>
                      </div>
                      <div className="materia-progreso">
                        <div className="progreso-bar">
                          <div 
                            className="progreso-fill" 
                            style={{ width: `${materia.progreso}%` }}
                          ></div>
                        </div>
                        <span className="progreso-text">{materia.progreso}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alertas y notificaciones */}
              <div className="section-card">
                <div className="section-header">
                  <h2>
                    <span className="material-icons">notifications</span>
                    Alertas y Notificaciones
                  </h2>
                </div>
                <div className="alertas-list">
                  {alertas.map((alerta, index) => (
                    <div key={index} className={`alerta-item ${alerta.tipo}`}>
                      <span className="material-icons alerta-icon">{alerta.icon}</span>
                      <div className="alerta-content">
                        <p className="alerta-mensaje">{alerta.mensaje}</p>
                        <span className="alerta-fecha">{alerta.fecha}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna derecha - Calendario y eventos */}
            <div className="side-column">
              {/* Calendario mini */}
              <div className="section-card">
                <div className="section-header">
                  <h2>
                    <span className="material-icons">event</span>
                    Calendario
                  </h2>
                </div>
                <div className="mini-calendar">
                  <div className="calendar-month">
                    <button className="calendar-nav">
                      <span className="material-icons">chevron_left</span>
                    </button>
                    <span>Octubre 2025</span>
                    <button className="calendar-nav">
                      <span className="material-icons">chevron_right</span>
                    </button>
                  </div>
                  <div className="calendar-grid">
                    <div className="calendar-day header">D</div>
                    <div className="calendar-day header">L</div>
                    <div className="calendar-day header">M</div>
                    <div className="calendar-day header">M</div>
                    <div className="calendar-day header">J</div>
                    <div className="calendar-day header">V</div>
                    <div className="calendar-day header">S</div>
                    {[...Array(31)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`calendar-day ${i + 1 === 15 ? 'today' : ''} ${[14, 17, 21].includes(i + 1) ? 'has-event' : ''}`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Eventos próximos */}
              <div className="section-card">
                <div className="section-header">
                  <h2>
                    <span className="material-icons">event_note</span>
                    Próximos Eventos
                  </h2>
                </div>
                <div className="eventos-list">
                  {eventosProximos.map((evento, index) => (
                    <div key={index} className="evento-item">
                      <div className="evento-fecha">
                        <span className="evento-dia">{evento.fecha.split(' ')[0]}</span>
                        <span className="evento-mes">{evento.fecha.split(' ')[1]}</span>
                      </div>
                      <div className="evento-info">
                        <h4>{evento.titulo}</h4>
                        <span className="evento-hora">
                          <span className="material-icons">schedule</span>
                          {evento.hora}
                        </span>
                      </div>
                      <span className={`evento-tipo ${evento.tipo}`}>
                        <span className="material-icons">
                          {evento.tipo === 'exam' ? 'quiz' : 
                           evento.tipo === 'assignment' ? 'assignment' : 
                           evento.tipo === 'presentation' ? 'present_to_all' : 'event'}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} user={estudiante} />
    </>
  );
};

export default DashboardEstudiantePage;
