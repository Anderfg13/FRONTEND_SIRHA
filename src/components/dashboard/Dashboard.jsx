import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";
import logoECIJG from "../../assets/images/login/Logotipo.png";

export default function Dashboard({ user, children }) {
  const navigate = useNavigate();
  const location = useLocation(); // <-- Nuevo
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { nombre: "INICIO", ruta: "/dashboard", icono: "home" },
    { nombre: "HORARIO", ruta: "/horario", icono: "calendar_today" },
    { nombre: "SEMAFORO", ruta: "/semaforo", icono: "traffic" },
    { nombre: "SOLICITUDES", ruta: "/solicitudes", icono: "description" }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    // Aquí puedes limpiar el estado global, localStorage, etc.
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Valores por defecto si no hay usuario (para pruebas)
  const nombreCompleto = user?.nombreCompleto || "Nombre Apellido";
  const correo = user?.correo || "correo@escuelaing.edu.co";
  const rol = user?.rol || "Estudiante";
  const programa = user?.programa || "Ingeniería de Sistemas";

  return (
    <div className="dashboard">
      {/* Caja gris arriba */}
      <div className="sidebar-header">
        <h1>SIRHA</h1>
        <p>Sistema Académico</p>
      </div>
      {/* Sidebar rojo debajo */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.nombre}
                className={`nav-item clickable${location.pathname === item.ruta ? " active" : ""}`}
                onClick={() => handleNavigation(item.ruta)}
              >
                <span className="material-icons">{item.icono}</span>
                {item.nombre}
              </li>
            ))}
          </ul>
        </nav>
        <div className="logout clickable" onClick={() => setShowLogoutModal(true)}>
          <span className="material-icons">exit_to_app</span>
          SALIR
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <img src={logoECIJG} alt="Logo Escuela Colombiana de Ingeniería" className="logo-image" />
          <div className="header-info">
            <div>
              <strong>Bienvenido {nombreCompleto}</strong><br />
              {correo}<br />
              {rol === "Estudiante"
                ? `Estudiante del programa ${programa}`
                : rol === "Decano"
                ? `Decano del programa ${programa}`
                : rol === "Administrador"
                ? "Administrador del sistema"
                : ""}
            </div>
          </div>
          <div className="profile-icon" onClick={() => navigate("/usuario")}>
            <span className="material-icons">person_outline</span>
          </div>
        </header>

        {/* Content */}
        <div className="content">
          {children /* Aquí se mostrarán los componentes hijos */}
        </div>
      </main>

      {/* Modal de confirmación */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¿Esta seguro que desea salir?</h2>
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={confirmLogout}>SI</button>
              <button className="btn-cancel" onClick={cancelLogout}>NO</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}