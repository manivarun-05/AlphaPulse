import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <div className={`layout ${isCollapsed ? 'layout--collapsed' : ''}`}>
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={toggleSidebar}
          isMobileOpen={isMobileOpen}
          onMobileClose={() => setIsMobileOpen(false)}
        />

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleMobile}>
          <i className={`bi ${isMobileOpen ? 'bi-x-lg' : 'bi-list'}`}></i>
        </button>

        <main className={`main-content ${isCollapsed ? 'main-content--expanded' : ''}`}>
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && <div className="mobile-overlay" onClick={() => setIsMobileOpen(false)}></div>}
    </>
  );
};

export default Layout;
