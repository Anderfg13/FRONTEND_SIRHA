import React from "react";
import "./Login.css";
import logoECIJG from "../../assets/images/login/Logotipo.png";
import fondo from "../../assets/images/login/Fondo.png"; 

function Login() {
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
        <form className="login-form">
          <label className="login-label" htmlFor="user">
            ID Usuario
          </label>
          <input
            className="login-input"
            type="text"
            id="user"
            placeholder="123456789"
          />
          <label className="login-label" htmlFor="password">
            Contraseña
          </label>
          <input
            className="login-input"
            type="password"
            id="password"
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