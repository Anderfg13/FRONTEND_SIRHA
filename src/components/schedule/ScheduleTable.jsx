import React from "react";
import "./Schedule.css";

/**
 * Componente de horario parametrizado
 * @param {Object} props
 * @param {string} props.semestre - Periodo académico (ej: "Primer semestre 2025 (2025 - 1)")
 * @param {Array} props.periodos - Lista de periodos disponibles
 * @param {Function} props.onPeriodoChange - Callback cuando cambia el periodo
 * @param {Array} props.horarioData - Datos del horario [{franja, lunes, martes, miercoles, jueves, viernes, sabado}]
 */
const ScheduleTable = ({
  semestre = "Primer semestre 2025 (2025 - 1)",
  periodos = [],
  onPeriodoChange,
  horarioData = [],
}) => {
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  // Horario por defecto si no se proporciona data
  const defaultHorario = [
    { franja: "07:00 - 08:30", lunes: "PRI2IS - 2", martes: "DOSW - 3", miercoles: "ODSC - 1L", jueves: "", viernes: "", sabado: "" },
    { franja: "08:30 - 10:00", lunes: "", martes: "", miercoles: "ODSC - 1L", jueves: "ODSC - 2", viernes: "", sabado: "" },
    { franja: "10:00 - 11:30", lunes: "", martes: "PRYE - 6", miercoles: "PRYE - 6", jueves: "PRYE - 6", viernes: "PRYE - 6", sabado: "" },
    { franja: "11:30 - 01:00", lunes: "", martes: "FIS2 - 10", miercoles: "FIS2 - 10", jueves: "FIS2 - 10", viernes: "FIS2 - 13L", sabado: "" },
    { franja: "01:00 - 02:30", lunes: "FUPR - 5", martes: "", miercoles: "FUPR - 5", jueves: "DOSW - 301", viernes: "PRI2IS - 2", sabado: "" },
    { franja: "02:30 - 04:00", lunes: "ODSC - 2", martes: "", miercoles: "", jueves: "DOSW - 301", viernes: "", sabado: "" },
    { franja: "04:00 - 05:30", lunes: "", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" },
    { franja: "05:30 - 07:00", lunes: "", martes: "", miercoles: "", jueves: "", viernes: "", sabado: "" },
  ];

  const data = horarioData.length > 0 ? horarioData : defaultHorario;

  return (
    <div className="schedule-section">
      {periodos.length > 0 && (
        <div className="semester-selector">
          <select
            className="semester-dropdown"
            value={semestre}
            onChange={(e) => onPeriodoChange && onPeriodoChange(e.target.value)}
          >
            {periodos.map((periodo, index) => (
              <option key={index} value={periodo}>
                {periodo}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="schedule-container">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Franja</th>
              {diasSemana.map((dia) => (
                <th key={dia}>{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="time-slot">{row.franja}</td>
                <td>{row.lunes}</td>
                <td>{row.martes}</td>
                <td>{row.miercoles}</td>
                <td>{row.jueves}</td>
                <td>{row.viernes}</td>
                <td>{row.sabado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleTable;
