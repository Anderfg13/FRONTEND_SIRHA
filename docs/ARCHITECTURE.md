# Arquitectura del Proyecto SIRHA - Frontend

Fecha: 2025-10-15  
Rama: feature/student (interfaz estudiante)  
Basado en: feature/moduloadmin

---

## Resumen del proyecto

SIRHA (Sistema de Información y Registro de Horarios Académicos) es una aplicación web para gestión académica universitaria. Este proyecto contiene dos interfaces principales:

- **Interfaz Administrador/Decanatura** (rama `feature/moduloadmin`): gestión completa de estudiantes, solicitudes, grupos, materias y configuración.
- **Interfaz Estudiante** (rama `feature/student`): acceso a información personal, horarios, semáforo académico, solicitudes propias.

Este documento describe la arquitectura implementada en la rama `feature/student`, enfocada en máxima reutilización de componentes y estructura modular.

---

## Estructura de carpetas

```
FRONTEND_SIRHA/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── layout/           # Layout compartido (Sidebar, Header, MainLayout)
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── Layout.css
│   │   ├── student/          # Componentes específicos de estudiantes
│   │   │   ├── Filters.jsx
│   │   │   ├── StudentCard.jsx
│   │   │   ├── StudentList.jsx
│   │   │   ├── StudentDetail.jsx
│   │   │   └── Student.css
│   │   ├── schedule/         # Componente de horario parametrizado
│   │   │   ├── ScheduleTable.jsx
│   │   │   └── Schedule.css
│   │   ├── semaforo/         # Componente de semáforo académico
│   │   │   ├── SemaforoAcademico.jsx
│   │   │   └── Semaforo.css
│   │   ├── groups/           # Componentes de grupos y materias
│   │   │   ├── GroupTable.jsx
│   │   │   ├── CapacityBar.jsx
│   │   │   ├── GroupDetails.jsx
│   │   │   ├── Groups.css
│   │   │   └── MateriaSelector.css
│   │   └── ui/               # Componentes UI genéricos (pendiente)
│   │       ├── MetricCard.jsx
│   │       ├── StatusBadge.jsx
│   │       ├── Table.jsx
│   │       ├── Modal.jsx
│   │       └── ConfirmDialog.jsx
│   ├── pages/                # Páginas completas
│   │   ├── EstudiantesPage.jsx
│   │   ├── GruposEstudiantePage.jsx
│   │   ├── HorarioPage.jsx
│   │   ├── SemaforoPage.jsx
│   │   └── DashboardEstudiantePage.jsx
│   ├── context/              # Contextos de React
│   │   └── AuthContext.jsx
│   ├── api/                  # Servicios de API
│   ├── config/               # Configuración
│   ├── App.js
│   ├── index.js
│   └── styles/
│       ├── App.css
│       └── index.css
├── docs/
│   ├── ARCHITECTURE.md       # Este archivo
│   └── module-reuse-report.md
├── package.json
└── README.md
```

---

## Componentes Reutilizables

### 1. Layout compartido (`src/components/layout/`)

**Objetivo**: Eliminar duplicación de Sidebar/Header en cada módulo.

#### `Sidebar.jsx`
- **Props**:
  - `menuItems`: Array de objetos `{path, icon, label}` para construir el menú dinámicamente.
  - `onLogout`: Callback para manejar logout.
- **Uso**: Usado por admin y estudiante con diferentes menús.

#### `Header.jsx`
- **Props**:
  - `userName`: Nombre del usuario (opcional).
  - `onProfileClick`: Callback al hacer click en el ícono de perfil.
- **Uso**: Header uniforme en todas las páginas.

#### `MainLayout.jsx`
- **Props**:
  - `children`: Contenido de la página.
  - `menuItems`, `onLogout`, `userName`, `onProfileClick`: Props pasadas a Sidebar/Header.
- **Uso**: Envuelve el contenido de cada página, composición de Sidebar + Header + content wrapper.

**Ejemplo de uso**:
```jsx
import MainLayout from "../components/layout/MainLayout";

const menuItems = [
  { path: "/dashboard", icon: "home", label: "INICIO" },
  { path: "/horario", icon: "calendar_today", label: "MI HORARIO" },
  { path: "/semaforo", icon: "traffic", label: "MI SEMÁFORO" },
];

<MainLayout menuItems={menuItems} onLogout={handleLogout} userName="Juan Pérez">
  {/* Contenido de la página */}
</MainLayout>
```

---

### 2. Componentes de Estudiantes (`src/components/student/`)

**Objetivo**: Refactorizar módulo monolítico de estudiantes en subcomponentes reutilizables.

#### `Filters.jsx`
- **Props**:
  - `searchTerm`, `onSearchChange`: Control de búsqueda.
  - `filterSemestre`, `onSemestreChange`: Filtro por semestre.
  - `filterEstado`, `onEstadoChange`: Filtro por estado.
  - `semestres`, `estados`: Arrays de opciones.
