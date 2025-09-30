import React, { useState } from "react";

const tiposSolicitud = [
  "Inscribir/Adicionar clase",
  "Cancelar clase",
  "Cambio de grupo",
  "Homologación",
  "Otro"
];

const periodos = [
  "Periodo Academico 2025-1",
  "Periodo Academico 2024-2",
  "Periodo Academico 2024-1"
];

// Simulación de historial con más información
const historialEjemplo = [
  {
    tipo: "Inscribir/Adicionar clase",
    catalogo: "PRI2IS",
    estado: "Aprobada",
    respuesta: "Su solicitud fue aprobada exitosamente.",
    fecha: "2025-02-10"
  },
  {
    tipo: "Cancelar clase",
    catalogo: "MAT101",
    estado: "Rechazada",
    respuesta: "No cumple con los requisitos para cancelar.",
    fecha: "2025-02-12"
  },
  {
    tipo: "Cambio de grupo",
    catalogo: "FIS2",
    estado: "Remitida",
    respuesta: "Su solicitud fue remitida al departamento académico.",
    fecha: "2025-02-15"
  },
  {
    tipo: "Homologación",
    catalogo: "HOM202",
    estado: "Pendiente",
    respuesta: "Por favor adjunte el certificado de notas.",
    fecha: "2025-02-18"
  }
];

function Requests() {
  const [tipoSolicitud, setTipoSolicitud] = useState("");
  const [grupo, setGrupo] = useState("");
  const [catalogo, setCatalogo] = useState("");
  const [solicitud, setSolicitud] = useState("");
  const [periodo, setPeriodo] = useState(periodos[0]);
  const [historial, setHistorial] = useState(historialEjemplo);

  // Estado para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  const handleEnviar = () => {
    if (tipoSolicitud && catalogo && solicitud) {
      setHistorial([
        ...historial,
        {
          tipo: tipoSolicitud,
          catalogo,
          estado: "Pendiente",
          respuesta: "En revisión.",
          fecha: new Date().toISOString().slice(0, 10)
        }
      ]);
      setTipoSolicitud("");
      setGrupo("");
      setCatalogo("");
      setSolicitud("");
    }
  };

  const handleHistorialClick = (item) => {
    setSolicitudSeleccionada(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSolicitudSeleccionada(null);
  };

  return (
    <div className="solicitudes-container">
      <h1 className="solicitudes-title">Solicitudes</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 10 }}>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #222", padding: 8, fontWeight: 500 }}>Tipo Solicitud:</td>
            <td style={{ border: "1px solid #222", padding: 8 }}>
              <select
                value={tipoSolicitud}
                onChange={e => setTipoSolicitud(e.target.value)}
                style={{ width: "100%", padding: 4 }}
              >
                <option value="">Seleccione...</option>
                {tiposSolicitud.map((tipo, idx) => (
                  <option key={idx} value={tipo}>{tipo}</option>
                ))}
              </select>
            </td>
            <td style={{ border: "1px solid #222", padding: 8, fontWeight: 500 }}>Grupo/Clase:</td>
            <td style={{ border: "1px solid #222", padding: 8 }}>
              <input
                type="text"
                value={grupo}
                onChange={e => setGrupo(e.target.value)}
                style={{ width: "100%", padding: 4 }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #222", padding: 8, fontWeight: 500 }}>No Catalogo:</td>
            <td style={{ border: "1px solid #222", padding: 8 }}>
              <input
                type="text"
                value={catalogo}
                onChange={e => setCatalogo(e.target.value)}
                style={{ width: "100%", padding: 4 }}
              />
            </td>
            <td style={{ border: "1px solid #222", padding: 8, fontWeight: 500 }}>Solicitud:</td>
            <td style={{ border: "1px solid #222", padding: 8 }}>
              <input
                type="text"
                value={solicitud}
                onChange={e => setSolicitud(e.target.value)}
                style={{ width: "100%", padding: 4 }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <button
          style={{
            background: "#e8a8a8",
            color: "#222",
            fontWeight: 500,
            border: "none",
            borderRadius: 10,
            padding: "8px 32px",
            fontSize: 18,
            cursor: "pointer"
          }}
          onClick={handleEnviar}
        >
          ENVIAR SOLICITUD
        </button>
      </div>
      <div style={{ background: "#eee", borderRadius: 8, padding: 12 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 18, marginRight: 12 }}>Historial Solicitudes</span>
          <select
            value={periodo}
            onChange={e => setPeriodo(e.target.value)}
            style={{
              background: "#b5d3f7",
              border: "none",
              borderRadius: 4,
              padding: "4px 12px",
              fontWeight: 500,
              fontSize: 15
            }}
          >
            {periodos.map((p, idx) => (
              <option key={idx} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div style={{ maxHeight: 260, minHeight: 200, overflowY: "auto" }}>
          {historial.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "#fff9c4",
                border: "2px solid #222",
                borderRadius: 12,
                padding: 10,
                marginBottom: 10,
                cursor: "pointer"
              }}
              onClick={() => handleHistorialClick(item)}
              title="Ver detalle de la solicitud"
            >
              <div><b>Tipo Solicitud:</b> {item.tipo}</div>
              <div><b>N Catalogo:</b> {item.catalogo}</div>
              <div><b>Estado Solicitud:</b> {item.estado}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para detalle de solicitud */}
      {modalOpen && solicitudSeleccionada && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 16,
            padding: 32,
            minWidth: 320,
            maxWidth: 400,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            position: "relative"
          }}>
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                background: "transparent",
                border: "none",
                fontSize: 22,
                cursor: "pointer"
              }}
              title="Cerrar"
            >×</button>
            <h2 style={{ marginBottom: 16 }}>Detalle de Solicitud</h2>
            <div><b>Tipo Solicitud:</b> {solicitudSeleccionada.tipo}</div>
            <div><b>N Catálogo:</b> {solicitudSeleccionada.catalogo}</div>
            <div><b>Estado:</b> {solicitudSeleccionada.estado}</div>
            <div><b>Respuesta:</b> {solicitudSeleccionada.respuesta}</div>
            <div><b>Fecha:</b> {solicitudSeleccionada.fecha}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Requests;