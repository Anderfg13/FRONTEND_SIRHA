import React from "react";
import "../../styles/Student.css";

/**
 * Componente de filtros para lista de estudiantes
 * @param {Object} props
 * @param {string} props.searchTerm - Término de búsqueda
 * @param {Function} props.onSearchChange - Callback cuando cambia búsqueda
 * @param {string} props.filterSemestre - Semestre filtrado
 * @param {Function} props.onSemestreChange - Callback cambio semestre
 * @param {string} props.filterEstado - Estado filtrado
 * @param {Function} props.onEstadoChange - Callback cambio estado
 * @param {Array} props.semestres - Lista de semestres disponibles
 * @param {Array} props.estados - Lista de estados disponibles
 */
const Filters = ({
  searchTerm = "",
  onSearchChange,
  filterSemestre = "",
  onSemestreChange,
  filterEstado = "",
  onEstadoChange,
  semestres = [1, 2, 3, 4, 5, 6, 7, 8],
  estados = ["ACTIVO", "SUSPENDIDO", "GRADUADO"],
}) => {
  return (
    <div className="filters-section">
      <div className="search-box">
        <span className="material-icons">search</span>
        <input
          type="text"
          placeholder="Buscar por nombre o código..."
          value={searchTerm}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
      </div>
      <div className="filters">
        <select value={filterSemestre} onChange={(e) => onSemestreChange && onSemestreChange(e.target.value)}>
          <option value="">Todos los semestres</option>
          {semestres.map((sem) => (
            <option key={sem} value={sem}>
              Semestre {sem}
            </option>
          ))}
        </select>
        <select value={filterEstado} onChange={(e) => onEstadoChange && onEstadoChange(e.target.value)}>
          <option value="">Todos los estados</option>
          {estados.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
