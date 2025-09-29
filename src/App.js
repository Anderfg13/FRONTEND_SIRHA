import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/login/Login';
import Dashboard from "./pages/dashboard/Dashboard"; // Crea este componente

function App() {
  //En esta parte se agrega para lo del front de bienvenido tal persona y todo eso al inicio.
  // Simulación: datos del usuario después del login
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
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
