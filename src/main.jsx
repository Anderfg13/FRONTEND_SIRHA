import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./modules/Login/components/Login";
import Dashboard from "./modules/Dashboard/components/Dashboard";
import Horario from "./modules/Horario/components/Horario"; 
import Semaforo from "./modules/Semaforo/components/Semaforo"; 
import Solicitudes from "./modules/Solicitudes/components/Solicitudes";
import Estudiantes from "./modules/Estudiantes/components/Estudiantes";
import GruposYMaterias from "./modules/GruposYMaterias/components/GruposYMaterias";
import ConfiguracionAcademica from "./modules/ConfiguracionAcademica/components/ConfiguracionAcademica";
import "./styles/index.css";
import "./styles/eci-identity.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/horario" element={<Horario />} />
        <Route path="/semaforo" element={<Semaforo />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/estudiantes" element={<Estudiantes />} />
        <Route path="/grupos-materias" element={<GruposYMaterias />} />
        <Route path="/configuracion" element={<ConfiguracionAcademica />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
