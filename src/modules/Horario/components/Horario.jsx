import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Horario.css";

const Horario = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Función para manejar el logout con confirmación
  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Estás seguro de que quieres salir de la aplicación?");
    
    if (confirmLogout) {
      // Aquí puedes agregar lógica adicional como limpiar localStorage, etc.
      navigate("/");
    }
    // Si el usuario cancela, no hace nada
  };

  return (
    <div className="horario-container">
      <div className="dashboard">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo-section">
              <h1>SIRHA</h1>
              <p>Sistema Académico</p>
            </div>
          </div>

          <nav className="sidebar-nav">
            <ul>
              <li
                className="nav-item clickable"
                onClick={() => handleNavigation("/dashboard")}
              >
                <span className="material-icons">home</span>
                INICIO
              </li>
              <li
                className="nav-item clickable"
                onClick={() => handleNavigation("/solicitudes")}
              >
                <span className="material-icons">description</span>
                SOLICITUDES
              </li>
              <li
                className="nav-item clickable"
                onClick={() => handleNavigation("/semaforo")}
              >
                <span className="material-icons">traffic</span>
                SEMÁFORO
              </li>
              <li
                className="nav-item clickable"
                onClick={() => handleNavigation("/estudiantes")}
              >
                <span className="material-icons">people</span>
                ESTUDIANTES
              </li>
              <li
                className="nav-item clickable"
                onClick={() => handleNavigation("/grupos-materias")}
              >
                <span className="material-icons">class</span>
                GRUPOS Y MATERIAS
              </li>
              <li
                className="nav-item clickable"
                onClick={() => handleNavigation("/configuracion")}
              >
                <span className="material-icons">settings</span>
                CONFIGURACIÓN ACADÉMICA
              </li>
              <li className="nav-item active">
                <span className="material-icons">calendar_today</span>
                HORARIO
              </li>
            </ul>
          </nav>

          {/* Cambio aquí: usar handleLogout en lugar de handleNavigation directo */}
          <div
            className="logout clickable"
            onClick={handleLogout}
          >
            <span className="material-icons">exit_to_app</span>
            SALIR
          </div>
        </aside>

        {/* Main content */}
        <main className="main-content">
          {/* Header */}
          <header className="main-header">
            <div className="user-info">
              <img
                alt="Logo Escuela Colombiana de Ingeniería"
                className="logo-image"
                src="https://img.genial.ly/60942d42948f6b0f9f6d906d/b8e7c67d-b995-4bd0-befe-a271a218ef78.png"
              />
            </div>

            <div className="profile-icon">
              <span className="material-icons">person</span>
            </div>
          </header>

          {/* Horario */}
          <div className="content-section">
            <div className="semester-selector">
              <select className="semester-dropdown">
                <option>Primer semestre 2025 (2025 - 1)</option>
              </select>
            </div>

            <div className="schedule-container">
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
                  <tr>
                    <td className="time-slot">07:00 - 08:30</td>
                    <td>PRI2IS - 2</td>
                    <td>DOSW - 3</td>
                    <td>ODSC - 1L</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="time-slot">08:30 - 10:00</td>
                    <td></td>
                    <td></td>
                    <td>ODSC - 1L</td>
                    <td>ODSC - 2</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="time-slot">10:00 - 11:30</td>
                    <td></td>
                    <td>PRYE - 6</td>
                    <td>PRYE - 6</td>
                    <td>PRYE - 6</td>
                    <td>PRYE - 6</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="time-slot">11:30 - 01:00</td>
                    <td></td>
                    <td>FIS2 - 10</td>
                    <td>FIS2 - 10</td>
                    <td>FIS2 - 10</td>
                    <td>FIS2 - 13L</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="time-slot">01:00 - 02:30</td>
                    <td>FUPR - 5</td>
                    <td></td>
                    <td>FUPR - 5</td>
                    <td>DOSW - 301</td>
                    <td>PRI2IS - 2</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="time-slot">02:30 - 04:00</td>
                    <td>ODSC - 2</td>
                    <td></td>
                    <td></td>
                    <td>DOSW - 301</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="time-slot">04:00 - 05:30</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="time-slot">05:30 - 07:00</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Horario;
