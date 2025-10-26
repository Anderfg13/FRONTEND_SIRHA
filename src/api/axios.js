import axios from 'axios';

// Cambia esta URL según el entorno:
// - Para desarrollo local: 'http://localhost:3001/api'
// - Para producción Azure: 'https://sirha-api-container-dpf8cwgfbfd3c8f3.westus3-01.azurewebsites.net/api'
const BASE_URL = 'https://sirha-api-container-dpf8cwgfbfd3c8f3.westus3-01.azurewebsites.net/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // Puedes agregar headers por defecto aquí si tu API los requiere
  // headers: {
  //   'Authorization': 'Bearer TU_TOKEN',
  //   'Content-Type': 'application/json'
  // }
});

// Interceptor para agregar lógica antes de cada request (ej: token)
axiosInstance.interceptors.request.use(
  config => {
    // Ejemplo: agregar token dinámicamente si lo tienes en localStorage
    // const token = localStorage.getItem('token');
    // if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
