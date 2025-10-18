import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import DataTable from "../../components/ui/DataTable";
import "../../styles/Groups.css";

const userAdmin = {
  nombreCompleto: "Nombre Admin",
  correo: "admin@escuelaing.edu.co",
  rol: "Administrador",
  opcionesMenu: [
    { nombre: "INICIO", ruta: "/admin", icono: "home" },
    { nombre: "HORARIO", ruta: "/admin/horario", icono: "calendar_today" },
    { nombre: "SEMÁFORO", ruta: "/admin/semaforo", icono: "traffic" },
    { nombre: "SOLICITUDES", ruta: "/admin/solicitudes", icono: "bookmark" },
    { nombre: "ESTUDIANTES", ruta: "/admin/estudiantes", icono: "groups" },
    { nombre: "GRUPOS Y MATERIAS", ruta: "/admin/grupos", icono: "menu_book" },
    { nombre: "REPORTES Y ESTADÍSTICAS", ruta: "/admin/estadisticas", icono: "bar_chart" },
    { nombre: "CONFIGURACIÓN Y PERIODOS", ruta: "/admin/configuracion", icono: "settings" }
  ]
};

const materias = [
  { id: 1, nombre: "Arquitecturas de Software", semestre: 6 },
  { id: 2, nombre: "Desarrollo y Operaciones Software", semestre: 5 },
  { id: 3, nombre: "Teoría de la Programación", semestre: 4 },
  { id: 4, nombre: "Inteligencia Artificial", semestre: 7 },
  { id: 5, nombre: "Bases de Datos Avanzadas", semestre: 5 }
];

const gruposPorMateria = {
  1: [
    { id: "1A", grupo: "A", docente: "Dr. Carlos Mendoza", capacidadActual: 28, cupos: 7 },
    { id: "1B", grupo: "B", docente: "Mg. Ana Ruiz", capacidadActual: 30, cupos: 5 },
    { id: "1C", grupo: "C", docente: "Dr. Pedro García", capacidadActual: 22, cupos: 13 }
  ],
  2: [
    { id: "2A", grupo: "A", docente: "Dr. Roberto Díaz", capacidadActual: 30, cupos: 5 },
    { id: "2B", grupo: "B", docente: "Mg. Sofía Torres", capacidadActual: 28, cupos: 7 }
  ],
  3: [
    { id: "3A", grupo: "A", docente: "Mg. Andrés Morales", capacidadActual: 20, cupos: 10 },
    { id: "3B", grupo: "B", docente: "Dr. Patricia Jiménez", capacidadActual: 25, cupos: 5 }
  ]
};

export default function GruposMateriasAdministrador() {
  const [selectedMateria, setSelectedMateria] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const materiaNombre = selectedMateria 
    ? materias.find(m => m.id === parseInt(selectedMateria))?.nombre 
    : "";

  const gruposActuales = selectedMateria ? gruposPorMateria[selectedMateria] || [] : [];

  const handleSelectMateria = (materiaId) => {
    setSelectedMateria(materiaId);
    setShowDropdown(false);
  };

  const columnasGruposActuales = [
    { key: "grupo", header: "Grupo" },
    { key: "docente", header: "Docente" },
    { key: "capacidadActual", header: "Capacidad actual" },
    { key: "cupos", header: "Cupos" }
  ];

  const columnasGruposDisponibles = [
    { key: "grupo", header: "Grupo" },
    { key: "docente", header: "Docente" },
    { key: "cupos", header: "Cupos" },
    { 
      key: "horario", 
      header: "Horario",
      render: () => "L-M-V 8:30-10:00"
    }
  ];

  return (
    <Dashboard user={userAdmin}>
      <div style={{ padding: "30px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "30px" }}>
          Gestión de grupos y materias
        </h1>

        <div style={{ position: "relative", marginBottom: "30px", maxWidth: "500px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "10px", fontSize: "14px" }}>
            MATERIAS
          </label>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              backgroundColor: "white",
              border: "2px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            <span>{materiaNombre || "Seleccionar materia"}</span>
            <span className="material-icons" style={{ color: "#666" }}>
              {showDropdown ? "expand_less" : "expand_more"}
            </span>
          </div>
          
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "white",
                border: "2px solid #ddd",
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                zIndex: 100,
                maxHeight: "300px",
                overflowY: "auto"
              }}
            >
              {materias.map((materia) => (
                <div
                  key={materia.id}
                  onClick={() => handleSelectMateria(materia.id.toString())}
                  style={{
                    padding: "12px 20px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee"
                  }}
                  className="schedule-dropdown-item"
                >
                  {materia.nombre} (Semestre {materia.semestre})
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedMateria && (
          <>
            <div style={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "30px",
              border: "1px solid #ddd"
            }}>
              <DataTable
                columns={columnasGruposActuales}
                data={gruposActuales}
              />
            </div>

            <div style={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #ddd"
            }}>
              <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
                GRUPOS DISPONIBLES
              </h2>
              <DataTable
                columns={columnasGruposDisponibles}
                data={gruposActuales}
              />
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "30px", justifyContent: "center" }}>
              <button style={{
                padding: "12px 30px",
                backgroundColor: "white",
                border: "2px solid #333",
                borderRadius: "25px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "14px"
              }}>
                Registrar materias
              </button>
              <button style={{
                padding: "12px 30px",
                backgroundColor: "white",
                border: "2px solid #333",
                borderRadius: "25px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "14px"
              }}>
                Consultar grupos
              </button>
              <button style={{
                padding: "12px 30px",
                backgroundColor: "white",
                border: "2px solid #333",
                borderRadius: "25px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "14px"
              }}>
                Registrar grupos
              </button>
              <button style={{
                padding: "12px 30px",
                backgroundColor: "white",
                border: "2px solid #333",
                borderRadius: "25px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "14px"
              }}>
                Asignar docentes
              </button>
            </div>
          </>
        )}

        {!selectedMateria && (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#666"
          }}>
            <span className="material-icons" style={{
              fontSize: "4rem",
              color: "#ddd",
              marginBottom: "20px"
            }}>
              school
            </span>
            <h3 style={{
              fontSize: "1.5rem",
              marginBottom: "10px",
              color: "#333"
            }}>
              Selecciona una materia
            </h3>
            <p style={{
              fontSize: "1.1rem",
              color: "#666"
            }}>
              Elige una materia del menú desplegable para ver y gestionar sus grupos
            </p>
          </div>
        )}
      </div>
    </Dashboard>
  );
}
