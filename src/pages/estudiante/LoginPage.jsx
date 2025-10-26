import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "../../styles/Login.css";
import logoECIJG from "../../assets/images/login/Logotipo.png";
import fondo from "../../assets/images/login/Fondo.png";
import axios from "axios";

function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.trim() || !password.trim()) {
      alert("Por favor ingrese usuario y contraseña");
      return;
    }
    try {
      // Llama al endpoint /login con email y password
      const res = await api.post("/api/usuarios/login", {
        email: user,
        password: password
      });
      if (res.status === 200) {
        alert("Login exitoso");
        // Aquí puedes guardar token si el backend lo devuelve
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Credenciales inválidas");
      } else {
        alert("Error de conexión con el servidor");
      }
    }
  };

  return (
    <div
      className="login-background"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="login-card">
        <div className="login-header">
          <div>
            <h1 className="login-title">SIRHA</h1>
          </div>
          <img
            src={logoECIJG}
            alt="Logo Universidad"
            className="login-logo"
          />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="user">
            ID Usuario
          </label>
          <input
            className="login-input"
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Ingrese su usuario"
          />
          <label className="login-label" htmlFor="password">
            Contraseña
          </label>
          <input
            className="login-input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
          />
          <button className="login-button" type="submit">
            Ingresar
          </button>
        </form>

        {/* Botones temporales para pruebas de roles */}
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            style={{ background: '#1e40af', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', padding: '12px', cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          >
            Ir a inicio ESTUDIANTE
          </button>
          <button
            style={{ background: '#991b1b', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', padding: '12px', cursor: 'pointer' }}
            onClick={() => navigate('/decanatura')}
          >
            Ir a inicio DECANATURA
          </button>
          <button
            style={{ background: '#065f46', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', padding: '12px', cursor: 'pointer' }}
            onClick={() => navigate('/admin')}
          >
            Ir a inicio ADMINISTRADOR
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
