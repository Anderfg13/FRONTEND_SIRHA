import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css';
import { AuthProvider } from './services/AuthContext';
import LoginPage from './pages/estudiante/LoginPage';
import SchedulePage from "./pages/estudiante/SchedulePage";
import TrafficLightPage from "./pages/estudiante/TrafficLightPage";
import UserPage from "./pages/UserPage";
import RequestsPage from "./pages/estudiante/RequestsPage";
import HomePage from "./pages/estudiante/HomePage";
import DecanaturaPage from './pages/decanatura/DecanaturaPage';
import AdminPage from './pages/admin/AdminPage';
import ConfiguracionAdministrador from './pages/admin/ConfiguracionAdministrador';
import EstudiantesAdministrador from './pages/admin/EstudiantesAdministrador';
import GruposMateriasAdministrador from './pages/admin/GruposMateriasAdministrador';
import HorarioAdministrador from './pages/admin/HorarioAdministrador';
import ReportesAdministrador from './pages/admin/ReportesAdministrador';
import SolicitudesAdministrador from './pages/admin/SolicitudesAdministrador';
import SolicitudDecanatura from './pages/decanatura/SolicitudDecanatura';
import SemaforoDecanatura from './pages/decanatura/SemaforoDecanatura';
import EstudiantesDecanatura from './pages/decanatura/EstudiantesDecanatura';
import GruposMateriaDecanatura from './pages/decanatura/GruposMateriaDecanatura';
import ConfiguracionDecanatura from './pages/decanatura/ConfiguracionDecanatura';
import DashboardEstudiantePage from './pages/estudiante/DashboardEstudiantePage';
import EstudiantesPage from './pages/estudiante/EstudiantesPage';
import GruposEstudiantePage from './pages/estudiante/GruposEstudiantePage';

function App() {
  const [user, setUser] = useState({
    nombreCompleto: "Anderson Fabián García Nieto",
    correo: "anderson.garcia-n@mail.escuelaing.edu.co",
    rol: "Estudiante",
    programa: "Ingeniería de Sistemas"
  });

  const userDecanatura = {
    nombreCompleto: "Nombre Decano",
    correo: "decanatura@escuelaing.edu.co",
    rol: "Decano",
    programa: "Ingeniería de Sistemas",
    opcionesMenu: [
      { nombre: "INICIO", ruta: "/decanatura", icono: "home" },
      { nombre: "SOLICITUDES", ruta: "/decanatura/solicitudes", icono: "bookmark" },
      { nombre: "SEMÁFORO", ruta: "/decanatura/semaforo", icono: "traffic" },
      { nombre: "ESTUDIANTES", ruta: "/decanatura/estudiantes", icono: "groups" },
      { nombre: "GRUPOS Y MATERIAS", ruta: "/decanatura/grupos", icono: "menu_book" },
      { nombre: "CONFIGURACIÓN ACADÉMICA", ruta: "/decanatura/configuracion", icono: "settings" }
    ]
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<HomePage />} /> {/* Dashboard con resumen */}
          <Route path="/dashboard-estudiante" element={<DashboardEstudiantePage />} /> {/* Nuevo Dashboard estudiante */}
          <Route path="/horario" element={<SchedulePage />} />
          <Route path="/semaforo" element={<TrafficLightPage />} />
          <Route path="/usuario" element={<UserPage user={user} />} />
          <Route path="/solicitudes" element={<RequestsPage />} />
          <Route path="/decanatura" element={<DecanaturaPage />} />
          <Route path="/decanatura/solicitudes" element={<SolicitudDecanatura user={userDecanatura} />} />
          <Route path="/decanatura/semaforo" element={<SemaforoDecanatura user={userDecanatura} />} />
          <Route path="/decanatura/estudiantes" element={<EstudiantesDecanatura user={userDecanatura} />} />
          <Route path="/decanatura/grupos" element={<GruposMateriaDecanatura user={userDecanatura} />} />
          <Route path="/decanatura/configuracion" element={<ConfiguracionDecanatura user={userDecanatura} />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/horario" element={<HorarioAdministrador />} />
          <Route path="/admin/semaforo" element={<ReportesAdministrador />} />
          <Route path="/admin/solicitudes" element={<SolicitudesAdministrador />} />
          <Route path="/admin/estudiantes" element={<EstudiantesAdministrador />} />
          <Route path="/admin/grupos" element={<GruposMateriasAdministrador />} />
          <Route path="/admin/estadisticas" element={<ReportesAdministrador />} />
          <Route path="/admin/configuracion" element={<ConfiguracionAdministrador />} />
          <Route path="/estudiantes-demo" element={<EstudiantesPage />} />
          <Route path="/grupos" element={<GruposEstudiantePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
