import React from "react";
import StudentCard from "./StudentCard";
import "../../styles/Student.css";

/**
 * Lista de estudiantes
 * @param {Object} props
 * @param {Array} props.students - Array de estudiantes
 * @param {Object} props.selectedStudent - Estudiante seleccionado
 * @param {Function} props.onStudentSelect - Callback al seleccionar estudiante
 */
const StudentList = ({ students = [], selectedStudent, onStudentSelect }) => {
  return (
    <div className="left-panel">
      <div className="panel-header">
        <h2>Lista de Estudiantes ({students.length})</h2>
      </div>
      <div className="students-list">
        {students.length === 0 ? (
          <div className="no-students">
            <span className="material-icons">info</span>
            <p>No se encontraron estudiantes</p>
          </div>
        ) : (
          students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              isSelected={selectedStudent?.id === student.id}
              onClick={onStudentSelect}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StudentList;
