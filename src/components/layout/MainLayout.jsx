import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css";

/**
 * Layout principal que combina Sidebar, Header y contenido
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido a renderizar
 * @param {Array} props.menuItems - Items del menú para el Sidebar
 * @param {Function} props.onLogout - Callback para logout
 * @param {string} props.userName - Nombre del usuario para el Header
 * @param {Function} props.onProfileClick - Callback para click en perfil
 */
const MainLayout = ({
  children,
  menuItems = [],
  onLogout,
  userName,
  onProfileClick,
}) => {
  return (
    <div className="layout-container">
      <Sidebar menuItems={menuItems} onLogout={onLogout} />
      <main className="main-content">
        <Header userName={userName} onProfileClick={onProfileClick} />
        <div className="content-wrapper">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
