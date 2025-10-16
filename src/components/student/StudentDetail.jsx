import React from "react";
import "../../styles/Student.css";

/**
 * Panel de detalles del estudiante seleccionado
 * @param {Object} props
 * @param {Object} props.student - Estudiante seleccionado
 * @param {Function} props.onViewSemaforo - Callback ver semáforo
 * @param {Function} props.onViewHorario - Callback ver horario
 * @param {Function} props.onEdit - Callback editar (solo admin)
 */
const StudentDetail = ({
  student,
  onViewSemaforo,
  onViewHorario,
  onEdit,
}) => {
  if (!student) {
    return (
      <div className="right-panel">
        <div className="no-selection">
          <span className="material-icons">people</span>
          <h3>Selecciona un estudiante</h3>
          <p>Elige un estudiante de la lista para ver su información detallada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="right-panel">
      <div className="student-details-view">
        <div className="details-header">
          <h2>Información Detallada</h2>
          <div className="student-photo">
            <span className="material-icons">account_circle</span>
          </div>
        </div>

        <div className="details-content">
          {/* Información básica */}
          <div className="info-section">
            <h3>Datos Personales</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Código Estudiantil:</label>
                <span>{student.codigo}</span>
              </div>
              <div className="info-item">
                <label>Nombre Completo:</label>
                <span>{student.nombre}</span>
              </div>
              <div className="info-item">
                <label>Programa:</label>
                <span>{student.carrera || "Ingeniería de Sistemas"}</span>
              </div>
              <div className="info-item">
                <label>Semestre Actual:</label>
                <span>{student.semestre}</span>
              </div>
              <div className="info-item">
                <label>Estado:</label>
                <span className={`status ${student.estado.toLowerCase()}`}>
                  {student.estado}
                </span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{student.email}</span>
              </div>
            </div>
          </div>

          {/* Información académica */}
          <div className="info-section">
            <h3>Información Académica</h3>
            <div className="academic-stats">
              <div className="stat-card">
                <span className="stat-value">{student.promedio}</span>
                <span className="stat-label">Promedio</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{student.creditos}</span>
                <span className="stat-label">Créditos</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{student.materiasActuales}</span>
                <span className="stat-label">Materias Actuales</span>
              </div>
            </div>
          </div>

          {/* Alertas */}
          {student.riesgoAcademico && (
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

          {/* Acciones rápidas */}
          <div className="info-section">
            <h3>Acciones Rápidas</h3>
            <div className="action-buttons">
              <button className="btn-action primary" onClick={onViewSemaforo}>
                <span className="material-icons">visibility</span>
                Ver Semáforo
              </button>
              <button className="btn-action secondary" onClick={onViewHorario}>
                <span className="material-icons">schedule</span>
                Ver Horario
              </button>
              {onEdit && (
                <button className="btn-action warning" onClick={onEdit}>
                  <span className="material-icons">edit</span>
                  Editar Información
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
