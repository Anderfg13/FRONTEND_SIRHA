import React from "react";
import "../../styles/Schedule.css";

const horarios = [
  { franja: "07:00 - 08:30", dias: ["CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I"] },
  { franja: "08:30 - 10:00", dias: ["CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I"] },
  { franja: "10:00 - 11:30", dias: ["CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I"] },
  { franja: "11:30 - 01:00", dias: ["CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I"] },
  { franja: "01:00 - 02:30", dias: ["CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I"] },
  { franja: "02:30 - 04:00", dias: ["CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I"] },
  { franja: "04:00 - 05:30", dias: ["CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I"] },
  { franja: "05:30 - 07:00", dias: ["CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I", "CAL-I"] },
];

function Schedule() {
  return (
    <div className="schedule-container">
      <div className="schedule-table-wrapper">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Franja</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sábado</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((row, idx) => (
              <tr key={idx}>
                <td>{row.franja}</td>
                {row.dias.map((materia, i) => (
                  <td key={i}>{materia}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schedule;