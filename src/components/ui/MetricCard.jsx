import React from 'react';
import './UI.css';

/**
 * Tarjeta de métrica reutilizable
 * 
 * @param {Object} props
 * @param {string} props.title - Título de la métrica
 * @param {string|number} props.value - Valor de la métrica
 * @param {string} props.icon - Icono de Material Icons
 * @param {string} props.color - Color del icono (green, yellow, red, blue)
 * @param {string} props.trend - Tendencia (+5%, -3%, etc.) opcional
 * @param {Function} props.onClick - Callback opcional al hacer click
 */
const MetricCard = ({ title, value, icon, color = 'blue', trend, onClick }) => {
  return (
    <div 
      className={`metric-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <div className="metric-content">
        <div className="metric-info">
          <h3 className="metric-title">{title}</h3>
          <div className="metric-value">{value}</div>
          {trend && (
            <span className={`metric-trend ${trend.startsWith('+') ? 'positive' : 'negative'}`}>
              {trend}
            </span>
          )}
        </div>
        <div className={`metric-icon ${color}`}>
          <span className="material-icons">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
