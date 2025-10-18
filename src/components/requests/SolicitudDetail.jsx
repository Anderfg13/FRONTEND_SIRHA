import React, { useState } from "react";

/**
 * Componente para mostrar detalles de una solicitud
 * @param {Object} props
 * @param {Object} props.solicitud - Datos de la solicitud
 * @param {Function} props.onAprobar - Callback para aprobar
 * @param {Function} props.onRechazar - Callback para rechazar
 * @param {Function} props.onSolicitarInfo - Callback para solicitar info
 * @param {Function} props.onRemitir - Callback para remitir
 */
const SolicitudDetail = ({
  solicitud,
  onAprobar,
  onRechazar,
  onSolicitarInfo,
  onRemitir
}) => {
  const [comentario, setComentario] = useState("");

  if (!solicitud) {
    return (
      <div style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #ddd",
        minHeight: "600px"
      }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
          DETALLES DE LA SOLICITUD
        </h2>
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
          <p>Selecciona una solicitud para ver los detalles</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "#f5f5f5",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #ddd",
      minHeight: "600px"
    }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
        DETALLES DE LA SOLICITUD
      </h2>

      {/* Información de la solicitud */}
      <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
        <div style={{ marginBottom: "10px" }}>
          <strong>Código de la solicitud:</strong> {solicitud.id}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Materia actual:</strong> {solicitud.materiaActual}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Materia solicitada:</strong> {solicitud.materiaSolicitada}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Estado:</strong> {solicitud.estado}
        </div>
        <div>
          <strong>Fecha de creación:</strong> {solicitud.fechaCreacion}
        </div>
      </div>

      {/* Datos del estudiante */}
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px", marginTop: "20px" }}>
        DATOS DEL ESTUDIANTE
      </h3>
      <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
        <div style={{ marginBottom: "10px" }}>
          <strong>ID del estudiante:</strong> {solicitud.codigo}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Nombre del estudiante:</strong> {solicitud.estudiante}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>Semestre:</strong> {solicitud.semestre}
        </div>
        <div>
          <strong>Carrera:</strong> {solicitud.carrera}
        </div>
      </div>

      {/* Horario actual del estudiante */}
      <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px", marginTop: "20px" }}>
        HORARIO ACTUAL DEL ESTUDIANTE
      </h3>
      <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <table style={{ width: "100%", fontSize: "12px", textAlign: "center" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Franja</th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Lunes</th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Martes</th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Miércoles</th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Jueves</th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Viernes</th>
              <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>Sábado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", fontSize: "11px" }}>07:00-08:30</td>
              <td style={{ padding: "8px" }}></td>
              <td style={{ padding: "8px" }}></td>
              <td style={{ padding: "8px" }}></td>
              <td style={{ padding: "8px" }}></td>
              <td style={{ padding: "8px" }}></td>
              <td style={{ padding: "8px" }}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Botones de acción */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
        <button
          onClick={() => onAprobar && onAprobar(solicitud)}
          style={{
            padding: "12px",
            backgroundColor: "#90EE90",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Aprobar
        </button>
        <button
          onClick={() => onRechazar && onRechazar(solicitud)}
          style={{
            padding: "12px",
            backgroundColor: "#FFB6C6",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Rechazar
        </button>
      </div>

      {/* Comentarios */}
      <div>
        <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
          Comentarios:
        </label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            resize: "vertical",
            marginBottom: "10px"
          }}
          placeholder="Agregar comentarios..."
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <button
          onClick={() => onSolicitarInfo && onSolicitarInfo(solicitud)}
          style={{
            padding: "12px",
            backgroundColor: "#ADD8E6",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "13px"
          }}
        >
          Solicitar más información
        </button>
        <button
          onClick={() => onRemitir && onRemitir(solicitud)}
          style={{
            padding: "12px",
            backgroundColor: "#FFE4B5",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "13px"
          }}
        >
          Remitir con Decanatura
        </button>
      </div>
    </div>
  );
};

export default SolicitudDetail;
