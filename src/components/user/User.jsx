import React from "react";
import "./User.css";

function User({ user }) {
  return (
    <div className="user-card">
      <div className="user-header">
        <div className="user-avatar">
          <span className="material-icons">person</span>
        </div>
        <span className="user-title">{user?.nombre?.toUpperCase() || "USUARIO"}</span>
      </div>
      <div className="user-info-grid">
        <div className="user-info-row">
          <span className="user-label">Nombre completo:</span>
          <span className="user-value">{user?.nombreCompleto || "-"}</span>
          <span className="user-label">Carrera:</span>
          <span className="user-value">{user?.carrera || "-"}</span>
        </div>
        <div className="user-info-row">
          <span className="user-label">Semestre:</span>
          <span className="user-value">{user?.semestre || "-"}</span>
          <span className="user-label">ID Estudiantil:</span>
          <span className="user-id">{user?.idEstudiantil || "-"}</span>
        </div>
      </div>
    </div>
  );
}

export default User;