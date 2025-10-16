import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Filters from "../components/student/Filters";
import StudentList from "../components/student/StudentList";
import StudentDetail from "../components/student/StudentDetail";

/**
 * Página de gestión de estudiantes (ejemplo para admin)
 * Esta página demuestra cómo usar los componentes refactorizados
 */
const EstudiantesPage = () => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemestre, setFilterSemestre] = useState("");
  const [filterEstado, setFilterEstado] = useState("");

  // Datos mock de estudiantes (en producción vendría de API)
  const estudiantes = [
    {
      id: 1,
      codigo: "2021001234",
      nombre: "Ana María González Rodríguez",
      carrera: "Ingeniería de Sistemas",
      semestre: 6,
      estado: "ACTIVO",
      promedio: 4.2,
      creditos: 120,
      materiasActuales: 5,
      riesgoAcademico: false,
      telefono: "3001234567",
      email: "ana.gonzalez@estudiante.edu.co",
    },
    {
      id: 2,
      codigo: "2020001235",
      nombre: "Carlos Eduardo Ruiz Martínez",
      carrera: "Ingeniería de Sistemas",
      semestre: 8,
      estado: "ACTIVO",
      promedio: 3.8,
      creditos: 140,
      materiasActuales: 4,
      riesgoAcademico: false,
      telefono: "3007654321",
      email: "carlos.ruiz@estudiante.edu.co",
    },
    {
      id: 3,
      codigo: "2021001236",
      nombre: "Diana Patricia López Sánchez",
      carrera: "Ingeniería de Sistemas",
      semestre: 4,
      estado: "ACTIVO",
      promedio: 3.1,
      creditos: 80,
      materiasActuales: 6,
      riesgoAcademico: true,
      telefono: "3009876543",
      email: "diana.lopez@estudiante.edu.co",
    },
  ];

  // Menú items para admin
  const menuItems = [
    { path: "/dashboard", icon: "home", label: "INICIO" },
    { path: "/solicitudes", icon: "description", label: "SOLICITUDES" },
    { path: "/semaforo", icon: "traffic", label: "SEMÁFORO" },
    { path: "/estudiantes", icon: "people", label: "ESTUDIANTES" },
    { path: "/grupos-materias", icon: "class", label: "GRUPOS Y MATERIAS" },
    {
      path: "/configuracion",
      icon: "settings",
      label: "CONFIGURACIÓN ACADÉMICA",
    },
  ];

  const handleLogout = () => {
    // Lógica de logout (limpiar auth, etc.)
    console.log("Logout");
  };

  const handleProfileClick = () => {
    console.log("Perfil clicked");
  };

  // Filtrar estudiantes
  const filteredStudents = estudiantes.filter((student) => {
    const matchSemestre =
      filterSemestre === "" || student.semestre.toString() === filterSemestre;
    const matchEstado = filterEstado === "" || student.estado === filterEstado;
    const matchSearch =
      searchTerm === "" ||
      student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.codigo.includes(searchTerm);
    return matchSemestre && matchEstado && matchSearch;
  });

  return (
    <MainLayout
      menuItems={menuItems}
      onLogout={handleLogout}
      userName="Decana - Claudia Santiago"
      onProfileClick={handleProfileClick}
    >
      <div style={{ maxWidth: "1400px", width: "100%" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "8px" }}>
            Gestión de Estudiantes
          </h1>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>
            Facultad de Ingeniería - Programa de Ingeniería de Sistemas
          </p>
        </div>

        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterSemestre={filterSemestre}
          onSemestreChange={setFilterSemestre}
          filterEstado={filterEstado}
          onEstadoChange={setFilterEstado}
        />

        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <StudentList
            students={filteredStudents}
            selectedStudent={selectedStudent}
            onStudentSelect={setSelectedStudent}
          />
          <StudentDetail
            student={selectedStudent}
            onViewSemaforo={() => navigate("/semaforo")}
            onViewHorario={() => navigate("/horario")}
            onEdit={() => console.log("Editar estudiante")}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default EstudiantesPage;
