import React from 'react';
import '../../styles/UI.css';

/**
 * Badge de estado reutilizable
 * 
 * @param {Object} props
 * @param {string} props.status - Estado (activo, pendiente, aprobado, rechazado, etc.)
 * @param {string} props.label - Texto del badge (opcional, por defecto usa status)
 * @param {string} props.variant - Variante de color (success, warning, danger, info, default)
 */
const StatusBadge = ({ status, label, variant }) => {
  // Mapeo de estados a variantes si no se proporciona variant
  const getVariant = () => {
    if (variant) return variant;
    
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('activo') || statusLower.includes('aprobado')) return 'success';
    if (statusLower.includes('pendiente') || statusLower.includes('en curso')) return 'warning';
    if (statusLower.includes('rechazado') || statusLower.includes('suspendido')) return 'danger';
    if (statusLower.includes('graduado') || statusLower.includes('completado')) return 'info';
    return 'default';
  };

  const badgeVariant = getVariant();
  const displayText = label || status;

  return (
    <span className={`status-badge ${badgeVariant}`}>
      {displayText}
    </span>
  );
};

export default StatusBadge;
