import React from "react";

/**
 * Componente para mostrar mensaje de error en campos de formulario
 */
export default function ErrorMessage({ error, visible = true }) {
  if (!visible || !error) return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "#991b1b",
      fontSize: "13px",
      marginTop: "4px",
      animation: "slideIn 0.2s ease-out"
    }}>
      <span className="material-icons" style={{ fontSize: "16px" }}>
        error
      </span>
      <span>{error}</span>
    </div>
  );
}

/**
 * Componente para mostrar alerta general (éxito, error, advertencia, info)
 */
export function Alert({ type = "info", message, onClose, autoClose = false, duration = 5000 }) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!visible) return null;

  const styles = {
    info: {
      backgroundColor: "#dbeafe",
      borderColor: "#3b82f6",
      color: "#1e40af",
      icon: "info"
    },
    success: {
      backgroundColor: "#d1fae5",
      borderColor: "#10b981",
      color: "#065f46",
      icon: "check_circle"
    },
    warning: {
      backgroundColor: "#fef3c7",
      borderColor: "#f59e0b",
      color: "#92400e",
      icon: "warning"
    },
    error: {
      backgroundColor: "#fee2e2",
      borderColor: "#ef4444",
      color: "#991b1b",
      icon: "cancel"
    }
  };

  const style = styles[type] || styles.info;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      backgroundColor: style.backgroundColor,
      border: `2px solid ${style.borderColor}`,
      borderRadius: "8px",
      color: style.color,
      marginBottom: "16px",
      animation: "slideDown 0.3s ease-out"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span className="material-icons" style={{ fontSize: "24px" }}>
          {style.icon}
        </span>
        <span style={{ fontWeight: "500" }}>{message}</span>
      </div>
      {onClose && (
        <span
          className="material-icons"
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          style={{
            fontSize: "20px",
            cursor: "pointer",
            opacity: 0.7,
            transition: "opacity 0.2s"
          }}
          onMouseOver={(e) => e.target.style.opacity = 1}
          onMouseOut={(e) => e.target.style.opacity = 0.7}
        >
          close
        </span>
      )}
    </div>
  );
}

/**
 * Componente para mostrar resumen de errores de validación
 */
export function ValidationSummary({ errors, title = "Por favor corrija los siguientes errores:" }) {
  const errorList = Object.values(errors).filter(Boolean);
  
  if (errorList.length === 0) return null;

  return (
    <div style={{
      backgroundColor: "#fee2e2",
      border: "2px solid #ef4444",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "20px",
      animation: "slideDown 0.3s ease-out"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "12px",
        color: "#991b1b",
        fontWeight: "600"
      }}>
        <span className="material-icons" style={{ fontSize: "24px" }}>
          error
        </span>
        <span>{title}</span>
      </div>
      <ul style={{
        margin: 0,
        paddingLeft: "20px",
        color: "#991b1b"
      }}>
        {errorList.map((error, index) => (
          <li key={index} style={{ marginBottom: "6px" }}>
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
