import React from "react";
import "./Student.css";

/**
 * Tarjeta individual de estudiante
 * @param {Object} props
 * @param {Object} props.student - Datos del estudiante
 * @param {boolean} props.isSelected - Si está seleccionado
 * @param {Function} props.onClick - Callback al hacer click
 */
const StudentCard = ({ student, isSelected = false, onClick }) => {
  return (
    <div
      className={`student-card ${isSelected ? "selected" : ""}`}
      onClick={() => onClick && onClick(student)}
    >
      <div className="student-main-info">
        <h3>{student.nombre}</h3>
        <p className="student-code">{student.codigo}</p>
      </div>
      <div className="student-details">
        <span className="semestre">Sem. {student.semestre}</span>
        <span className={`estado ${student.estado.toLowerCase()}`}>
          {student.estado}
        </span>
      </div>
      {student.riesgoAcademico && (
        <div className="student-indicators">
          <span className="risk-indicator">
            <span className="material-icons">warning</span>
            Riesgo
          </span>
        </div>
      )}
    </div>
  );
};

export default StudentCard;