- **Uso**: Barra de filtros reutilizable en listados de estudiantes.

#### `StudentCard.jsx`
- **Props**:
  - `student`: Objeto con datos del estudiante.
  - `isSelected`: Boolean si está seleccionado.
  - `onClick`: Callback al hacer click.
- **Uso**: Tarjeta individual de estudiante en lista.

#### `StudentList.jsx`
- **Props**:
  - `students`: Array de estudiantes.
  - `selectedStudent`: Estudiante seleccionado actualmente.
  - `onStudentSelect`: Callback al seleccionar.
- **Uso**: Panel lateral con lista de estudiantes (usa StudentCard internamente).

#### `StudentDetail.jsx`
- **Props**:
  - `student`: Estudiante seleccionado.
  - `onViewSemaforo`, `onViewHorario`, `onEdit`: Callbacks para acciones.
- **Uso**: Panel derecho con detalles completos del estudiante.

**Ejemplo de uso** (ver `EstudiantesPage.jsx`):
```jsx
<Filters {...filterProps} />
<div style={{ display: "flex", gap: "20px" }}>
  <StudentList students={filteredStudents} selectedStudent={selected} onStudentSelect={setSelected} />
  <StudentDetail student={selected} onViewSemaforo={() => navigate("/semaforo")} />
</div>
```

---

### 3. Horario parametrizado (`src/components/schedule/`)

**Objetivo**: Componente de horario reutilizable para admin y estudiante.

#### `ScheduleTable.jsx`
- **Props**:
  - `semestre`: Periodo académico actual.
  - `periodos`: Array de periodos disponibles (para selector).
  - `onPeriodoChange`: Callback cuando cambia el periodo.
  - `horarioData`: Array de objetos `{franja, lunes, martes, ..., sabado}`.
- **Uso**: Tabla de horario con datos dinámicos.
- **Ejemplo**:
```jsx
const horarioData = [
  { franja: "07:00 - 08:30", lunes: "CALC-1", martes: "", miercoles: "CALC-1", jueves: "", viernes: "CALC-1", sabado: "" },
  // ...
];

<ScheduleTable semestre="2025-1" horarioData={horarioData} />
```

---

### 4. Semáforo Académico (`src/components/semaforo/`)

**Objetivo**: Visualización de avance académico por semestre.

#### `SemaforoAcademico.jsx`
- **Props**:
  - `semaforoData`: Objeto `{aprobadas: [], enCurso: [], pendientes: [], semestreData: {1: [...], 2: [...], ...}}`.
  - `showSelector`: Boolean para mostrar selector de estudiante (admin) o no (estudiante).
  - `estudiantes`: Array de estudiantes (si showSelector=true).
  - `selectedEstudiante`, `onEstudianteChange`: Control del selector.
- **Uso**: Tarjetas de resumen (aprobadas/en curso/pendientes) + tablas por semestre.
- **Ejemplo**:
```jsx
const semaforoData = {
  aprobadas: [{nombre: "Cálculo I", semestre: 1, estado: "aprobada"}, ...],
  enCurso: [{nombre: "Física II", semestre: 3, estado: "en-curso"}, ...],
  pendientes: [{nombre: "Programación III", semestre: 4, estado: "pendiente"}, ...],
  semestreData: {
    1: [{nombre: "Cálculo I", estado: "aprobada"}, ...],
    2: [{nombre: "Álgebra", estado: "aprobada"}, ...],
    // ...
  }
};

<SemaforoAcademico semaforoData={semaforoData} showSelector={false} />
```

---

### 5. Componentes de Grupos y Materias (`src/components/groups/`)

**Objetivo**: Permitir visualización e inscripción en grupos tanto para admin como estudiante.

#### `CapacityBar.jsx`
- **Props**:
  - `capacidadActual`: Número de cupos ocupados.
  - `cupoMaximo`: Número máximo de cupos.
  - `showPercentage`: Mostrar porcentaje (default: true).
- **Uso**: Barra visual de capacidad con colores según ocupación (verde < 75%, amarillo 75-90%, rojo >= 90%).

#### `GroupTable.jsx`
- **Props**:
  - `grupos`: Array de grupos `{grupo, docente, capacidadActual, cupoMaximo, listaEspera, horario}`.
  - `selectedGrupo`: Grupo seleccionado actualmente.
  - `onGrupoSelect`: Callback al seleccionar un grupo.
  - `onAction`: Callback para el botón de acción.
  - `actionLabel`: Etiqueta del botón ("Modificar" para admin, "Inscribirse" para estudiante).
  - `actionIcon`: Icono del botón (default: "edit" para admin, "add_circle" para estudiante).
  - `isStudent`: Booleano para vista estudiante (deshabilita botón si no hay cupos).
