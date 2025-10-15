import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";

/**
 * Sidebar compartido para admin y estudiante
 * @param {Object} props
 * @param {Array} props.menuItems - Array de items del menú [{path, icon, label}]
 * @param {Function} props.onLogout - Callback para manejar logout
 */
const Sidebar = ({ menuItems = [], onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "¿Estás seguro de que quieres salir de la aplicación?"
    );

    if (confirmLogout) {
      if (onLogout) {
        onLogout();
      }
      navigate("/");
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>SIRHA</h1>
        <p>Sistema Académico</p>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${
                location.pathname === item.path ? "active" : "clickable"
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="material-icons">{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      <div className="logout clickable" onClick={handleLogout}>
        <span className="material-icons">logout</span>
        SALIR
      </div>
    </aside>
  );
};

export default Sidebar;
