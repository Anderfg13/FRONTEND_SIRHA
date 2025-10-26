import React, { useState } from "react";

/**
 * Componente reutilizable para selector de estudiantes
 * @param {Object} props
 * @param {Array} props.estudiantes - Lista de estudiantes (strings o objetos con {id, nombre})
 * @param {string} props.selectedStudent - Estudiante seleccionado
 * @param {Function} props.onSelectStudent - Callback cuando se selecciona un estudiante
 * @param {string} props.placeholder - Texto del placeholder
 * @param {string} props.label - Etiqueta opcional
 * @param {Object} props.style - Estilos adicionales
 */
const StudentSelector = ({
  estudiantes = [],
  selectedStudent = "",
  onSelectStudent,
  placeholder = "Nombre del estudiante",
  label = "",
  style = {}
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectStudent = (student) => {
    const studentValue = typeof student === 'string' ? student : student.nombre;
    onSelectStudent && onSelectStudent(studentValue);
    setShowDropdown(false);
  };

  const getDisplayValue = () => {
    if (!selectedStudent) return placeholder;
    if (typeof estudiantes[0] === 'string') return selectedStudent;
    const found = estudiantes.find(e => e.nombre === selectedStudent || e.id === selectedStudent);
    return found ? found.nombre : selectedStudent;
  };

  return (
    <div style={{ position: "relative", marginBottom: "30px", ...style }}>
      {label && (
        <label style={{ 
          display: "block", 
          fontWeight: "bold", 
          marginBottom: "10px", 
          fontSize: "14px",
          textTransform: "uppercase"
        }}>
          {label}
        </label>
      )}
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          backgroundColor: "white",
          border: "2px solid #ddd",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          minWidth: "300px"
        }}
      >
        <span style={{ color: selectedStudent ? "#333" : "#999" }}>
          {getDisplayValue()}
        </span>
        <span className="material-icons" style={{ color: "#666" }}>
          {showDropdown ? "expand_less" : "expand_more"}
        </span>
      </div>
      
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "2px solid #ddd",
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 100,
            maxHeight: "300px",
            overflowY: "auto"
          }}
        >
          {estudiantes.map((estudiante, index) => {
            const displayName = typeof estudiante === 'string' ? estudiante : estudiante.nombre;
            return (
              <div
                key={index}
                onClick={() => handleSelectStudent(estudiante)}
                style={{
                  padding: "12px 20px",
                  cursor: "pointer",
                  borderBottom: index < estudiantes.length - 1 ? "1px solid #eee" : "none",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
              >
                {displayName}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentSelector;
