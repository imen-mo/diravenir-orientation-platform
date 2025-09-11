import React, { useState } from 'react';
import AdminDashboardModernComplete from './AdminDashboardModernComplete';
import StudentDashboardModern from './StudentDashboardModern';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

const DashboardTestComplete = () => {
  const [currentDashboard, setCurrentDashboard] = useState('admin');

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Toggle Button */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        background: 'white',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '14px', fontWeight: '600' }}>
          {currentDashboard === 'admin' ? 'Admin Dashboard' : 'Student Dashboard'}
        </span>
        <button
          onClick={() => setCurrentDashboard(currentDashboard === 'admin' ? 'student' : 'admin')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: currentDashboard === 'admin' ? '#10B981' : '#6B7280'
          }}
        >
          {currentDashboard === 'admin' ? <FaToggleOn /> : <FaToggleOff />}
        </button>
      </div>

      {/* Dashboard Content */}
      {currentDashboard === 'admin' ? (
        <AdminDashboardModernComplete />
      ) : (
        <StudentDashboardModern />
      )}
    </div>
  );
};

export default DashboardTestComplete;
