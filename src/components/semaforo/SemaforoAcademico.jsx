import React from "react";
import "../../styles/Semaforo.css";

/**
 * Componente de semáforo académico parametrizado
 * @param {Object} props
 * @param {Object} props.semaforoData - Datos del semáforo {aprobadas, enCurso, pendientes, semestreData}
 * @param {boolean} props.showSelector - Mostrar selector de estudiante (admin) o no (estudiante)
 * @param {Array} props.estudiantes - Lista de estudiantes (si showSelector=true)
 * @param {string} props.selectedEstudiante - ID del estudiante seleccionado
 * @param {Function} props.onEstudianteChange - Callback cuando cambia el estudiante
 */
const SemaforoAcademico = ({
  semaforoData = {
    aprobadas: [],
    enCurso: [],
    pendientes: [],
    semestreData: {}, // {1: [...materias], 2: [...materias], ...}
  },
  showSelector = false,
  estudiantes = [],
  selectedEstudiante = "",
  onEstudianteChange,
}) => {
  const { aprobadas = [], enCurso = [], pendientes = [], semestreData = {} } = semaforoData;

  const conteoAprobadas = aprobadas.length;
  const conteoEnCurso = enCurso.length;
  const conteoPendientes = pendientes.length;

  return (
    <div className="semaforo-content">
      {showSelector && estudiantes.length > 0 && (
        <div className="student-selector">
          <h2>Semáforo Académico</h2>
          <div className="selector-container">
            <label htmlFor="student-select">Seleccionar estudiante:</label>
            <div className="select-wrapper">
              <select
                id="student-select"
                value={selectedEstudiante}
                onChange={(e) => onEstudianteChange && onEstudianteChange(e.target.value)}
                className="student-dropdown"
              >
                <option value="">Seleccionar estudiante</option>
                {estudiantes.map((estudiante) => (
                  <option key={estudiante.id} value={estudiante.id}>
                    {estudiante.nombre}
                  </option>
                ))}
              </select>
              <span className="material-icons select-arrow">keyboard_arrow_down</span>
            </div>
          </div>
        </div>
      )}

      {!showSelector && (
        <div className="semaforo-header">
          <h2>Mi Avance Académico</h2>
          <p>Seguimiento de materias por semestre</p>
        </div>
      )}

      {/* Cards de resumen */}
      <div className="semaforo-cards">
        <div className="semaforo-card card-green">
          <div className="card-icon">
            <span className="material-icons">check_circle</span>
          </div>
          <div className="card-content">
            <h3>Aprobadas</h3>
            <p className="card-count">{conteoAprobadas}</p>
          </div>
        </div>
        <div className="semaforo-card card-yellow">
          <div className="card-icon">
            <span className="material-icons">pending</span>
          </div>
          <div className="card-content">
            <h3>En curso</h3>
            <p className="card-count">{conteoEnCurso}</p>
          </div>
        </div>
        <div className="semaforo-card card-red">
          <div className="card-icon">
            <span className="material-icons">cancel</span>
          </div>
          <div className="card-content">
            <h3>Pendientes</h3>
            <p className="card-count">{conteoPendientes}</p>
          </div>
        </div>
      </div>

      {/* Tablas por semestre */}
      <div className="semester-tables">
        <div className="semester-table">
          <h3>Semestres 1 - 4</h3>
          <table>
            <thead>
              <tr>
                <th>Semestre 1</th>
                <th>Semestre 2</th>
                <th>Semestre 3</th>
                <th>Semestre 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {semestreData[1] && semestreData[1].length > 0
                    ? semestreData[1].map((materia, index) => (
                        <div key={index} className={`materia-item ${materia.estado}`}>
                          {materia.nombre}
                        </div>
                      ))
                    : <div className="no-data">Sin datos</div>}
                </td>
                <td>
                  {semestreData[2] && semestreData[2].length > 0
                    ? semestreData[2].map((materia, index) => (
                        <div key={index} className={`materia-item ${materia.estado}`}>
                          {materia.nombre}
                        </div>
                      ))
                    : <div className="no-data">Sin datos</div>}
                </td>
                <td>
                  {semestreData[3] && semestreData[3].length > 0
                    ? semestreData[3].map((materia, index) => (
                        <div key={index} className={`materia-item ${materia.estado}`}>
                          {materia.nombre}
                        </div>
                      ))
                    : <div className="no-data">Sin datos</div>}
                </td>
                <td>
                  {semestreData[4] && semestreData[4].length > 0
                    ? semestreData[4].map((materia, index) => (
                        <div key={index} className={`materia-item ${materia.estado}`}>
                          {materia.nombre}
                        </div>
                      ))
                    : <div className="no-data">Sin datos</div>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="semester-table">
          <h3>Semestres 5 - 8</h3>
          <table>
            <thead>
              <tr>
                <th>Semestre 5</th>
                <th>Semestre 6</th>
                <th>Semestre 7</th>
                <th>Semestre 8</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {semestreData[5] && semestreData[5].length > 0
                    ? semestreData[5].map((materia, index) => (
                        <div key={index} className={`materia-item ${materia.estado}`}>
                          {materia.nombre}
                        </div>
                      ))
                    : <div className="no-data">Sin datos</div>}
                </td>
                <td>
                  {semestreData[6] && semestreData[6].length > 0
                    ? semestreData[6].map((materia, index) => (
                        <div key={index} className={`materia-item ${materia.estado}`}>
                          {materia.nombre}
                        </div>
                      ))
                    : <div className="no-data">Sin datos</div>}
                </td>
                <td>
                  {semestreData[7] && semestreData[7].length > 0
                    ? semestreData[7].map((materia, index) => (
                        <div key={index} className={`materia-item ${materia.estado}`}>
                          {materia.nombre}
                        </div>
                      ))
                    : <div className="no-data">Sin datos</div>}
                </td>
                <td>
                  {semestreData[8] && semestreData[8].length > 0
                    ? semestreData[8].map((materia, index) => (
                        <div key={index} className={`materia-item ${materia.estado}`}>
                          {materia.nombre}
                        </div>
                      ))
                    : <div className="no-data">Sin datos</div>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SemaforoAcademico;
