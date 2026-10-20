import React from 'react';

const Header = ({ title, subtitle, onLogout, onReset }) => {
  return (
    <header className="bg-dark text-white p-3 p-md-4 mb-4 shadow-sm">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h1 className="fw-bold mb-1 fs-3 fs-md-2">{title}</h1>
          {subtitle && <p className="text-secondary small mb-0 fs-6">{subtitle}</p>}
        </div>
        <div className="d-flex flex-wrap gap-2">
          {onLogout && (
            <button className="btn btn-outline-light btn-sm fw-bold flex-grow-1 flex-md-grow-0" onClick={onLogout}>
              ← VOLVER AL LOGIN
            </button>
          )}
          {onReset && (
            <button className="btn btn-outline-light btn-sm fw-bold flex-grow-1 flex-md-grow-0" onClick={onReset}>
              REINICIAR DATOS
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;