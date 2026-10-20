import React, { useState } from 'react';

const Login = ({ onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      onSelectRole(selectedRole);
    }
  };

  return (
    <div className="container my-4 my-md-5 px-3">
      <div className="text-center mb-4 mb-md-5">
        <h1 className="fw-bold display-5 display-md-4 fs-2 fs-md-1">Portal de Proyectos</h1>
        <p className="text-muted fs-6">Sistema Integrado de Gestión Arquitectónica y Diseño Urbano</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100 p-3 p-md-4 border-0">
            <span className="text-muted small fw-bold">NR. 01</span>
            <h4 className="fw-bold mb-3 fs-5 fs-md-4">Recorrido Virtual</h4>
            <div className="ratio ratio-16x9 bg-black rounded">
              <video controls className="w-100">
                <source src="/recorrido.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100 p-3 p-md-4 border-0">
            <span className="text-muted small fw-bold">NR. 02</span>
            <h4 className="fw-bold mb-3 fs-5 fs-md-4">Acceso al Sistema</h4>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-muted">Seleccionar Perfil / Rol</label>
                <select 
                  className="form-select form-select-lg fs-6" 
                  value={selectedRole} 
                  onChange={(e) => setSelectedRole(e.target.value)}
                  required
                >
                  <option value="">-- Seleccione su Perfil --</option>
                  <option value="cliente">Cliente</option>
                  <option value="arquitectura">Arquitectura</option>
                  <option value="coordinacion">Coordinación</option>
                  <option value="diseno">Diseño Gráfico</option>
                  <option value="estructural">Estructural</option>
                  <option value="admin">Administración</option>
                </select>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-2">
                <button type="submit" className="btn btn-dark w-100 fw-bold py-2">INGRESAR</button>
                <button type="button" className="btn btn-outline-secondary w-100 fw-bold py-2" onClick={() => setSelectedRole('')}>LIMPIAR</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;