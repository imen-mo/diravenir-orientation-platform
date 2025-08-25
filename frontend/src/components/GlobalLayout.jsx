import React from 'react';
import GlobalNavbar from './GlobalNavbar';
import Footer from './Footer';
import '../styles/GlobalLayout.css';

const GlobalLayout = ({ children, activePage = '' }) => {
  return (
    <div className="global-layout">
      <GlobalNavbar activePage={activePage} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
