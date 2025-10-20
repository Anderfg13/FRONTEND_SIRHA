import React, { useState } from "react";
import "../../styles/Requests.css";

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
  const [solicitudModalOpen, setSolicitudModalOpen] = useState(false);
  const [solicitudTemp, setSolicitudTemp] = useState("");
  const [periodo, setPeriodo] = useState(periodos[0]);
  const [historial, setHistorial] = useState(historialEjemplo);

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

  return (
    <div className="requests-root">
      <h1 className="requests-title">Solicitudes</h1>
      <div className="requests-content">
        <form className="requests-form">
          <table className="requests-table">
            <tbody>
              <tr>
                <td className="requests-label"><b>Tipo Solicitud:</b></td>
                <td>
                  <select
                    value={tipoSolicitud}
                    onChange={e => setTipoSolicitud(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    {tiposSolicitud.map((tipo, idx) => (
                      <option key={idx} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </td>
                <td className="requests-label"><b>Grupo/Clase:</b></td>
                <td>
                  <input
                    type="text"
                    value={grupo}
                    onChange={e => setGrupo(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="requests-label"><b>No Catalogo:</b></td>
                <td>
                  <input
                    type="text"
                    value={catalogo}
                    onChange={e => setCatalogo(e.target.value)}
                  />
                </td>
                <td className="requests-label"><b>Solicitud:</b></td>
                <td>
                  <button
                    type="button"
                    className="requests-solicitud-btn"
                    onClick={() => {
                      setSolicitudTemp(solicitud);
                      setSolicitudModalOpen(true);
                    }}
                  >
                    {solicitud ? "Modificar Solicitud" : "Escribir Solicitud"}
                  </button>
                  {solicitud && (
                    <div className="requests-solicitud-preview">{solicitud}</div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="requests-btn-row">
            <button type="button" className="requests-btn" onClick={handleEnviar}>
              ENVIAR SOLICITUD
            </button>
          </div>
        </form>
        {solicitudModalOpen && (
          <div className="requests-modal-overlay">
            <div className="requests-modal-small">
              <h3 className="requests-modal-title">Solicitud</h3>
              <textarea
                className="requests-modal-textarea"
                value={solicitudTemp}
                onChange={e => setSolicitudTemp(e.target.value)}
                rows={4}
                placeholder="Escribe tu solicitud aquí..."
              />
              <div className="requests-modal-actions">
                <button
                  className="requests-btn"
                  type="button"
                  onClick={() => {
                    setSolicitud(solicitudTemp);
                    setSolicitudModalOpen(false);
                  }}
                >Guardar</button>
                <button
                  className="requests-btn"
                  type="button"
                  style={{ background: '#bbb', color: '#222', marginLeft: 8 }}
                  onClick={() => setSolicitudModalOpen(false)}
                >Cancelar</button>
              </div>
            </div>
          </div>
        )}
        <div className="requests-historial-box">
          <div className="requests-historial-header">
            <span className="requests-historial-title">Historial Solicitudes</span>
            <select
              className="requests-historial-periodo"
              value={periodo}
              onChange={e => setPeriodo(e.target.value)}
            >
              {periodos.map((p, idx) => (
                <option key={idx} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="requests-historial-list">
            {historial.map((item, idx) => (
              <div key={idx} className="requests-historial-item">
                <div><b>Tipo Solicitud:</b> {item.tipo}</div>
                <div><b>N Catálogo:</b> {item.catalogo}</div>
                <div><b>Estado Solicitud:</b> {item.estado}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}
export default Requests;