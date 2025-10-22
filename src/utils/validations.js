/**
 * Módulo de validaciones para formularios
 * Contiene funciones reutilizables para validar diferentes tipos de datos
 */

/**
 * Valida que un campo no esté vacío
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  return false;
};

/**
 * Valida que el texto solo contenga letras, espacios y caracteres latinos (ñ, tildes)
 */
export const isValidName = (name) => {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  return nameRegex.test(name);
};

/**
 * Valida email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida que sea un número entero positivo
 */
export const isPositiveInteger = (value) => {
  const num = parseInt(value, 10);
  return !isNaN(num) && num > 0 && num.toString() === value.toString();
};

/**
 * Valida que el código estudiantil tenga formato válido
 * Ejemplo: 2019123456 (año + código)
 */
export const isValidStudentCode = (code) => {
  const codeRegex = /^\d{10}$/;
  return codeRegex.test(code);
};

/**
 * Valida que sea una fecha válida y no futura
 */
export const isValidPastDate = (date) => {
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj instanceof Date && !isNaN(dateObj) && dateObj <= now;
};

/**
 * Valida que sea una fecha válida y futura
 */
export const isValidFutureDate = (date) => {
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj instanceof Date && !isNaN(dateObj) && dateObj >= now;
};

/**
 * Valida rango de horas (HH:MM)
 */
export const isValidTime = (time) => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
};

/**
 * Valida que una hora sea menor que otra
 */
export const isTimeBeforeTime = (startTime, endTime) => {
  if (!isValidTime(startTime) || !isValidTime(endTime)) return false;
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  return startMinutes < endMinutes;
};

/**
 * Valida longitud mínima de texto
 */
export const hasMinLength = (text, minLength) => {
  return text && text.trim().length >= minLength;
};

/**
 * Valida longitud máxima de texto
 */
export const hasMaxLength = (text, maxLength) => {
  return text && text.trim().length <= maxLength;
};

/**
 * Valida que el texto no contenga números
 */
export const hasNoNumbers = (text) => {
  return !/\d/.test(text);
};

/**
 * Valida que el texto no contenga caracteres especiales (excepto espacios)
 */
export const hasNoSpecialChars = (text) => {
  const specialCharsRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
  return specialCharsRegex.test(text);
};

/**
 * Valida promedio académico (0.0 - 5.0)
 */
export const isValidGPA = (gpa) => {
  const num = parseFloat(gpa);
  return !isNaN(num) && num >= 0 && num <= 5.0;
};

/**
 * Valida semestre (1-10)
 */
export const isValidSemester = (semester) => {
  const num = parseInt(semester, 10);
  return !isNaN(num) && num >= 1 && num <= 10;
};

/**
 * Función principal de validación para formularios de usuarios
 */
