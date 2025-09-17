import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import GlobalNavbar from './GlobalNavbar';
import StudentSidebar from './StudentSidebar';
import Footer from './Footer';
import './StudentLayout.css';

const StudentLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="student-layout">
      {/* Navbar fixe en haut */}
      <GlobalNavbar activePage="dashboard-student" />
      
      {/* Contenu principal avec sidebar */}
      <div className="student-layout-content">
        {/* Sidebar */}
        <StudentSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        {/* Zone de contenu principal */}
        <main className="student-main-area">
          <Outlet />
        </main>
      </div>
      
      {/* Footer fixe en bas */}
      <Footer />
    </div>
  );
};

export default StudentLayout;