- **Uso**: Tabla completa de grupos con información de capacidad y acciones.

#### `GroupDetails.jsx`
- **Props**:
  - `grupo`: Grupo seleccionado.
  - `onClose`: Callback para cerrar panel (opcional).
  - `isStudent`: Vista de estudiante (cambia acciones disponibles).
  - `onInscribirse`, `onVerHorario`: Callbacks para estudiante.
  - `onVerEstudiantes`, `onAumentarCupo`, `onReducirCupo`, `onGestionarLista`: Callbacks para admin.
- **Uso**: Panel de detalles con información general, estado de capacidad y acciones según rol.

**Ejemplo de uso (vista estudiante)**:
```jsx
<GroupTable 
  grupos={gruposDisponibles}
  selectedGrupo={grupoSeleccionado}
  onGrupoSelect={setGrupoSeleccionado}
  onAction={handleInscribirse}
  actionLabel="Inscribirse"
  actionIcon="add_circle"
  isStudent={true}
/>

<GroupDetails 
  grupo={grupoSeleccionado}
  isStudent={true}
  onInscribirse={() => inscribirseEnGrupo(grupoSeleccionado)}
  onVerHorario={abrirCalendario}
/>
```

---

### 6. Componentes UI genéricos (`src/components/ui/`)

**Objetivo**: Componentes reutilizables para toda la aplicación con diseño moderno.

#### `MetricCard.jsx`
- **Props**:
  - `title`: Título de la métrica.
  - `value`: Valor numérico o texto.
  - `icon`: Icono de Material Icons.
  - `color`: Color del icono (green, yellow, red, blue).
  - `trend`: Tendencia opcional (+5%, -3%).
  - `onClick`: Callback opcional.
- **Uso**: Tarjetas de métricas con gradientes, sombras y efectos hover.

#### `StatusBadge.jsx`
- **Props**:
  - `status`: Estado del elemento.
  - `label`: Texto del badge (opcional).
  - `variant`: Variante de color (success, warning, danger, info, default).
- **Uso**: Badges con colores, bordes redondeados y efectos hover.

#### `Modal.jsx`
- **Props**:
  - `isOpen`: Controla visibilidad.
  - `onClose`: Callback al cerrar.
  - `title`: Título del modal.
  - `children`: Contenido.
  - `size`: Tamaño (small, medium, large).
  - `showCloseButton`: Mostrar botón X.
- **Uso**: Modal con backdrop blur, animaciones de entrada y bordes redondeados.

#### `ConfirmDialog.jsx`
- **Props**:
  - `isOpen`: Controla visibilidad.
  - `onConfirm`, `onCancel`: Callbacks.
  - `title`, `message`: Textos.
  - `confirmText`, `cancelText`: Textos de botones.
  - `variant`: Variante (danger, warning, success, info).
- **Uso**: Diálogo de confirmación con icono animado y botones con gradientes.

**Ejemplo de uso**:
```jsx
<MetricCard 
  title="Promedio General"
  value="4.2"
  icon="star"
  color="green"
  trend="+0.2"
/>

<StatusBadge status="activo" variant="success" />

<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Detalles">
  <p>Contenido del modal...</p>
</Modal>

<ConfirmDialog 
  isOpen={confirmOpen}
  title="¿Confirmar acción?"
  message="Esta acción no se puede deshacer"
  onConfirm={handleConfirm}
  onCancel={() => setConfirmOpen(false)}
  variant="danger"
/>
```

---

## AuthContext (`src/context/AuthContext.jsx`)

**Objetivo**: Proveer contexto de autenticación global.

**Funcionalidades**:
- `login(userData)`: Almacena usuario en estado y localStorage.
- `logout()`: Limpia usuario.
- `hasRole(rol)`: Verifica si el usuario tiene un rol específico.
- `getUserInitials()`: Obtiene iniciales del nombre.
- `isAuthenticated`: Booleano si hay usuario autenticado.
- `user`: Objeto del usuario actual.

**Uso**:
```jsx
// En App.js
import { AuthProvider } from './context/AuthContext';

<AuthProvider>
  <BrowserRouter>
    <Routes>...</Routes>
  </BrowserRouter>
</AuthProvider>

// En cualquier componente
import { useAuth } from '../context/AuthContext';

const { user, login, logout, hasRole } = useAuth();
```

---

## Páginas (`src/pages/`)

### `EstudiantesPage.jsx`
- **Descripción**: Página de gestión de estudiantes (admin).
- **Componentes usados**: `MainLayout`, `Filters`, `StudentList`, `StudentDetail`.
- **Datos**: Mock de estudiantes hardcoded (en producción: API).

