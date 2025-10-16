import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/MenuButton.css";

function MenuButton({ icono, nombre, ruta }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === ruta;

  return (
    <li
      className={`sidebar-menu-item${isActive ? " active" : ""}`}
      onClick={() => navigate(ruta)}
    >
      <span className="material-icons">{icono}</span>
      <span>{nombre}</span>
    </li>
  );
}

export default MenuButton;