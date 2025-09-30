import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaTrafficLight,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

export default function DecanoDashboard() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Inicio", icon: <FaHome />, path: "/decano" },
    { label: "Horario", icon: <FaCalendarAlt />, path: "/decano/horario" },
    { label: "Semáforo", icon: <FaTrafficLight />, path: "/decano/semaforo" },
    { label: "Solicitudes", icon: <FaClipboardList />, path: "/decano/solicitudes" },
    { label: "Salir", icon: <FaSignOutAlt />, path: "/" },
  ];

  const sidebarStyle = {
    width: "260px",
    backgroundColor: "#990000",
    color: "#ffffffff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  };

  const headerStyle = {
    backgroundColor: "#cac4c4ff",
    color: "#222",
    padding: "20px 10px",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "45px",
    fontWeight: "bold",
    marginBottom: "4px",
  };

  const subtitleStyle = {
    fontSize: "14px",
    fontWeight: 400,
    color: "#000000ff",
  };

  const menuContainerStyle = {
    marginTop: "4px",
    flex: 1,
  };

  const menuItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 16px",
    cursor: "pointer",
    fontSize: "20px",
    transition: "background 0.2s",
    borderBottom: "2px solid black", 
  };

  const containerStyle = {
    display: "flex",
  };

  const contentStyle = {
    flex: 1,
    padding: "24px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        {/* Encabezado con fondo gris */}
        <div style={headerStyle}>
          <div style={titleStyle}>SIRHA</div>
          <div style={subtitleStyle}>sistema acdemico</div>
        </div>

        {/* Menú */}
        <div style={menuContainerStyle}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              style={{
                ...menuItemStyle,
                ...(window.location.pathname === item.path
                  ? { backgroundColor: "#b30000" }
                  : {}),
              }}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
}
