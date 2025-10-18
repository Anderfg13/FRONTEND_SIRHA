import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Home.css"; // Asegúrate de crear este archivo para los estilos

function Home() {
  const navigate = useNavigate();

  const handleSolicitudClick = () => {
    navigate("/solicitudes");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Estado de tu cuenta</h1>
      <div className="home-summary">
        {/* Solicitudes */}
        <div className="home-card">
          <h2>Solicitudes</h2>
          <button className="solicitud-btn aprobada" onClick={handleSolicitudClick}>L-CAT GRUPO 2</button>
          <button className="solicitud-btn aprobada" onClick={handleSolicitudClick}>L-CAT GRUPO 2</button>
          <button className="solicitud-btn rechazada" onClick={handleSolicitudClick}>L-CAT GRUPO 2</button>
          <button className="solicitud-btn rechazada" onClick={handleSolicitudClick}>L-CAT GRUPO 2</button>
        </div>
        {/* Horario */}
        <div className="home-card">
          <h2>Horario</h2>
          <table className="home-table">
            <thead>
              <tr>
                <th>Lunes</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>7-8:30 CALI</td></tr>
              <tr><td>8:30-10 CALI</td></tr>
              <tr><td>10-11:30 CALI</td></tr>
              <tr><td>11:30-1 CALI</td></tr>
              <tr><td>1-2:30 CALI</td></tr>
            </tbody>
          </table>
        </div>
        {/* Semáforo */}
        <div className="home-card">
          <h2>Semaforo</h2>
          <div className="home-semaforo">
            <b>Materias cursadas:</b> 10 <br />
            <b>Materias por cursar:</b> 4 <br />
            <b>Materias repetidas:</b> 2 <br />
            <b>Pensum:</b> 2025-2 <br />
            <b>Creditos Activos:</b> 16
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;