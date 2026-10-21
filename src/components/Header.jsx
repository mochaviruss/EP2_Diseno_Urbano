// src/components/Header.jsx
import React from 'react';

const Header = ({ title, subtitle, onLogout, onReset }) => {
  return (
    <header className="bg-dark text-white py-3 px-3 px-md-5 w-100 shadow-sm border-bottom border-secondary">
      <div className="container-fluid p-0 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold fs-4 tracking-wide">{title || 'EP2 - Portal de Proyectos'}</span>
          </div>
          {subtitle && (
            <p className="text-muted small mb-0 mt-1 d-none d-sm-block">{subtitle}</p>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 align-self-end align-self-md-center">
          {onReset && (
            <button 
              onClick={onReset} 
              className="btn btn-outline-secondary btn-sm text-white fw-bold px-3 py-2"
            >
              REINICIAR VISTA
            </button>
          )}
          {onLogout && (
            <button 
              onClick={onLogout} 
              className="btn btn-outline-light btn-sm fw-bold px-3 py-2"
            >
              CERRAR SESIÓN
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;