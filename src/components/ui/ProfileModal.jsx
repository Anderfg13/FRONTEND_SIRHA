import React from "react";
import "../../styles/ProfileModal.css";

const ProfileModal = ({ open, onClose, user }) => {
  if (!open) return null;
  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={e => e.stopPropagation()}>
        <div className="profile-modal-header">
          <span className="material-icons profile-avatar">person</span>
          <h2>{user.nombre.toUpperCase()}</h2>
        </div>
        <div className="profile-modal-body">
          <div className="profile-row">
            <span className="profile-label">Nombre completo:</span>
            <span>{user.nombre}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Facultad:</span>
            <span>{user.programa || user.facultad}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">Cargo:</span>
            <span>{user.cargo || "Estudiante"}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">ID Institucional:</span>
            <span className="profile-id">{user.codigo || user.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
