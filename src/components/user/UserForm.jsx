import React from "react";
import ErrorMessage from "../ui/ErrorMessage";

/**
 * Formulario para crear/editar usuarios
 */
export default function UserForm({ formData, onChange, onSubmit, buttonText = "CREAR", errors = {} }) {
  return (
    <div style={{
      backgroundColor: "#d9d9d9",
      padding: "30px",
      borderRadius: "8px"
    }}>
      <h2 style={{
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "25px",
        textAlign: "center"
      }}>
        CREAR NUEVO USUARIO
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "15px"
        }}>
          <div>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Primer Nombre <span style={{ color: "#991b1b" }}>*</span>
            </label>
            <input
              type="text"
              name="primerNombre"
              value={formData.primerNombre}
              onChange={onChange}
              className="form-input"
              style={{
                borderColor: errors.primerNombre ? "#ef4444" : "#999"
              }}
            />
            <ErrorMessage error={errors.primerNombre} />
          </div>
          <div>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Segundo Nombre
            </label>
            <input
              type="text"
              name="segundoNombre"
              value={formData.segundoNombre}
              onChange={onChange}
              className="form-input"
              style={{
                borderColor: errors.segundoNombre ? "#ef4444" : "#999"
              }}
            />
            <ErrorMessage error={errors.segundoNombre} />
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "15px"
        }}>
          <div>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Primer Apellido <span style={{ color: "#991b1b" }}>*</span>
            </label>
            <input
              type="text"
              name="primerApellido"
              value={formData.primerApellido}
              onChange={onChange}
              className="form-input"
              style={{
                borderColor: errors.primerApellido ? "#ef4444" : "#999"
              }}
            />
            <ErrorMessage error={errors.primerApellido} />
          </div>
          <div>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Segundo Apellido
            </label>
            <input
              type="text"
              name="segundoApellido"
              value={formData.segundoApellido}
              onChange={onChange}
              className="form-input"
              style={{
                borderColor: errors.segundoApellido ? "#ef4444" : "#999"
              }}
            />
            <ErrorMessage error={errors.segundoApellido} />
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "15px"
        }}>
          <div>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Rol <span style={{ color: "#991b1b" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <select
                name="rol"
                value={formData.rol}
                onChange={onChange}
                className="form-select"
                style={{
                  borderColor: errors.rol ? "#ef4444" : "#999"
                }}
              >
                <option value="">Seleccionar...</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Decano">Decano</option>
                <option value="Administrador">Administrador</option>
              </select>
              <span className="material-icons" style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#8B0000"
              }}>
                arrow_drop_down
              </span>
            </div>
            <ErrorMessage error={errors.rol} />
          </div>
          <div>
            <label style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "8px"
            }}>
              Programa <span style={{ color: "#991b1b" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <select
                name="programa"
                value={formData.programa}
                onChange={onChange}
                className="form-select"
                style={{
                  borderColor: errors.programa ? "#ef4444" : "#999"
                }}
              >
                <option value="">Seleccionar...</option>
                <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                <option value="Ingeniería Civil">Ingeniería Civil</option>
                <option value="Ingeniería Industrial">Ingeniería Industrial</option>
                <option value="Ingeniería Mecánica">Ingeniería Mecánica</option>
                <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
              </select>
              <span className="material-icons" style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#8B0000"
              }}>
                arrow_drop_down
              </span>
            </div>
            <ErrorMessage error={errors.programa} />
          </div>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="btn-action primary"
        style={{
          width: "100%",
          maxWidth: "300px",
          display: "block",
          margin: "30px auto 0",
          padding: "15px 40px",
          backgroundColor: "#90EE90",
          color: "#000",
          fontSize: "20px"
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
