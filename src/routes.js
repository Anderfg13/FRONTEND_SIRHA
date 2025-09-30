import React from "react";
import { Routes, Route } from "react-router-dom";

// Páginas
import LoginPage from "./pages/LoginPage";  // 👈 fuera de /decano
import DecanoDashboard from "./pages/decano/DecanoDashboard";
import Inicio from "./pages/decano/Inicio";
import Horario from "./pages/decano/Horario";
import Semaforo from "./pages/decano/Semaforo";
import Solicitudes from "./pages/decano/Solicitudes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginPage />} />

      {/* Sección Decano con subrutas */}
      <Route path="/decano" element={<DecanoDashboard />}>
        <Route index element={<Inicio />} />        {/* /decano */}
        <Route path="horario" element={<Horario />} />      {/* /decano/horario */}
        <Route path="semaforo" element={<Semaforo />} />    {/* /decano/semaforo */}
        <Route path="solicitudes" element={<Solicitudes />} /> {/* /decano/solicitudes */}
      </Route>

      {/* Si no existe la ruta */}
      <Route path="*" element={<div>404 - Página no encontrada</div>} />
    </Routes>
  );
}
