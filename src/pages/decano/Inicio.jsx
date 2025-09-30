import React from "react";

export default function Inicio() {
  const containerStyle = {
    padding: "20px",
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#222",
  };

  const cardsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  };

  const cardStyle = {
    backgroundColor: "#e0e0e0", // gris clarito
    borderRadius: "10px",
    padding: "24px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    fontSize: "20px",
    fontWeight: "600",
    color: "#333",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const cardHoverStyle = {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
  };

  // Lista de cuadros que se van a mostrar
  const cards = ["Solicitudes", "Horario", "Semáforo"];

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Estado de tu cuenta</h2>

      <div style={cardsContainerStyle}>
        {cards.map((card, index) => (
          <div
            key={index}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = cardHoverStyle.transform;
              e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow =
                "0 4px 10px rgba(0,0,0,0.15)";
            }}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
}
