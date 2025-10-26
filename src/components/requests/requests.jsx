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
  const [grupoProblemaId, setGrupoProblemaId] = useState("");
  const [materiaProblemaAcronimo, setMateriaProblemaAcronimo] = useState("");
  const [grupoDestinoId, setGrupoDestinoId] = useState("");
  const [materiaDestinoAcronimo, setMateriaDestinoAcronimo] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [solicitudModalOpen, setSolicitudModalOpen] = useState(false);
  const [periodo, setPeriodo] = useState(periodos[0]);
  const [historial, setHistorial] = useState(historialEjemplo);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  // Función para limpiar errores cuando el usuario modifica un campo
  const clearFieldError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
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

  return (
    <div className="requests-root">
      <h1 className="requests-title">Solicitudes</h1>
      
      {/* Mostrar alerta si existe */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Mostrar resumen de errores si existen */}
      <ValidationSummary errors={errors} />

      <div className="requests-content">
        <form className="requests-form">
          <table className="requests-table">
            <tbody>
              <tr>
                <td className="requests-label"><b>Tipo Solicitud:</b></td>
                <td>
                  <select
                    value={tipoSolicitud}
                    onChange={e => {
                      setTipoSolicitud(e.target.value);
                      clearFieldError('tipoSolicitud');
                    }}
                    className={errors.tipoSolicitud ? 'error' : ''}
                  >
                    <option value="">Seleccione...</option>
                    {tiposSolicitud.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage error={errors.tipoSolicitud} />
                </td>
                <td className="requests-label"><b>Grupo Problema:</b></td>
                <td>
                  <input
                    type="text"
                    value={grupoProblemaId}
                    onChange={e => setGrupoProblemaId(e.target.value)}
                    placeholder="Ej: GRP-001"
                  />
                </td>
              </tr>
              <tr>
                <td className="requests-label"><b>Materia Problema:</b></td>
                <td>
                  <input
                    type="text"
                    value={materiaProblemaAcronimo}
                    onChange={e => {
                      setMateriaProblemaAcronimo(e.target.value);
                      clearFieldError('materiaProblemaAcronimo');
                    }}
                    placeholder="Ej: PRI2IS"
                    className={errors.materiaProblemaAcronimo ? 'error' : ''}
                  />
                  <ErrorMessage error={errors.materiaProblemaAcronimo} />
                </td>
                <td className="requests-label"><b>Grupo Destino:</b></td>
                <td>
                  <input
                    type="text"
                    value={grupoDestinoId}
                    onChange={e => setGrupoDestinoId(e.target.value)}
                    placeholder="Ej: GRP-002"
                  />
                </td>
              </tr>
              <tr>
                <td className="requests-label"><b>Materia Destino:</b></td>
                <td>
                  <input
                    type="text"
                    value={materiaDestinoAcronimo}
                    onChange={e => setMateriaDestinoAcronimo(e.target.value)}
                    placeholder="Ej: PRI2IS"
                  />
                </td>
                <td className="requests-label"><b>Observaciones:</b></td>
                <td>
                  <button
                    type="button"
                    className="requests-solicitud-btn"
                    onClick={() => setSolicitudModalOpen(true)}
                  >
                    {observaciones ? "Modificar Observaciones" : "Escribir Observaciones"}
                  </button>
                  {observaciones && (
                    <div className="requests-solicitud-preview">{observaciones}</div>
                  )}
                  <ErrorMessage error={errors.observaciones} />
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

        {/* Modal para observaciones */}
        {solicitudModalOpen && (
          <div className="requests-modal-overlay">
            <div className="requests-modal-small">
              <h3 className="requests-modal-title">Observaciones de la Solicitud</h3>
              <textarea
                className="requests-modal-textarea"
                value={observaciones}
                onChange={e => {
                  setObservaciones(e.target.value);
                  clearFieldError('observaciones');
                }}
                rows={6}
                placeholder="Escribe las observaciones de tu solicitud aquí... (mínimo 10 caracteres)"
              />
              <div className="requests-modal-actions">
                <button
                  className="requests-btn"
                  type="button"
                  onClick={() => setSolicitudModalOpen(false)}
                >
                  Guardar
                </button>
                <button
                  className="requests-btn"
                  type="button"
                  style={{ background: '#bbb', color: '#222', marginLeft: 8 }}
                  onClick={() => setSolicitudModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Historial de solicitudes */}
        <div className="requests-historial-box">
          <div className="requests-historial-header">
            <span className="requests-historial-title">Historial Solicitudes</span>
            <select
              className="requests-historial-periodo"
              value={periodo}
              onChange={e => setPeriodo(e.target.value)}
            >
              {periodos.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="requests-historial-list">
            {historial.map((item) => {
              const tipoObj = tiposSolicitud.find(t => t.value === item.tipoSolicitud);
              const tipoLabel = tipoObj ? tipoObj.label : String(item.tipoSolicitud);
              return (
                <div key={`${item.fecha}-${item.tipoSolicitud}-${item.materiaProblemaAcronimo}`} className="requests-historial-item">
                  <div><b>Tipo Solicitud:</b> {tipoLabel}</div>
                  <div><b>Materia:</b> {item.materiaProblemaAcronimo}</div>
                  <div><b>Estado:</b> {item.estado}</div>
                  <div><b>Fecha:</b> {item.fecha}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Requests;