### `GruposEstudiantePage.jsx`
- **Descripción**: Página de inscripción de grupos para estudiantes.
- **Componentes usados**: `MainLayout`, `GroupTable`, `GroupDetails`.
- **Datos**: Mock de grupos por materia.
- **Funcionalidad**: Selector de materia, tabla de grupos, panel de detalles, inscripción.

### `DashboardEstudiantePage.jsx`
- **Descripción**: Dashboard completo para estudiantes.
- **Componentes usados**: `MainLayout`, `MetricCard`, `StatusBadge`.
- **Secciones**:
  - Header con bienvenida y acciones rápidas
  - Grid de 4 métricas (Promedio, Créditos, Materias, Semestre)
  - Materias actuales con barra de progreso
  - Alertas y notificaciones con códigos de color
  - Calendario mini con eventos marcados
  - Lista de eventos próximos
- **Ruta**: `/dashboard-estudiante`

### Páginas pendientes:
- `SolicitudesPage.jsx`: Mis solicitudes + formulario para crear nueva.

---

## Paleta de colores (Institucional)

**Colores principales**:
- `AuthProvider`: Componente wrapper con estado de usuario.
- `useAuth()`: Hook para acceder a usuario actual, login, logout.
- Almacenar: `{id, nombre, email, rol: "admin" | "estudiante", ...}`.

**Uso**:
```jsx
import { useAuth } from "../context/AuthContext";

const { user, login, logout } = useAuth();

if (user.rol === "estudiante") {
  // Mostrar interfaz estudiante
}
```

---

## Paleta de colores (coherente con feature/moduloadmin)

```css
/* Colores principales */
--color-principal: #990000;    /* Rojo institucional */
--color-admin-gradient: #4F0000; /* Gradiente sidebar */

/* Estados */
--color-activo: #065f46;       /* Verde */
--color-activo-bg: #d1fae5;

--color-en-curso: #92400e;     /* Amarillo */
--color-en-curso-bg: #fef3c7;

--color-pendiente: #991b1b;    /* Rojo */
--color-pendiente-bg: #fee2e2;

/* Grises */
--color-fondo: #f9fafb;
--color-borde: #e5e7eb;
--color-texto: #1f2937;
--color-texto-light: #6b7280;
```

---

## Flujo de trabajo recomendado

### Para agregar un nuevo módulo/página de estudiante:

1. **Crear la página** en `src/pages/`.
2. **Usar `MainLayout`** con `menuItems` apropiados.
3. **Importar componentes reutilizables** de `src/components/`.
4. **Conectar con `AuthContext`** para obtener datos del usuario autenticado.
5. **Reemplazar datos mock** con llamadas a API en `src/api/`.

### Para refactorizar un módulo admin:

1. **Ir a `feature/moduloadmin`** y leer el componente.
2. **Extraer subcomponentes** (separar lógica de UI, filtros, cards, details).
3. **Parametrizar con props** para recibir datos dinámicos.
4. **Mover a `src/components/`** en la rama `feature/student`.
5. **Crear variantes** para admin/estudiante si es necesario (ej: acciones diferentes).

---

## Próximos pasos (en orden de prioridad)

1. ✅ **Layout compartido** — Completado (Sidebar, Header, MainLayout).
2. ✅ **Refactor Estudiantes** — Completado (Filters, StudentCard, StudentList, StudentDetail).
3. ✅ **Parametrizar Horario/Semáforo** — Completado (ScheduleTable, SemaforoAcademico).
4. ⏳ **Adaptar GruposYMaterias** — Extraer GroupTable, CapacityBar, GroupDetails; cambiar acciones a "Inscribirse".
5. ⏳ **Solicitudes estudiante** — Crear SolicitudForm, adaptar listado para mostrar solo solicitudes propias.
6. ⏳ **Componentes UI genéricos** — Extraer MetricCard, StatusBadge, Table, Modal, ConfirmDialog.
7. ⏳ **AuthContext** — Crear contexto de autenticación y conectar Login.
8. ⏳ **Dashboard Estudiante** — Página con métricas personales, calendario, alertas.
9. ⏳ **Testing** — Tests unitarios para componentes críticos.
10. ⏳ **Documentación** — README para desarrolladores y guías de uso.

---

## Notas técnicas

- **React versión**: 19.1.1
- **Router**: react-router-dom ^7.9.3 (en feature/moduloadmin), pendiente en feature/student.
- **Iconos**: Material Icons (CDN en CSS).
- **Estilos**: CSS modules/archivos separados por componente.
- **State management**: React hooks (`useState`, `useContext`).
- **Build**: Create React App (react-scripts 5.0.1).

---

## Contacto y colaboración

- Rama principal de desarrollo admin: `feature/moduloadmin`
- Rama de desarrollo estudiante: `feature/student`
- Repositorio: `Anderfg13/FRONTEND_SIRHA`

Para cualquier duda o propuesta de refactor, abrir issue o PR en el repositorio.

---

**Última actualización**: 2025-10-15
