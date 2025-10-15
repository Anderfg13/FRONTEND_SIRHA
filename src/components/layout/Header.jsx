import React from "react";
import "./Layout.css";

/**
 * Header compartido para admin y estudiante
 * @param {Object} props
 * @param {string} props.userName - Nombre del usuario opcional
 * @param {Function} props.onProfileClick - Callback cuando se hace click en el perfil
 */
const Header = ({ userName, onProfileClick }) => {
  return (
    <header className="main-header">
      <img
        src="https://img.genial.ly/60942d42948f6b0f9f6d906d/b8e7c67d-b995-4bd0-befe-a271a218ef78.png"
        alt="Logo Escuela Colombiana de Ingeniería"
        className="logo-image"
      />
      <div className="header-right">
        {userName && <span className="user-name">{userName}</span>}
        <div
          className="profile-icon"
          onClick={onProfileClick}
          role="button"
          tabIndex={0}
        >
          <span className="material-icons">person_outline</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
