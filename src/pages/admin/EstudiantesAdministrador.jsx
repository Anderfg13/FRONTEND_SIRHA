import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import UserForm from "../../components/user/UserForm";
import UserList from "../../components/user/UserList";
import { Alert, ValidationSummary } from "../../components/ui/ErrorMessage";
import { validateUserForm } from "../../utils/validations";
import "../../styles/Usuarios.css";
import "../../styles/Student.css";

const userAdmin = {
  nombreCompleto: "Nombre Admin",
  correo: "admin@escuelaing.edu.co",
  rol: "Administrador",
  opcionesMenu: [
    { nombre: "INICIO", ruta: "/admin", icono: "home" },
    { nombre: "HORARIO", ruta: "/admin/horario", icono: "calendar_today" },
    { nombre: "SEMÁFORO", ruta: "/admin/semaforo", icono: "traffic" },
    { nombre: "SOLICITUDES", ruta: "/admin/solicitudes", icono: "bookmark" },
    { nombre: "USUARIOS", ruta: "/admin/estudiantes", icono: "groups" },
    { nombre: "GRUPOS Y MATERIAS", ruta: "/admin/grupos", icono: "menu_book" },
    { nombre: "REPORTES Y ESTADÍSTICAS", ruta: "/admin/estadisticas", icono: "bar_chart" },
    { nombre: "CONFIGURACIÓN Y PERIODOS", ruta: "/admin/configuracion", icono: "settings" }
  ]
};

// Datos mock de usuarios
const usuariosMock = [
  { 
    id: 1, 
    nombre: "Anderson Fabian Garcia Nieto",
    programa: "Ingeniería de Sistemas",
    rol: "Estudiante"
  },
  { 
    id: 2, 
    nombre: "María José Rodríguez López",
    programa: "Ingeniería Civil",
    rol: "Estudiante"
  },
  { 
    id: 3, 
    nombre: "Carlos Alberto Pérez Gómez",
    programa: "Ingeniería Industrial",
    rol: "Decano"
  },
  { 
    id: 4, 
    nombre: "Ana Sofía Martínez Cruz",
    programa: "Ingeniería Mecánica",
    rol: "Estudiante"
  }
];

export default function EstudiantesAdministrador() {
  const [usuarios, setUsuarios] = useState(usuariosMock);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  
  const [formData, setFormData] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    rol: "",
    programa: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCrearUsuario = () => {
    // Validar formulario
    const validation = validateUserForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setAlert({
        type: 'error',
        message: 'Por favor corrija los errores en el formulario antes de continuar'
      });
      return;
    }

    // Si la validación es exitosa, crear usuario
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: `${formData.primerNombre} ${formData.segundoNombre} ${formData.primerApellido} ${formData.segundoApellido}`.trim(),
      programa: formData.programa,
      rol: formData.rol
    };
    
    setUsuarios([...usuarios, nuevoUsuario]);
    
    // Limpiar formulario y errores
    setFormData({
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      rol: "",
      programa: ""
    });
    setErrors({});
    
    // Mostrar mensaje de éxito
    setAlert({
      type: 'success',
      message: '✓ Usuario creado exitosamente'
    });
    
    // Auto-cerrar alerta después de 3 segundos
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <Dashboard user={userAdmin}>
      <div className="usuarios-container">
        <h1 className="usuarios-title">USUARIOS</h1>

        {alert && (
          <div style={{ maxWidth: "1400px", margin: "0 auto 20px" }}>
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
              autoClose={alert.type === 'success'}
            />
          </div>
        )}

        <div className="usuarios-grid">
          <div className="usuarios-panel">
            {Object.keys(errors).length > 0 && (
              <ValidationSummary errors={errors} />
            )}
            <UserForm
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleCrearUsuario}
              buttonText="CREAR"
              errors={errors}
            />
          </div>

          <div className="usuarios-panel">
            <UserList
              usuarios={usuarios}
              selectedUser={usuarioSeleccionado}
              onSelectUser={setUsuarioSeleccionado}
            />
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
