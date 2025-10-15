import React from 'react';
import './Groups.css';

/**
 * Barra de capacidad visual que muestra el porcentaje de ocupación
 * con código de color según el estado
 * 
 * @param {Object} props
 * @param {number} props.capacidadActual - Número de cupos ocupados
 * @param {number} props.cupoMaximo - Número máximo de cupos
 * @param {boolean} props.showPercentage - Mostrar el porcentaje (default: true)
 */
const CapacityBar = ({ capacidadActual, cupoMaximo, showPercentage = true }) => {
  const porcentaje = Math.round((capacidadActual / cupoMaximo) * 100);
  
  const getEstadoCapacidad = (pct) => {
    if (pct >= 90) return "critico";
    if (pct >= 75) return "alerta";
    return "normal";
  };

  const estado = getEstadoCapacidad(porcentaje);

  return (
    <div className={`estado-indicator ${estado}`}>
      <div className="capacidad-bar">
        <div 
          className="capacidad-fill" 
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>
      {showPercentage && <span className="porcentaje">{porcentaje}%</span>}
    </div>
  );
};

export default CapacityBar;
