import React from "react";
import "../../styles/Semaforo.css";

/**
 * Componente para mostrar grid de semáforo académico
 * @param {Object} props
 * @param {Object} props.semestreData - Objeto con datos por semestre {1: [...], 2: [...], ...}
 * @param {boolean} props.showLegend - Mostrar leyenda de colores
 */
const SemaforoGrid = ({ semestreData = {}, showLegend = true }) => {
  const getBackgroundColor = (estado) => {
    switch (estado) {
      case "aprobada":
        return "#90EE90";
      case "en-curso":
        return "#ADD8E6";
      case "reprobada":
        return "#FFB6C6";
      case "pendiente":
        return "white";
      default:
        return "white";
    }
  };

  return (
    <div>
      {/* Leyenda */}
      {showLegend && (
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ 
              width: "80px", 
              height: "40px", 
              backgroundColor: "#90EE90", 
              borderRadius: "8px", 
              border: "1px solid #ddd" 
            }}></div>
            <span style={{ fontWeight: "600" }}>Cursos Aprobados</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ 
              width: "80px", 
              height: "40px", 
              backgroundColor: "#FFB6C6", 
              borderRadius: "8px", 
              border: "1px solid #ddd" 
            }}></div>
            <span style={{ fontWeight: "600" }}>Cursos Reprobados</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ 
              width: "80px", 
              height: "40px", 
              backgroundColor: "white", 
              borderRadius: "8px", 
              border: "1px solid #ddd" 
            }}></div>
            <span style={{ fontWeight: "600" }}>Cursos Pendientes Cursar</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ 
              width: "80px", 
              height: "40px", 
              backgroundColor: "#ADD8E6", 
              borderRadius: "8px", 
              border: "1px solid #ddd" 
            }}></div>
            <span style={{ fontWeight: "600" }}>Cursos Matriculados</span>
          </div>
        </div>
      )}

      {/* Tablas de semestres */}
      <div className="semester-tables">
        {/* Semestres 1-4 */}
        <div className="semester-table" style={{ marginBottom: "30px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#f5f5f5" }}>
            <thead>
              <tr style={{ backgroundColor: "#e0e0e0" }}>
                {[1, 2, 3, 4].map(sem => (
                  <th key={sem} style={{ padding: "15px", border: "1px solid #ccc", fontWeight: "bold" }}>
                    Semestre {sem}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[1, 2, 3, 4].map((sem) => (
                  <td key={sem} style={{ padding: "15px", border: "1px solid #ccc", verticalAlign: "top" }}>
                    {semestreData[sem]?.map((materia, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "10px",
                          marginBottom: "8px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          textAlign: "center",
                          fontWeight: "600",
                          backgroundColor: getBackgroundColor(materia.estado)
                        }}
                      >
                        {materia.codigo || materia.nombre}
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Semestres 5-8 */}
        <div className="semester-table">
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#f5f5f5" }}>
            <thead>
              <tr style={{ backgroundColor: "#e0e0e0" }}>
                {[5, 6, 7, 8].map(sem => (
                  <th key={sem} style={{ padding: "15px", border: "1px solid #ccc", fontWeight: "bold" }}>
                    Semestre {sem}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[5, 6, 7, 8].map((sem) => (
                  <td key={sem} style={{ padding: "15px", border: "1px solid #ccc", verticalAlign: "top" }}>
                    {semestreData[sem]?.map((materia, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "10px",
                          marginBottom: "8px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          textAlign: "center",
                          fontWeight: "600",
                          backgroundColor: getBackgroundColor(materia.estado)
                        }}
                      >
                        {materia.codigo || materia.nombre}
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SemaforoGrid;
