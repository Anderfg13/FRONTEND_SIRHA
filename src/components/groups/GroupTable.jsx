import React from 'react';
import CapacityBar from './CapacityBar';
import './Groups.css';

/**
 * Tabla de grupos disponibles con información de capacidad y acciones
 * 
 * @param {Object} props
 * @param {Array} props.grupos - Array de grupos con {grupo, docente, capacidadActual, cupoMaximo, listaEspera, horario}
 * @param {Object} props.selectedGrupo - Grupo actualmente seleccionado
 * @param {Function} props.onGrupoSelect - Callback cuando se selecciona un grupo
 * @param {Function} props.onAction - Callback para las acciones del grupo (admin: modificar, estudiante: inscribirse)
 * @param {string} props.actionLabel - Etiqueta del botón de acción ("Modificar" para admin, "Inscribirse" para estudiante)
 * @param {string} props.actionIcon - Icono del botón (default: "edit" para admin, "add_circle" para estudiante)
 * @param {boolean} props.isStudent - Indica si es vista de estudiante (default: false)
 */
const GroupTable = ({ 
  grupos = [], 
  selectedGrupo, 
  onGrupoSelect, 
  onAction, 
  actionLabel = "Modificar",
  actionIcon = "edit",
  isStudent = false
}) => {
  
  return (
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
            {grupos.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                  No hay grupos disponibles
                </td>
              </tr>
            ) : (
              grupos.map((grupo, index) => {
                const cuposDisponibles = grupo.cupoMaximo - grupo.capacidadActual;
                const puedeInscribirse = isStudent && cuposDisponibles > 0;
                
                return (
                  <tr 
                    key={index} 
                    className={selectedGrupo === grupo ? 'selected' : ''}
                    onClick={() => onGrupoSelect && onGrupoSelect(grupo)}
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
                      <CapacityBar 
                        capacidadActual={grupo.capacidadActual}
                        cupoMaximo={grupo.cupoMaximo}
                      />
                    </td>
                    <td className="acciones-cell">
                      <button 
                        className={`btn-action-table ${isStudent ? (puedeInscribirse ? 'student-enabled' : 'student-disabled') : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onAction) {
                            onAction(grupo);
                          }
                        }}
                        disabled={isStudent && !puedeInscribirse}
                        title={isStudent && !puedeInscribirse ? 'No hay cupos disponibles' : actionLabel}
                      >
                        <span className="material-icons">{actionIcon}</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupTable;
