import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import DataTable from "../../components/ui/DataTable";
import SolicitudDetail from "../../components/requests/SolicitudDetail";
import "../../styles/Requests.css";

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

const solicitudesMock = [
  {
    id: "SOL-001",
    codigo: "2020102050",
    estudiante: "Anderson Fabián García Nieto",
    tipoSolicitud: "INSCRIPCION_GRUPO",
    grupoProblemaId: "GRP-001",
    materiaProblemaAcronimo: "ARSW",
    grupoDestinoId: "GRP-002",
    materiaDestinoAcronimo: "ARSW",
    observaciones: "Solicito inscripción en el grupo 2 por conflicto de horario con Desarrollo y Operaciones Software",
    estado: "Pendiente",
    fechaCreacion: "2025-10-15",
    semestre: "7",
    carrera: "Ingeniería de Sistemas"
  },
  {
    id: "SOL-002",
    codigo: "2019101234",
    estudiante: "María Camila Rodríguez López",
    tipoSolicitud: "CAMBIO_GRUPO",
    grupoProblemaId: "GRP-003",
    materiaProblemaAcronimo: "CAIN",
    grupoDestinoId: "GRP-004",
    materiaDestinoAcronimo: "CAIN",
    observaciones: "Solicito cambio de grupo por disponibilidad de horario y mejor rendimiento académico",
    estado: "Aprobado",
    fechaCreacion: "2025-10-14",
    semestre: "3",
    carrera: "Ingeniería de Sistemas"
  },
  {
    id: "SOL-003",
    codigo: "2021105678",
    estudiante: "Juan Carlos Martínez Gómez",
    tipoSolicitud: "CANCELAR_CLASE",
    grupoProblemaId: "GRP-005",
    materiaProblemaAcronimo: "FIS2",
    grupoDestinoId: "",
    materiaDestinoAcronimo: "",
    observaciones: "Necesito cancelar esta materia por motivos de salud y carga académica excesiva",
    estado: "Rechazado",
    fechaCreacion: "2025-10-13",
    semestre: "5",
    carrera: "Ingeniería de Sistemas"
  }
];

export default function SolicitudesAdministrador() {
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [filterEstado, setFilterEstado] = useState("");
  const [filterFecha, setFilterFecha] = useState("");
  const [comentario, setComentario] = useState("");

  const solicitudesFiltradas = solicitudesMock.filter(sol => {
    const matchEstado = !filterEstado || sol.estado === filterEstado;
    const matchFecha = !filterFecha || sol.fechaCreacion === filterFecha;
    return matchEstado && matchFecha;
  });

  const columnasSolicitudes = [
    { key: "codigo", header: "Código" },
    { key: "estudiante", header: "Nombre del estudiante" },
    { key: "materiaProblemaAcronimo", header: "Materia" }
  ];

  const handleAprobar = () => {
    alert(`Solicitud ${selectedSolicitud?.id} aprobada`);
  };

  const handleRechazar = () => {
    alert(`Solicitud ${selectedSolicitud?.id} rechazada`);
  };

  const handleSolicitarInfo = () => {
    alert(`Solicitando más información para ${selectedSolicitud?.id}`);
  };

  const handleRemitir = () => {
    alert(`Remitiendo solicitud ${selectedSolicitud?.id} a Decanatura`);
  };

  return (
    <Dashboard user={userAdmin}>
      <div style={{ padding: "30px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>
          Gestión de solicitudes
        </h1>
        <p style={{ color: "#666", marginBottom: "30px", fontSize: "14px" }}>
          Consulta y gestión de solicitudes de cambio de materia de su facultad
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
          {/* Panel izquierdo - Listado */}
          <div>
            <div style={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #ddd"
            }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
                LISTADO DE SOLICITUDES
              </h2>

              {/* Filtros */}
              <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
                <div style={{ flex: 1 }}>
                  <select
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      backgroundColor: "white"
                    }}
                  >
                    <option value="">ESTADO</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="date"
                    value={filterFecha}
                    onChange={(e) => setFilterFecha(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      backgroundColor: "white"
                    }}
                    placeholder="FECHA"
                  />
                </div>
              </div>

              {/* Tabla de solicitudes */}
              <DataTable
                columns={columnasSolicitudes}
                data={solicitudesFiltradas}
                onRowClick={setSelectedSolicitud}
                selectedRowId={selectedSolicitud?.id}
              />

              {/* Botones de generación de reportes */}
              <div style={{ marginTop: "20px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>
                  Generación de reportes
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <button style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    fontSize: "13px"
                  }}>
                    Solicitudes aprobadas
                  </button>
                  <button style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    fontSize: "13px"
                  }}>
                    Solicitudes rechazadas
                  </button>
                  <button style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    fontSize: "13px"
                  }}>
                    Solicitudes pendientes
                  </button>
                  <button style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "20px",
                    backgroundColor: "white",
                    cursor: "pointer",
                    fontSize: "13px"
                  }}>
                    Estadísticas reasignaciones
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Panel derecho - Detalles */}
          <SolicitudDetail
            solicitud={selectedSolicitud}
            comentario={comentario}
            onComentarioChange={setComentario}
            onAprobar={handleAprobar}
            onRechazar={handleRechazar}
            onSolicitarInfo={handleSolicitarInfo}
            onRemitir={handleRemitir}
          />
        </div>
      </div>
    </Dashboard>
  );
}
