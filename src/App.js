import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/login/Login';
import SchedulePage from "./pages/schedule/Schedule";
import TrafficLightPage from "./pages/traffic_light/traffic_light";
import UserPage from "./pages/user/User";
import RequestsPage from "./pages/requests/requests";
import HomePage from "./pages/home/home"; // Importa la página principal (dashboard)
// Nuevas páginas con componentes refactorizados
import EstudiantesPage from './pages/EstudiantesPage';
import GruposEstudiantePage from './pages/GruposEstudiantePage';

function App() {
  const [user, setUser] = useState({
    nombreCompleto: "Anderson Fabián García Nieto",
    correo: "anderson.garcia-n@mail.escuelaing.edu.co",
    rol: "Estudiante",
    programa: "Ingeniería de Sistemas"
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<HomePage />} /> {/* Dashboard con resumen */}
        <Route path="/horario" element={<SchedulePage />} />
        <Route path="/semaforo" element={<TrafficLightPage />} />
        <Route path="/usuario" element={<UserPage user={user} />} />
        <Route path="/solicitudes" element={<RequestsPage />} />
        {/* Nuevas rutas con componentes refactorizados */}
        <Route path="/estudiantes-demo" element={<EstudiantesPage />} />
        <Route path="/grupos" element={<GruposEstudiantePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
