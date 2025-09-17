import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileDrawer from './MobileDrawer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleMobileDrawerClose = () => {
    setMobileDrawerOpen(false);
  };

  return (
    <div className={`main-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Desktop */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={handleSidebarToggle}
      />
      
      {/* Main Content Area */}
      <div className="main-content">
        {/* Header */}
        <Header 
          onMenuToggle={handleMobileDrawerToggle}
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={handleSidebarToggle}
        />
        
        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
      
      {/* Mobile Drawer */}
      <MobileDrawer 
        open={mobileDrawerOpen}
        onClose={handleMobileDrawerClose}
      />
    </div>
  );
};

export default MainLayout;
