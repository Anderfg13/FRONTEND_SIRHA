import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logoECIJG from "../../assets/images/login/Logotipo.png";
import fondo from "../../assets/images/login/Fondo.png";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías validar el usuario y contraseña
    // Por ahora, simplemente redirige a /dashboard
    navigate("/dashboard");
  };

  return (
    <div
      className="login-background"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "60vw auto",
        backgroundPosition: "right bottom",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#a10000",
      }}
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
            placeholder="123456789"
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
            placeholder="************"
          />
          <button className="login-button" type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;