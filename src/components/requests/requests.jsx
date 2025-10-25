import React, { useState } from "react";
import "../../styles/Requests.css";
import ErrorMessage, { Alert, ValidationSummary } from "../ui/ErrorMessage";
import { isEmpty, hasMinLength } from "../../utils/validations";

const tiposSolicitud = [
  { value: "INSCRIPCION_GRUPO", label: "Inscripción de grupo" },
  { value: "CANCELAR_CLASE", label: "Cancelar clase" },
  { value: "CAMBIO_GRUPO", label: "Cambio de grupo" },
  { value: "HOMOLOGACION", label: "Homologación" },
  { value: "OTRO", label: "Otro" }
];

const periodos = [
  "Periodo Academico 2025-1",
  "Periodo Academico 2024-2",
  "Periodo Academico 2024-1"
];

const historialEjemplo = [
  {
    tipoSolicitud: "INSCRIPCION_GRUPO",
    grupoProblemaId: "GRP-001",
    materiaProblemaAcronimo: "PRI2IS",
    grupoDestinoId: "GRP-002",
    materiaDestinoAcronimo: "PRI2IS",
    observaciones: "Solicito inscripción en el grupo 2 por conflicto de horario con otra materia",
    estado: "Aprobada",
    respuesta: "Su solicitud fue aprobada exitosamente.",
    fecha: "2025-02-10"
  },
  {
    tipoSolicitud: "CANCELAR_CLASE",
    grupoProblemaId: "GRP-005",
    materiaProblemaAcronimo: "MAT101",
    grupoDestinoId: "",
    materiaDestinoAcronimo: "",
    observaciones: "Necesito cancelar esta materia por motivos personales y de salud",
    estado: "Rechazada",
    respuesta: "No cumple con los requisitos para cancelar.",
    fecha: "2025-02-12"
  },
  {
    tipoSolicitud: "CAMBIO_GRUPO",
    grupoProblemaId: "GRP-003",
    materiaProblemaAcronimo: "FIS2",
    grupoDestinoId: "GRP-004",
    materiaDestinoAcronimo: "FIS2",
    observaciones: "Solicito cambio de grupo 3 al grupo 4 por disponibilidad de horario",
    estado: "Remitida",
    respuesta: "Su solicitud fue remitida al departamento académico.",
    fecha: "2025-02-15"
  },
  {
    tipoSolicitud: "HOMOLOGACION",
    grupoProblemaId: "",
    materiaProblemaAcronimo: "HOM202",
    grupoDestinoId: "",
    materiaDestinoAcronimo: "",
    observaciones: "Solicito homologación de materia cursada en universidad extranjera",
    estado: "Pendiente",
    respuesta: "Por favor adjunte el certificado de notas.",
    fecha: "2025-02-18"
  }
];

/**
 * Validación para formulario de solicitudes
 */
const validateSolicitud = (formData) => {
  const errors = {};

  // Validar tipo de solicitud
  if (isEmpty(formData.tipoSolicitud)) {
    errors.tipoSolicitud = 'Debe seleccionar un tipo de solicitud';
  }

  // Validar materia problema acrónimo
  if (isEmpty(formData.materiaProblemaAcronimo)) {
    errors.materiaProblemaAcronimo = 'El acrónimo de la materia es obligatorio';
  } else if (!hasMinLength(formData.materiaProblemaAcronimo, 2)) {
    errors.materiaProblemaAcronimo = 'El acrónimo debe tener al menos 2 caracteres';
  }

  // Validar observaciones
  if (isEmpty(formData.observaciones)) {
    errors.observaciones = 'Debe escribir las observaciones de su solicitud';
  } else if (!hasMinLength(formData.observaciones, 10)) {
    errors.observaciones = 'Las observaciones deben tener al menos 10 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

function Requests() {
  const [tipoSolicitud, setTipoSolicitud] = useState("");
  const [grupo, setGrupo] = useState("");
  const [catalogo, setCatalogo] = useState("");
  const [solicitud, setSolicitud] = useState("");
  const [solicitudModalOpen, setSolicitudModalOpen] = useState(false);
  const [solicitudTemp, setSolicitudTemp] = useState("");
  const [periodo, setPeriodo] = useState(periodos[0]);
  const [historial, setHistorial] = useState(historialEjemplo);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const handleEnviar = () => {
    // Validar formulario
    const formData = {
      tipoSolicitud,
      materiaProblemaAcronimo,
      observaciones
    };

    const validation = validateSolicitud(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setAlert({
        type: 'error',
        message: 'Por favor complete todos los campos obligatorios correctamente'
      });
      return;
    }

    // Si la validación es exitosa, crear solicitud
    setHistorial([
      ...historial,
      {
        tipoSolicitud,
        grupoProblemaId,
        materiaProblemaAcronimo,
        grupoDestinoId,
        materiaDestinoAcronimo,
        observaciones,
        estado: "Pendiente",
        respuesta: "En revisión.",
        fecha: new Date().toISOString().slice(0, 10)
      }
    ]);

    // Limpiar formulario y errores
    setTipoSolicitud("");
    setGrupoProblemaId("");
    setMateriaProblemaAcronimo("");
    setGrupoDestinoId("");
    setMateriaDestinoAcronimo("");
    setObservaciones("");
    setErrors({});

    // Mostrar mensaje de éxito
    setAlert({
      type: 'success',
      message: '✓ Solicitud enviada exitosamente'
    });

    // Auto-cerrar alerta después de 3 segundos
    setTimeout(() => setAlert(null), 3000);
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