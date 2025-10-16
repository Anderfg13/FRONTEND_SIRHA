import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const AuthContext = createContext(null);

/**
 * Provider de autenticación
 * Maneja el estado del usuario autenticado y proporciona métodos para login/logout
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('sirha_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('sirha_user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login de usuario
   * @param {Object} userData - Datos del usuario {id, nombre, email, rol, programa}
   */
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('sirha_user', JSON.stringify(userData));
  };

  /**
   * Logout de usuario
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sirha_user');
  };

  /**
   * Verificar si el usuario tiene un rol específico
   * @param {string} rol - Rol a verificar ('admin', 'estudiante', 'decanatura')
   */
  const hasRole = (rol) => {
    return user?.rol?.toLowerCase() === rol.toLowerCase();
  };

  /**
   * Obtener iniciales del usuario
   */
  const getUserInitials = () => {
    if (!user?.nombre) return '??';
    const names = user.nombre.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.nombre.substring(0, 2).toUpperCase();
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasRole,
    getUserInitials,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para usar el contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
