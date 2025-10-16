import React from 'react';
import './UI.css';

/**
 * Diálogo de confirmación reutilizable
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controla si el diálogo está abierto
 * @param {Function} props.onConfirm - Callback al confirmar
 * @param {Function} props.onCancel - Callback al cancelar
 * @param {string} props.title - Título del diálogo
 * @param {string} props.message - Mensaje del diálogo
 * @param {string} props.confirmText - Texto del botón confirmar (default: "Confirmar")
 * @param {string} props.cancelText - Texto del botón cancelar (default: "Cancelar")
 * @param {string} props.variant - Variante del botón (danger, warning, success, info)
 */
const ConfirmDialog = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  title, 
  message, 
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger"
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="confirm-dialog">
        <div className="confirm-icon">
          <span className="material-icons">
            {variant === 'danger' ? 'warning' : 
             variant === 'warning' ? 'help_outline' : 
             variant === 'success' ? 'check_circle' : 'info'}
          </span>
        </div>
        
        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-message">{message}</p>
        
        <div className="confirm-actions">
          <button 
            className="btn-cancel" 
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`btn-confirm ${variant}`} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
