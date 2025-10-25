import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { Alert } from "../../components/ui/ErrorMessage";
import { isEmpty, isValidTime, isTimeBeforeTime } from "../../utils/validations";

const userAdmin = {
  nombreCompleto: "Nombre Admin",
  correo: "admin@escuelaing.edu.co",
  rol: "Administrador",
  opcionesMenu: [
    { nombre: "INICIO", ruta: "/admin", icono: "home" },
    { nombre: "HORARIO", ruta: "/admin/horario", icono: "calendar_today" },
    { nombre: "SEMÁFORO", ruta: "/admin/semaforo", icono: "traffic" },
    { nombre: "SOLICITUDES", ruta: "/admin/solicitudes", icono: "bookmark" },
    { nombre: "USUARIOS", ruta: "/admin/estudiantes", icono: "groups" },
    { nombre: "GRUPOS Y MATERIAS", ruta: "/admin/grupos", icono: "menu_book" },
    { nombre: "REPORTES Y ESTADÍSTICAS", ruta: "/admin/estadisticas", icono: "bar_chart" },
    { nombre: "CONFIGURACIÓN Y PERIODOS", ruta: "/admin/configuracion", icono: "settings" }
  ]
};

export default function ConfiguracionAdministrador() {
  const [modalidad, setModalidad] = useState("horas"); // "horas" o "fechas"
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [alert, setAlert] = useState(null);

  const handleAceptar = () => {
    // Validaciones según modalidad
    if (modalidad === "horas") {
      // Validar campos vacíos
      if (isEmpty(horaInicio)) {
        setAlert({
          type: 'error',
          message: 'La hora de inicio es obligatoria'
        });
        return;
      }
      
      if (isEmpty(horaFin)) {
        setAlert({
          type: 'error',
          message: 'La hora de fin es obligatoria'
        });
        return;
      }

      // Validar formato de hora
      if (!isValidTime(horaInicio)) {
        setAlert({
          type: 'error',
          message: 'El formato de hora de inicio no es válido'
        });
        return;
      }

      if (!isValidTime(horaFin)) {
        setAlert({
          type: 'error',
          message: 'El formato de hora de fin no es válido'
        });
        return;
      }

      // Validar que hora fin sea después de hora inicio
      if (!isTimeBeforeTime(horaInicio, horaFin)) {
        setAlert({
          type: 'error',
          message: 'La hora de fin debe ser posterior a la hora de inicio'
        });
        return;
      }

      // Todo válido - guardar configuración
      setAlert({
        type: 'success',
        message: `✓ Configuración guardada exitosamente: ${horaInicio} - ${horaFin}`
      });
      
    } else {
      // Validar fechas
      if (isEmpty(fechaInicio)) {
        setAlert({
          type: 'error',
          message: 'La fecha de inicio es obligatoria'
        });
        return;
      }
      
      if (isEmpty(fechaFin)) {
        setAlert({
          type: 'error',
          message: 'La fecha de fin es obligatoria'
        });
        return;
      }

      // Validar que fecha fin sea después de fecha inicio
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      
      if (fin <= inicio) {
        setAlert({
          type: 'error',
          message: 'La fecha de fin debe ser posterior a la fecha de inicio'
        });
        return;
      }

      // Validar que las fechas no sean en el pasado
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      if (inicio < hoy) {
        setAlert({
          type: 'warning',
          message: 'Advertencia: La fecha de inicio es anterior a hoy'
        });
      }

      // Todo válido - guardar configuración
      setAlert({
        type: 'success',
        message: `✓ Configuración guardada exitosamente: ${fechaInicio} a ${fechaFin}`
      });
    }
  };

  return (
    <Dashboard user={userAdmin}>
      <div style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "30px", textAlign: "center" }}>
          Configurar periodos de cambio de materias
        </h1>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            autoClose={alert.type === 'success'}
            duration={4000}
          />
        )}

        {/* Selector de modalidad */}
        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "30px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          marginBottom: "30px"
        }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "20px" }}>
            Seleccione modalidad de configuración:
          </h2>
          
          <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "10px",
              cursor: "pointer",
              fontSize: "16px"
            }}>
              <input
                type="checkbox"
                checked={modalidad === "horas"}
                onChange={() => setModalidad("horas")}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              Por horas
            </label>
            <label style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "10px",
              cursor: "pointer",
              fontSize: "16px"
            }}>
              <input
                type="checkbox"
                checked={modalidad === "fechas"}
                onChange={() => setModalidad("fechas")}
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
              Por fechas
            </label>
          </div>

          {/* Configuración por horas */}
          {modalidad === "horas" && (
            <div style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              marginBottom: "20px"
            }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "15px",
                  fontSize: "16px",
                  marginBottom: "10px"
                }}>
                  <span className="material-icons" style={{ fontSize: "24px" }}>access_time</span>
                  <span style={{ fontWeight: "600" }}>Hora de inicio:</span>
                </label>
                <input
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "16px"
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "15px",
                  fontSize: "16px",
                  marginBottom: "10px"
                }}>
                  <span className="material-icons" style={{ fontSize: "24px" }}>access_time</span>
                  <span style={{ fontWeight: "600" }}>Hora de fin:</span>
                </label>
                <input
                  type="time"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "16px"
                  }}
                />
              </div>
            </div>
          )}

          {/* Configuración por fechas */}
          {modalidad === "fechas" && (
            <div style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              marginBottom: "20px"
            }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "15px",
                  fontSize: "16px",
                  marginBottom: "10px"
                }}>
                  <span className="material-icons" style={{ fontSize: "24px" }}>event</span>
                  <span style={{ fontWeight: "600" }}>Fecha de inicio:</span>
                </label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "16px"
                  }}
                />
              </div>

              <div>
                <label style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "15px",
                  fontSize: "16px",
                  marginBottom: "10px"
                }}>
                  <span className="material-icons" style={{ fontSize: "24px" }}>event</span>
                  <span style={{ fontWeight: "600" }}>Fecha de fin:</span>
                </label>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "16px"
                  }}
                />
              </div>
            </div>
          )}

          {/* Botón de aceptar */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <button
              onClick={handleAceptar}
              style={{
                padding: "15px 60px",
                backgroundColor: "#8B0000",
                color: "white",
                border: "none",
                borderRadius: "25px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#A00000"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#8B0000"}
            >
              ACEPTAR
            </button>
          </div>
        </div>

        {/* Información adicional */}
        <div style={{
          backgroundColor: "#e3f2fd",
          padding: "20px",
          borderRadius: "8px",
          border: "1px solid #90caf9"
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
            <span className="material-icons" style={{ color: "#1976d2", fontSize: "28px" }}>
              info
            </span>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px", color: "#1565c0" }}>
                Información importante
              </h3>
              <p style={{ fontSize: "14px", color: "#424242", lineHeight: "1.6" }}>
                Configure los periodos durante los cuales los estudiantes podrán realizar solicitudes 
                de cambio de materias. Puede elegir entre configuración por horas (mismo día) o por 
                fechas (rango de días). Los cambios se aplicarán inmediatamente después de confirmar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