export const validateUserForm = (formData) => {
  const errors = {};

  // Validar primer nombre
  if (isEmpty(formData.primerNombre)) {
    errors.primerNombre = 'El primer nombre es obligatorio';
  } else if (!hasMinLength(formData.primerNombre, 2)) {
    errors.primerNombre = 'El primer nombre debe tener al menos 2 caracteres';
  } else if (!hasMaxLength(formData.primerNombre, 50)) {
    errors.primerNombre = 'El primer nombre no puede exceder 50 caracteres';
  } else if (!isValidName(formData.primerNombre)) {
    errors.primerNombre = 'El primer nombre solo puede contener letras';
  }

  // Segundo nombre es opcional, pero si existe debe ser válido
  if (!isEmpty(formData.segundoNombre)) {
    if (!hasMinLength(formData.segundoNombre, 2)) {
      errors.segundoNombre = 'El segundo nombre debe tener al menos 2 caracteres';
    } else if (!hasMaxLength(formData.segundoNombre, 50)) {
      errors.segundoNombre = 'El segundo nombre no puede exceder 50 caracteres';
    } else if (!isValidName(formData.segundoNombre)) {
      errors.segundoNombre = 'El segundo nombre solo puede contener letras';
    }
  }

  // Validar primer apellido
  if (isEmpty(formData.primerApellido)) {
    errors.primerApellido = 'El primer apellido es obligatorio';
  } else if (!hasMinLength(formData.primerApellido, 2)) {
    errors.primerApellido = 'El primer apellido debe tener al menos 2 caracteres';
  } else if (!hasMaxLength(formData.primerApellido, 50)) {
    errors.primerApellido = 'El primer apellido no puede exceder 50 caracteres';
  } else if (!isValidName(formData.primerApellido)) {
    errors.primerApellido = 'El primer apellido solo puede contener letras';
  }

  // Segundo apellido es opcional, pero si existe debe ser válido
  if (!isEmpty(formData.segundoApellido)) {
    if (!hasMinLength(formData.segundoApellido, 2)) {
      errors.segundoApellido = 'El segundo apellido debe tener al menos 2 caracteres';
    } else if (!hasMaxLength(formData.segundoApellido, 50)) {
      errors.segundoApellido = 'El segundo apellido no puede exceder 50 caracteres';
    } else if (!isValidName(formData.segundoApellido)) {
      errors.segundoApellido = 'El segundo apellido solo puede contener letras';
    }
  }

  // Validar rol
  if (isEmpty(formData.rol)) {
    errors.rol = 'Debe seleccionar un rol';
  }

  // Validar programa
  if (isEmpty(formData.programa)) {
    errors.programa = 'Debe seleccionar un programa';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validación para configuración de períodos
 */
export const validatePeriodConfig = (formData) => {
  const errors = {};

  if (isEmpty(formData.nombrePeriodo)) {
    errors.nombrePeriodo = 'El nombre del período es obligatorio';
  }

  if (isEmpty(formData.fechaInicio)) {
    errors.fechaInicio = 'La fecha de inicio es obligatoria';
  } else if (!isValidPastDate(formData.fechaInicio) && !isValidFutureDate(formData.fechaInicio)) {
    errors.fechaInicio = 'La fecha de inicio no es válida';
  }

  if (isEmpty(formData.fechaFin)) {
    errors.fechaFin = 'La fecha de fin es obligatoria';
  } else if (!isValidFutureDate(formData.fechaFin)) {
    errors.fechaFin = 'La fecha de fin debe ser futura';
  }

  // Validar que fecha fin sea después de fecha inicio
  if (formData.fechaInicio && formData.fechaFin) {
    const inicio = new Date(formData.fechaInicio);
    const fin = new Date(formData.fechaFin);
    if (fin <= inicio) {
      errors.fechaFin = 'La fecha de fin debe ser posterior a la fecha de inicio';
    }
  }

  // Si es por horas, validar horarios
  if (formData.tipo === 'horas') {
    if (isEmpty(formData.horaInicio)) {
      errors.horaInicio = 'La hora de inicio es obligatoria';
    } else if (!isValidTime(formData.horaInicio)) {
      errors.horaInicio = 'El formato de hora debe ser HH:MM';
    }

    if (isEmpty(formData.horaFin)) {
      errors.horaFin = 'La hora de fin es obligatoria';
    } else if (!isValidTime(formData.horaFin)) {
      errors.horaFin = 'El formato de hora debe ser HH:MM';
    }

    if (formData.horaInicio && formData.horaFin && !isTimeBeforeTime(formData.horaInicio, formData.horaFin)) {
      errors.horaFin = 'La hora de fin debe ser posterior a la hora de inicio';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validación para solicitudes
 */
export const validateSolicitud = (formData) => {
  const errors = {};

  if (isEmpty(formData.materiaActual)) {
    errors.materiaActual = 'Debe seleccionar la materia actual';
  }

  if (isEmpty(formData.materiaSolicitada)) {
    errors.materiaSolicitada = 'Debe seleccionar la materia solicitada';
  }

  if (formData.materiaActual === formData.materiaSolicitada) {
    errors.materiaSolicitada = 'La materia solicitada debe ser diferente a la actual';
  }

  if (!isEmpty(formData.justificacion) && !hasMinLength(formData.justificacion, 10)) {
    errors.justificacion = 'La justificación debe tener al menos 10 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
