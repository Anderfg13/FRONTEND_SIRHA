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

// Simulación de historial con más información
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
  const [grupoProblemaId, setGrupoProblemaId] = useState("");
  const [materiaProblemaAcronimo, setMateriaProblemaAcronimo] = useState("");
  const [grupoDestinoId, setGrupoDestinoId] = useState("");
  const [materiaDestinoAcronimo, setMateriaDestinoAcronimo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [periodo, setPeriodo] = useState(periodos[0]);
  const [historial, setHistorial] = useState(historialEjemplo);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  // Estado para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  // Función para limpiar errores individuales
  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

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

      {alert && (
        <div style={{ marginBottom: "20px" }}>
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            autoClose={alert.type === 'success'}
          />
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <ValidationSummary errors={errors} />
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 10 }}>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #222", padding: 8, fontWeight: 500, verticalAlign: "top" }}>
              Tipo Solicitud: <span style={{ color: "#991b1b" }}>*</span>
            </td>
            <td style={{ border: "1px solid #222", padding: 8 }} colSpan="3">
              <select
                value={tipoSolicitud}
                onChange={e => {
                  setTipoSolicitud(e.target.value);
                  clearFieldError('tipoSolicitud');
                }}
                style={{ 
                  width: "100%", 
                  padding: 4,
                  borderColor: errors.tipoSolicitud ? "#ef4444" : "#ccc"
                }}
              >
                <option value="">Seleccione...</option>
                {tiposSolicitud.map((tipo, idx) => (
                  <option key={idx} value={tipo.value}>{tipo.label}</option>
                ))}
              </select>
              <ErrorMessage error={errors.tipoSolicitud} />
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #222", padding: 8, fontWeight: 500 }}>Grupo Problema ID:</td>
            <td style={{ border: "1px solid #222", padding: 8 }}>
              <input
                type="text"
                value={grupoProblemaId}
                onChange={e => setGrupoProblemaId(e.target.value)}
                style={{ width: "100%", padding: 4 }}
                placeholder="Ej: GRP-001"
              />
            </td>
            <td style={{ border: "1px solid #222", padding: 8, fontWeight: 500, verticalAlign: "top" }}>
              Materia Problema Acrónimo: <span style={{ color: "#991b1b" }}>*</span>
            </td>
            <td style={{ border: "1px solid #222", padding: 8 }}>
              <input
                type="text"
                value={materiaProblemaAcronimo}
                onChange={e => {
                  setMateriaProblemaAcronimo(e.target.value);
                  clearFieldError('materiaProblemaAcronimo');
                }}
                style={{ 
                  width: "100%", 
                  padding: 4,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: errors.materiaProblemaAcronimo ? "#ef4444" : "#ccc"
                }}
                placeholder="Ej: MAT101"
              />
              <ErrorMessage error={errors.materiaProblemaAcronimo} />
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #222", padding: 8, fontWeight: 500 }}>Grupo Destino ID:</td>
            <td style={{ border: "1px solid #222", padding: 8 }}>
              <input
                type="text"
                value={grupoDestinoId}
                onChange={e => setGrupoDestinoId(e.target.value)}
                style={{ width: "100%", padding: 4 }}
                placeholder="Ej: GRP-002"
              />
            </td>
            <td style={{ border: "1px solid #222", padding: 8, fontWeight: 500 }}>Materia Destino Acrónimo:</td>
            <td style={{ border: "1px solid #222", padding: 8 }}>
              <input
                type="text"
                value={materiaDestinoAcronimo}
                onChange={e => setMateriaDestinoAcronimo(e.target.value)}
                style={{ width: "100%", padding: 4 }}
                placeholder="Ej: MAT102"
              />
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #222", padding: 8, fontWeight: 500, verticalAlign: "top" }}>
              Observaciones: <span style={{ color: "#991b1b" }}>*</span>
            </td>
            <td style={{ border: "1px solid #222", padding: 8 }} colSpan="3">
              <textarea
                value={observaciones}
                onChange={e => {
                  setObservaciones(e.target.value);
                  clearFieldError('observaciones');
                }}
                style={{ 
                  width: "100%", 
                  padding: 8,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: errors.observaciones ? "#ef4444" : "#ccc",
                  minHeight: "80px",
                  resize: "vertical",
                  fontFamily: "inherit"
                }}
                placeholder="Describa las observaciones de su solicitud (mín. 10 caracteres)"
              />
              <ErrorMessage error={errors.observaciones} />
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
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onClick={handleEnviar}
          onMouseOver={(e) => e.target.style.background = "#d99898"}
          onMouseOut={(e) => e.target.style.background = "#e8a8a8"}
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
          {historial.map((item, idx) => {
            const tipoLabel = tiposSolicitud.find(t => t.value === item.tipoSolicitud)?.label || item.tipoSolicitud;
            return (
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
                <div><b>Tipo Solicitud:</b> {tipoLabel}</div>
                <div><b>Materia Problema:</b> {item.materiaProblemaAcronimo}</div>
                {item.materiaDestinoAcronimo && (
                  <div><b>Materia Destino:</b> {item.materiaDestinoAcronimo}</div>
                )}
                <div><b>Estado Solicitud:</b> {item.estado}</div>
              </div>
            );
          })}
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
            minWidth: 400,
            maxWidth: 600,
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
            <div style={{ marginBottom: 8 }}>
              <b>Tipo Solicitud:</b> {tiposSolicitud.find(t => t.value === solicitudSeleccionada.tipoSolicitud)?.label || solicitudSeleccionada.tipoSolicitud}
            </div>
            {solicitudSeleccionada.grupoProblemaId && (
              <div style={{ marginBottom: 8 }}><b>Grupo Problema ID:</b> {solicitudSeleccionada.grupoProblemaId}</div>
            )}
            <div style={{ marginBottom: 8 }}><b>Materia Problema:</b> {solicitudSeleccionada.materiaProblemaAcronimo}</div>
            {solicitudSeleccionada.grupoDestinoId && (
              <div style={{ marginBottom: 8 }}><b>Grupo Destino ID:</b> {solicitudSeleccionada.grupoDestinoId}</div>
            )}
            {solicitudSeleccionada.materiaDestinoAcronimo && (
              <div style={{ marginBottom: 8 }}><b>Materia Destino:</b> {solicitudSeleccionada.materiaDestinoAcronimo}</div>
            )}
            <div style={{ marginBottom: 8 }}><b>Observaciones:</b> {solicitudSeleccionada.observaciones}</div>
            <div style={{ marginBottom: 8 }}><b>Estado:</b> {solicitudSeleccionada.estado}</div>
            <div style={{ marginBottom: 8 }}><b>Respuesta:</b> {solicitudSeleccionada.respuesta}</div>
            <div style={{ marginBottom: 8 }}><b>Fecha:</b> {solicitudSeleccionada.fecha}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Requests;