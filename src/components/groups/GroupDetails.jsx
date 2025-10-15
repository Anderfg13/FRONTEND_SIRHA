import React from 'react';
import './Groups.css';

/**
 * Panel de detalles del grupo seleccionado
 * 
 * @param {Object} props
 * @param {Object} props.grupo - Grupo seleccionado {grupo, docente, horario, cupoMaximo, capacidadActual, listaEspera}
 * @param {Function} props.onClose - Callback para cerrar el panel (opcional)
 * @param {boolean} props.isStudent - Indica si es vista de estudiante (cambia las acciones disponibles)
 * @param {Function} props.onInscribirse - Callback para inscribirse (vista estudiante)
 * @param {Function} props.onVerHorario - Callback para ver horario (vista estudiante)
 * @param {Function} props.onVerEstudiantes - Callback para ver estudiantes (vista admin)
 * @param {Function} props.onAumentarCupo - Callback para aumentar cupo (vista admin)
 * @param {Function} props.onReducirCupo - Callback para reducir cupo (vista admin)
 * @param {Function} props.onGestionarLista - Callback para gestionar lista de espera (vista admin)
 */
const GroupDetails = ({ 
  grupo,
  onClose,
  isStudent = false,
  onInscribirse,
  onVerHorario,
  onVerEstudiantes,
  onAumentarCupo,
  onReducirCupo,
  onGestionarLista
}) => {
  if (!grupo) return null;

  const getCapacidadPorcentaje = (actual, maximo) => {
    return Math.round((actual / maximo) * 100);
  };

  const cuposDisponibles = grupo.cupoMaximo - grupo.capacidadActual;
  const porcentaje = getCapacidadPorcentaje(grupo.capacidadActual, grupo.cupoMaximo);

  return (
    <div className="grupo-details">
      <div className="details-header">
        <h3>Detalles del Grupo {grupo.grupo}</h3>
        {onClose && (
          <button className="btn-close-details" onClick={onClose}>
            <span className="material-icons">close</span>
          </button>
        )}
      </div>
      
      <div className="details-grid">
        <div className="detail-card">
          <h4>Información General</h4>
          <div className="detail-item">
            <label>Docente:</label>
            <span>{grupo.docente}</span>
          </div>
          <div className="detail-item">
            <label>Horario:</label>
            <span>{grupo.horario}</span>
          </div>
          <div className="detail-item">
            <label>Cupo Máximo:</label>
            <span>{grupo.cupoMaximo} estudiantes</span>
          </div>
        </div>

        <div className="detail-card">
          <h4>Estado de Capacidad</h4>
          <div className="capacidad-detalle">
            <div className="capacidad-visual">
              <div className="capacidad-circle">
                <span className="capacidad-text">{porcentaje}%</span>
              </div>
            </div>
            <div className="capacidad-info">
              <p><strong>Estudiantes inscritos:</strong> {grupo.capacidadActual}</p>
              <p><strong>Cupos disponibles:</strong> {cuposDisponibles}</p>
              <p><strong>Lista de espera:</strong> {grupo.listaEspera}</p>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h4>{isStudent ? 'Acciones Disponibles' : 'Acciones Administrativas'}</h4>
          <div className="admin-actions">
            {isStudent ? (
              <>
                <button 
                  className="btn-action primary"
                  onClick={onInscribirse}
                  disabled={cuposDisponibles === 0}
                >
                  <span className="material-icons">add_circle</span>
                  Inscribirse
                </button>
                <button 
                  className="btn-action info"
                  onClick={onVerHorario}
                >
                  <span className="material-icons">schedule</span>
                  Ver Horario
                </button>
              </>
            ) : (
              <>
                <button 
                  className="btn-action primary"
                  onClick={onVerEstudiantes}
                >
                  <span className="material-icons">people</span>
                  Ver Estudiantes
                </button>
                <button 
                  className="btn-action secondary"
                  onClick={onAumentarCupo}
                >
                  <span className="material-icons">add</span>
                  Aumentar Cupo
                </button>
                <button 
                  className="btn-action warning"
                  onClick={onReducirCupo}
                >
                  <span className="material-icons">remove</span>
                  Reducir Cupo
                </button>
                <button 
                  className="btn-action info"
                  onClick={onGestionarLista}
                >
                  <span className="material-icons">list</span>
                  Gestionar Lista
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
