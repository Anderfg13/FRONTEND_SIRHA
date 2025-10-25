import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import DataTable from "../../components/ui/DataTable";

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

const historialCambios = [
  { id: 1, codigo: "2020102050", nombre: "Anderson García", materia: "Arquitecturas SW", cambio: "Cambio de grupo A a B", fecha: "2025-10-15" },
  { id: 2, codigo: "2019101234", nombre: "María Rodríguez", materia: "Cálculo Integral", cambio: "Cambio de horario", fecha: "2025-10-14" },
  { id: 3, codigo: "2021105678", nombre: "Juan Martínez", materia: "Física II", cambio: "Cambio de docente", fecha: "2025-10-13" }
];

const gruposSolicitados = [
  { id: 1, grupo: "A", docente: "Dr. Carlos Mendoza", materia: "Arquitecturas SW", solicitudes: 45 },
  { id: 2, grupo: "B", docente: "Mg. Ana Ruiz", materia: "DevOps", solicitudes: 38 },
  { id: 3, grupo: "C", docente: "Dr. Pedro García", materia: "IA Avanzada", solicitudes: 32 }
];

const avanceSemestres = [
  { semestre: "Semestre 1", aprobado: 85, reprobado: 10, pendiente: 5 },
  { semestre: "Semestre 2", aprobado: 78, reprobado: 15, pendiente: 7 },
  { semestre: "Semestre 3", aprobado: 72, reprobado: 18, pendiente: 10 },
  { semestre: "Semestre 4", aprobado: 68, reprobado: 20, pendiente: 12 },
  { semestre: "Semestre 5", aprobado: 60, reprobado: 22, pendiente: 18 },
  { semestre: "Semestre 6", aprobado: 55, reprobado: 25, pendiente: 20 },
  { semestre: "Semestre 7", aprobado: 48, reprobado: 28, pendiente: 24 },
  { semestre: "Semestre 8", aprobado: 40, reprobado: 30, pendiente: 30 }
];

export default function ReportesAdministrador() {
  const columnasHistorial = [
    { key: "codigo", header: "Código" },
    { key: "nombre", header: "Nombre" },
    { key: "materia", header: "Materia" },
    { key: "cambio", header: "Cambio" },
    { key: "fecha", header: "Fecha" }
  ];

  const columnasGrupos = [
    { key: "grupo", header: "Grupo" },
    { key: "docente", header: "Docente" },
    { key: "materia", header: "Materia" },
    { key: "solicitudes", header: "Solicitudes" }
  ];

  return (
    <Dashboard user={userAdmin}>
      <div style={{ padding: "30px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "30px" }}>
          Reportes y estadísticas
        </h1>

        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          border: "1px solid #ddd"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
            HISTORIAL DE CAMBIOS POR ESTUDIANTE
          </h2>
          <DataTable columns={columnasHistorial} data={historialCambios} />
        </div>

        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          border: "1px solid #ddd"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
            ESTADÍSTICAS SOLICITUDES
          </h2>
          <div style={{ display: "flex", gap: "40px", justifyContent: "center", backgroundColor: "white", padding: "30px", borderRadius: "8px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>Tasa de rechazo</div>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#c41e3a" }}>15%</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>Tasa de aprobación</div>
              <div style={{ fontSize: "32px", fontWeight: "bold", color: "#4CAF50" }}>85%</div>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px",
          border: "1px solid #ddd"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
            GRUPOS MÁS SOLICITADOS
          </h2>
          <DataTable columns={columnasGrupos} data={gruposSolicitados} />
        </div>

        <div style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #ddd"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
            AVANCE EN PLANES DE ESTUDIO
          </h2>
          <div style={{ display: "flex", gap: "30px", backgroundColor: "white", padding: "30px", borderRadius: "8px" }}>
            <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative", width: "250px", height: "250px" }}>
                <svg width="250" height="250" viewBox="0 0 250 250">
                  <circle cx="125" cy="125" r="100" fill="transparent" stroke="#90EE90" strokeWidth="80" strokeDasharray="377 628" transform="rotate(-90 125 125)" />
                  <circle cx="125" cy="125" r="100" fill="transparent" stroke="#FFE66D" strokeWidth="80" strokeDasharray="157 628" strokeDashoffset="-377" transform="rotate(-90 125 125)" />
                  <circle cx="125" cy="125" r="100" fill="transparent" stroke="#FFB6C6" strokeWidth="80" strokeDasharray="94 628" strokeDashoffset="-534" transform="rotate(-90 125 125)" />
                </svg>
              </div>
            </div>

            <div style={{ flex: 1.5 }}>
              <div style={{ display: "flex", gap: "8px", height: "300px", alignItems: "flex-end" }}>
                {avanceSemestres.map((sem, index) => (
                  <div key={index} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ 
                      width: "100%", 
                      display: "flex", 
                      flexDirection: "column-reverse",
                      height: "250px",
                      border: "1px solid #ddd",
                      borderRadius: "4px 4px 0 0"
                    }}>
                      <div style={{ 
                        height: `+'${sem.aprobado}%'+`, 
                        backgroundColor: "#90EE90",
                        borderRadius: "0 0 4px 4px"
                      }}></div>
                      <div style={{ 
                        height: `+'${sem.pendiente}%'+`, 
                        backgroundColor: "#FFE66D"
                      }}></div>
                      <div style={{ 
                        height: `+'${sem.reprobado}%'+`, 
                        backgroundColor: "#FFB6C6",
                        borderRadius: "4px 4px 0 0"
                      }}></div>
                    </div>
                    <div style={{ 
                      fontSize: "10px", 
                      marginTop: "8px",
                      transform: "rotate(-45deg)",
                      transformOrigin: "center",
                      width: "60px",
                      textAlign: "left"
                    }}>
                      {sem.semestre.replace("Semestre ", "S")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
