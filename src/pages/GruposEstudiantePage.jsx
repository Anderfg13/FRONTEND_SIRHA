import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import GroupTable from '../components/groups/GroupTable';
import GroupDetails from '../components/groups/GroupDetails';
import '../components/groups/MateriaSelector.css';

/**
 * Página de inscripción de grupos para estudiantes
 * Demuestra el uso de GroupTable y GroupDetails con la vista de estudiante
 */
const GruposEstudiantePage = () => {
  const [selectedMateria, setSelectedMateria] = useState("");
  const [selectedGrupo, setSelectedGrupo] = useState(null);

  // Materias de Ingeniería de Sistemas
  const materias = [
    { id: 1, nombre: "Introducción a la Programación", semestre: 1 },
    { id: 2, nombre: "Proyecto Integrador 1 Introducción a la Ingeniería de Sistemas", semestre: 1 },
    { id: 3, nombre: "Álgebra Lineal", semestre: 1 },
    { id: 4, nombre: "Diseño de Datos y Algoritmos", semestre: 2 },
    { id: 5, nombre: "Matemáticas para Informática", semestre: 2 },
    { id: 6, nombre: "Modelos y Servicios de Datos", semestre: 3 },
    { id: 7, nombre: "Desarrollo Orientado por Objetos", semestre: 4 },
    { id: 8, nombre: "Teoría de la Programación y la Computación", semestre: 4 },
    { id: 9, nombre: "Desarrollo y Operaciones Software", semestre: 5 },
    { id: 10, nombre: "Arquitecturas de Software", semestre: 6 },
  ];

  // Grupos por materia (mock data)
  const gruposPorMateria = {
    1: [
      { grupo: "A", docente: "Dr. Carlos Mendoza", capacidadActual: 28, cupoMaximo: 35, listaEspera: 3, horario: "L-M-V 7:00-8:30" },
      { grupo: "B", docente: "Mg. Ana Ruiz", capacidadActual: 35, cupoMaximo: 35, listaEspera: 8, horario: "L-M-V 8:30-10:00" },
      { grupo: "C", docente: "Dr. Pedro García", capacidadActual: 22, cupoMaximo: 30, listaEspera: 0, horario: "M-J-V 10:00-11:30" },
    ],
    4: [
      { grupo: "A", docente: "Dr. Roberto Díaz", capacidadActual: 30, cupoMaximo: 32, listaEspera: 6, horario: "L-M-V 8:30-10:00" },
      { grupo: "B", docente: "Mg. Sofía Torres", capacidadActual: 28, cupoMaximo: 32, listaEspera: 1, horario: "M-J-V 10:00-11:30" },
    ],
    7: [
      { grupo: "A", docente: "Mg. Andrés Morales", capacidadActual: 20, cupoMaximo: 25, listaEspera: 0, horario: "L-M-V 10:00-11:30" },
      { grupo: "B", docente: "Dr. Patricia Jiménez", capacidadActual: 22, cupoMaximo: 25, listaEspera: 4, horario: "M-J-V 2:00-3:30" },
    ],
  };

  const handleMateriaChange = (event) => {
    setSelectedMateria(event.target.value);
    setSelectedGrupo(null);
  };

  const handleGrupoSelect = (grupo) => {
    setSelectedGrupo(grupo);
  };

  const handleInscribirse = (grupo) => {
    alert(`Inscribiéndose en el grupo ${grupo.grupo}...\n\nEsta funcionalidad se conectará al backend.`);
  };

  const handleVerHorario = () => {
    alert('Ver horario completo del grupo\n\nEsta funcionalidad abrirá el calendario.');
  };

  const getGruposActuales = () => {
    if (!selectedMateria) return [];
    return gruposPorMateria[selectedMateria] || [];
  };

  // Menú para estudiante
  const menuItems = [
    { path: '/dashboard', icon: 'home', label: 'INICIO' },
    { path: '/semaforo', icon: 'traffic', label: 'SEMÁFORO' },
    { path: '/horario', icon: 'schedule', label: 'HORARIO' },
    { path: '/grupos', icon: 'class', label: 'INSCRIPCIÓN' },
    { path: '/solicitudes', icon: 'description', label: 'SOLICITUDES' },
  ];

  return (
    <MainLayout menuItems={menuItems} userName="Juan Pérez">
      <div className="page-header">
        <h1>Inscripción de materias</h1>
        <p>Selecciona un grupo para inscribirte en la materia</p>
      </div>

      {/* Selector de materia */}
      <div className="materia-selector" style={{ marginBottom: '30px' }}>
        <label htmlFor="materia-select" style={{ 
          display: 'block', 
          fontWeight: 600, 
          color: '#333', 
          marginBottom: '8px',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          MATERIAS DISPONIBLES
        </label>
        <div style={{ position: 'relative', display: 'inline-block', minWidth: '300px' }}>
          <select 
            id="materia-select"
            value={selectedMateria} 
            onChange={handleMateriaChange}
            style={{
              width: '100%',
              padding: '12px 40px 12px 15px',
              fontSize: '1rem',
              border: '2px solid #ddd',
              borderRadius: '8px',
              backgroundColor: 'white',
              color: '#333',
              appearance: 'none',
              cursor: 'pointer',
              fontFamily: "'Work Sans', sans-serif"
            }}
          >
            <option value="">Seleccionar materia</option>
            {materias.map(materia => (
              <option key={materia.id} value={materia.id}>
                {materia.nombre} (Semestre {materia.semestre})
              </option>
            ))}
          </select>
          <span 
            className="material-icons" 
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666',
              pointerEvents: 'none',
              fontSize: '1.5rem'
            }}
          >
            keyboard_arrow_down
          </span>
        </div>
      </div>

      {/* Tabla de grupos */}
      {selectedMateria && (
        <GroupTable 
          grupos={getGruposActuales()}
          selectedGrupo={selectedGrupo}
          onGrupoSelect={handleGrupoSelect}
          onAction={handleInscribirse}
          actionLabel="Inscribirse"
          actionIcon="add_circle"
          isStudent={true}
        />
      )}

      {/* Detalles del grupo seleccionado */}
      {selectedGrupo && (
        <GroupDetails 
          grupo={selectedGrupo}
          isStudent={true}
          onInscribirse={() => handleInscribirse(selectedGrupo)}
          onVerHorario={handleVerHorario}
        />
      )}

      {!selectedMateria && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#666'
        }}>
          <span className="material-icons" style={{
            fontSize: '4rem',
            color: '#ddd',
            marginBottom: '20px'
          }}>
            school
          </span>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '10px',
            color: '#333'
          }}>
            Selecciona una materia
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#666'
          }}>
            Elige una materia del menú desplegable para ver sus grupos disponibles
          </p>
        </div>
      )}
    </MainLayout>
  );
};

export default GruposEstudiantePage;
