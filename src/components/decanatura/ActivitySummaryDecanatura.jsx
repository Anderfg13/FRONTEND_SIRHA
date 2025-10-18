import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../../styles/ActivitySummaryDecanatura.css";

const pieData = [
  { name: "Aprobadas", value: 20, color: "#1abc6b" },
  { name: "Pendientes", value: 15, color: "#ffc233" },
  { name: "Rechazadas", value: 5, color: "#f44336" },
  { name: "En proceso", value: 7, color: "#2196f3" },
];

const alertas = [
  { icon: "📝", text: "Exámenes finales del 1-4 de octubre" },
  { icon: "🎓", text: "Aniversario ECI - 20 de octubre" },
  { icon: "🔔", text: "3 grupos están al 90% de la capacidad" },
  { icon: "⚠️", text: "5 solicitudes expiran en 2 días - Click para ver detalles", expandable: true },
];

const solicitudesExpirandose = [
  { id: "S-001", estado: "Pendiente", estudiante: "Juan Pérez", materia: "Matemáticas", fechaExpiracion: "2025-10-20", diasRestantes: 2 },
  { id: "S-002", estado: "En proceso", estudiante: "Ana Gómez", materia: "Física", fechaExpiracion: "2025-10-21", diasRestantes: 3 },
];

// Mapa de eventos para octubre 2025 (ejemplo)
const eventosDias = {
  // Clases: amarillo
  '2025-10-01': 'clases', '2025-10-02': 'clases', '2025-10-03': 'clases', '2025-10-04': 'clases',
  '2025-10-13': 'clases', '2025-10-14': 'clases', '2025-10-15': 'clases', '2025-10-16': 'clases', '2025-10-17': 'clases', '2025-10-18': 'clases',
  '2025-10-21': 'clases', '2025-10-22': 'clases', '2025-10-23': 'clases', '2025-10-24': 'clases', '2025-10-25': 'clases',
  '2025-10-27': 'clases', '2025-10-28': 'clases', '2025-10-29': 'clases', '2025-10-30': 'clases', '2025-10-31': 'clases',
  // Receso: azul claro
  '2025-10-06': 'receso-clases', '2025-10-07': 'receso-clases', '2025-10-08': 'receso-clases', '2025-10-09': 'receso-clases', '2025-10-10': 'receso-clases', '2025-10-11': 'receso-clases',
  // Aniversario: naranja
  '2025-10-20': 'aniversario',
  // Domingo: gris
  '2025-10-05': 'domingo', '2025-10-12': 'domingo', '2025-10-19': 'domingo', '2025-10-26': 'domingo',
};

export default function ActivitySummaryDecanatura() {
  const [showAlertDetails, setShowAlertDetails] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date(2025, 9, 1)); // Octubre 2025

  const handleAlertClick = () => setShowAlertDetails((v) => !v);

  return (
    <div className="activity-summary">
      <h3>Resumen de Actividad</h3>
      <div className="dashboard-grid">
        {/* Panel izquierdo */}
        <div className="left-panel">
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
          <div className="chart-section">
            <h4>Estado de solicitudes</h4>
            <div className="pie-chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={55}
                    label={false}
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ marginLeft: 12 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {pieData.map((entry, idx) => (
                    <li key={entry.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 3, background: entry.color, marginRight: 8 }}></span>
                      <span style={{ fontSize: '1rem', color: '#222' }}>{entry.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Panel derecho */}
        <div className="right-panel">
          {/* Calendario académico con react-calendar */}
          <div className="calendar-section">
            <div className="calendar-header">
              <h4>Calendario académico</h4>
            </div>
            <Calendar
              value={calendarValue}
              onChange={setCalendarValue}
              calendarType="iso8601"
              locale="es-ES"
              tileClassName={({ date, view }) => {
                if (view === 'month') {
                  const key = date.toISOString().slice(0, 10);
                  return eventosDias[key] ? `calendar-event-${eventosDias[key]}` : '';
                }
                return '';
              }}
              minDetail="month"
              maxDetail="month"
              showNeighboringMonth={true}
            />
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
              <span className={`expand-icon ${showAlertDetails ? 'expanded' : ''}`}>▼</span>
            </h4>
            {alertas.map((alert, idx) => (
              <div
                key={idx}
                className={`alert-item${alert.expandable ? ' clickable' : ''}`}
                onClick={alert.expandable ? handleAlertClick : undefined}
              >
                <span className="alert-icon">{alert.icon}</span>
                <span className="alert-text">{alert.text}</span>
              </div>
            ))}
            {showAlertDetails && (
              <div className="alert-details-panel">
                <h5>Solicitudes que van a expirar</h5>
                <div className="solicitudes-expirando">
                  {solicitudesExpirandose.map((solicitud) => (
                    <div key={solicitud.id} className="solicitud-item">
                      <div className="solicitud-header">
                        <span className="solicitud-id">{solicitud.id}</span>
                        <span className={`solicitud-estado ${solicitud.estado.toLowerCase()}`}>{solicitud.estado}</span>
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
                        <button className="btn-revisar">Revisar</button>
                        <button className="btn-aprobar">Aprobar</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="panel-actions">
                  <button className="btn-ver-todas">Ver todas las solicitudes</button>
                  <button className="btn-cerrar" onClick={() => setShowAlertDetails(false)}>Cerrar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
