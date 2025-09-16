# SIRHA - FRONT: Sistema Academico de Solicitudes de Horarios

![React](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

SIRHA-Front es la interfaz de usuario para la gestión de solicitudes de cambios de horarios, o de solicitud de materias. Esta aplicación React permite al estudiante pedir una modificación de su horario academico a traves de solicitudes (Cambio de grupo, cambio de materia), aparte de visualizar su horario actual o de semestres academicos pasados.

## Tabla de Contenidos 📋

- [Integrantes](#integrantes)
- [Caso de Negocio](#caso-de-negocio)
- [Tecnologías Utilizadas](#tecnologías-utilizadas-)
- [Estructura del Proyecto](#estructura-del-proyecto-)


## Integrantes

-Anderson Fabian Garcia Nieto
-David Alejandro Patacon Henao 
-Felipe Eduardo Calviche Gallego
-Jared Sebastian Farfan Guevara
-Kevin Arturo Cuitiva Pardo
-Maria Paula Rodriguez Muñoz


## Tecnologías Utilizadas 🛠

- **React**: Biblioteca principal para la construcción de la interfaz de usuario
- **CSS**: Estilos personalizados para la interfaz de usuario


## Estructura del Proyecto 📁

```
src/
├── assets/           # Recursos estáticos (imágenes, fuentes)
├── components/       # Componentes reutilizables
│   ├── common/       # Componentes UI base (Button, Input, etc.)
│   ├── layout/       # Componentes de estructura (Header, Footer, etc.)
│   ├── charts/       # Componentes de visualización con D3
│   └── forms/        # Componentes de formulario
├── containers/       # Componentes contenedores con lógica de negocio
├── context/          # Contextos para estado global (Auth, Theme, etc.)
├── hooks/            # Hooks personalizados
├── pages/            # Componentes de página completa
├── services/         # Servicios para comunicación con API
├── utils/            # Funciones de utilidad
├── App.js            # Componente principal
├── index.js          # Punto de entrada
└── routes.js         # Configuración de rutas
```

---
**Este proyecto se creó con el siguiente comando en la terminal:**

```bash
npx create-react-app usermanagement
```

> Nota: Al crear el proyecto, es importante que el nombre esté en **minúsculas** debido a las restricciones de **npm**.

---

## Requisitos Previos

Asegúrate de tener instalados **Node.js** y **npm** en tu sistema.  
Puedes verificarlo con los siguientes comandos:

```bash
node -v
npm -v
```

---

## Instalación

Para instalar las dependencias necesarias, ejecuta:

```bash
npm install react-scripts
```

Este comando asegura que todas las dependencias de **react-scripts** se instalen correctamente, especialmente si hubo algún problema durante la configuración inicial.

---

## Ejecución del Proyecto

Una vez instaladas las dependencias, inicia el servidor de desarrollo con:

```bash
npm start
```

Esto abrirá automáticamente la aplicación en tu navegador en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## Actualización de npm

Se recomienda mantener **npm** actualizado para evitar problemas de compatibilidad.  
Para actualizarlo, usa:

```bash
npm install -g npm@latest
```

---

## Notas Adicionales

- Para detener el servidor de desarrollo, presiona **Ctrl + C** en la terminal.  
- Si experimentas errores adicionales, intenta limpiar la caché de npm y reinstalar las dependencias:

```bash
npm cache clean --force
npm install
```

---

✅ ¡Listo! Ahora tienes todo lo necesario para ejecutar este proyecto en **React**.
