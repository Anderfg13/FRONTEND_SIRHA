import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles/App.css';
import { AuthProvider } from './services/AuthContext';
import LoginPage from './pages/LoginPage';
import SchedulePage from "./pages/SchedulePage";
import TrafficLightPage from "./pages/TrafficLightPage";
import UserPage from "./pages/UserPage";
import RequestsPage from "./pages/RequestsPage";
import HomePage from "./pages/HomePage";
// Nuevas páginas con componentes refactorizados
import EstudiantesPage from './pages/EstudiantesPage';
import GruposEstudiantePage from './pages/GruposEstudiantePage';
import DashboardEstudiantePage from './pages/DashboardEstudiantePage';

function App() {
  const [user, setUser] = useState({
    nombreCompleto: "Anderson Fabián García Nieto",
    correo: "anderson.garcia-n@mail.escuelaing.edu.co",
    rol: "Estudiante",
    programa: "Ingeniería de Sistemas"
  });

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
          {/* Nuevas rutas con componentes refactorizados */}
          <Route path="/estudiantes-demo" element={<EstudiantesPage />} />
          <Route path="/grupos" element={<GruposEstudiantePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
