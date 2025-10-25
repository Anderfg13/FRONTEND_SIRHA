import React from "react";
import "../../styles/Student.css";

/**
 * Lista de usuarios para selección
 */
export default function UserList({ usuarios = [], selectedUser, onSelectUser }) {
  return (
    <div style={{
      backgroundColor: "#d9d9d9",
      padding: "30px",
      borderRadius: "8px"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h2 style={{
          fontSize: "20px",
          fontWeight: "600"
        }}>
          Seleccione el usuario
        </h2>
        <span className="material-icons" style={{
          fontSize: "32px",
          color: "#8B0000",
          cursor: "pointer"
        }}>
          arrow_drop_down
        </span>
      </div>

      <div className="students-list" style={{
        maxHeight: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        {usuarios.length === 0 ? (
          <div className="no-students">
            <span className="material-icons">groups</span>
            <p>No hay usuarios registrados</p>
          </div>
        ) : (
          usuarios.map((usuario) => (
            <div
              key={usuario.id}
              onClick={() => onSelectUser && onSelectUser(usuario.id)}
              className={`student-card ${selectedUser === usuario.id ? 'selected' : ''}`}
              style={{
                backgroundColor: "#FFFF99",
                cursor: "pointer"
              }}
            >
              <div className="student-main-info">
                <h3>{usuario.nombre}</h3>
                <div style={{ fontSize: "14px", color: "#333" }}>
                  {usuario.programa}
                </div>
                <div style={{ fontSize: "14px", color: "#333", marginTop: "4px" }}>
                  {usuario.rol}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
