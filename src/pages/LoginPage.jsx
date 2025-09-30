import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 importamos el hook
import logoU from '../assets/icons/LogoU.jpg';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 👈 inicializamos el hook

  function handleSubmit(e) {
    e.preventDefault();

    navigate('/decano/solicitudes');
  }

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#990000', // fondo rojo
    position: 'relative',
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    padding: '24px'
  };

  const universityLogo = (
    <img src={logoU} alt="Logo universidad" style={{ width: "84px", borderRadius: "8px" }} />
  );

  const logoWrapperStyle = {
    position: 'absolute',
    right: 40,
    bottom: 44,
    opacity: 0.99,
  };

  const cardStyle = {
    width: '520px',
    maxWidth: '92vw',
    background: '#f1f1f1',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
    padding: '28px',
    transform: 'translateX(30px)',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '18px'
  };

  const titleStyle = {
    fontSize: '60px',
    fontWeight: 800,
    color: '#222'
  };

  const inputsContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const inputStyle = {
    height: '44px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.12)',
    background: '#fff',
    fontSize: '25px'
  };

  const buttonStyle = {
    marginTop: '10px',
    height: '44px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 800,
    background: '#990000',
    color: '#fff'
  };

  const smallLogoStyle = {
    width: 800,
    height: 70,
    borderRadius: 100,
    background: '#f1f1f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={pageStyle}>
      <div style={logoWrapperStyle} aria-hidden>
        {universityLogo}
      </div>

      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={titleStyle}>SIRHA</div>
          <div style={smallLogoStyle} aria-hidden>
            <img src={logoU} alt="Logo universidad" style={{ width: "120px", borderRadius: "8px" }} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={inputsContainer}>
            <input
              id="userId"
              style={inputStyle}
              placeholder="ID usuario"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />

            <input
              id="password"
              type="password"
              style={inputStyle}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" style={buttonStyle}>Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
