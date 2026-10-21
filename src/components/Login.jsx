import React, { useState } from 'react';
import CarruselZoom from './CarruselZoom';

const BANNERS = [
  { src: '/img/banner1.jpg', titulo: 'Diseñamos espacios para vivir', texto: 'Más de 15 años creando proyectos de arquitectura y urbanismo.' },
  { src: '/img/banner2.jpg', titulo: 'Sigue tu proyecto en tiempo real', texto: 'Revisa el estado y avance de tus proyectos desde cualquier dispositivo.' },
  { src: '/img/banner3.jpg', titulo: 'Un solo equipo, todo coordinado', texto: 'Arquitectos, diseñadores e ingenieros trabajando en un mismo lugar.' },
];

const Login = ({ onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) {
      setError('Debe seleccionar un perfil para acceder al sistema.');
      return;
    }
    setError('');
    onSelectRole(selectedRole);
  };

  const handleReset = () => {
    setSelectedRole('');
    setError('');
  };

  return (
    <div className="container my-4 my-md-5 px-3">
      <div className="text-center mb-4 mb-md-5">
        <h1 className="fw-bold display-5 display-md-4 fs-2 fs-md-1">Portal de Proyectos</h1>
        <p className="text-muted fs-6">Sistema Integrado de Gestión Arquitectónica y Diseño Urbano</p>
      </div>

      <div className="mb-4">
        <CarruselZoom imagenes={BANNERS} />
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100 p-3 p-md-4 border-0">
            <span className="text-muted small fw-bold">NR. 01</span>
            <h4 className="fw-bold mb-3 fs-5 fs-md-4">Recorrido Virtual</h4>
            <div className="ratio ratio-16x9 bg-black rounded">
              <video controls autoPlay muted loop playsInline className="w-100" poster="/img/recorrido-portada.jpg">
                <source src="/img/recorrido.webm" type="video/webm" />
                <source src="/img/recorrido.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100 p-3 p-md-4 border-0">
            <span className="text-muted small fw-bold">NR. 02</span>
            <h4 className="fw-bold mb-3 fs-5 fs-md-4">Acceso al Sistema</h4>
            
            {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-muted">Seleccionar Perfil / Rol</label>
                <select 
                  className="form-select form-select-lg fs-6" 
                  value={selectedRole} 
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    if (error) setError('');
                  }}
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
                <button type="button" className="btn btn-outline-secondary w-100 fw-bold py-2" onClick={handleReset}>LIMPIAR</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;