import React, { useState } from 'react';
import CarruselZoom from './CarruselZoom';
import { syncProjectsFromApi } from '../data/db';

const API_URL = import.meta.env.VITE_API_URL || 'http://35.175.222.93:8080/api/v1';

const BANNERS = [
  { src: '/img/banner1.jpg', titulo: 'Disenamos espacios para vivir', texto: 'Mas de 15 anos creando proyectos de arquitectura y urbanismo.' },
  { src: '/img/banner2.jpg', titulo: 'Sigue tu proyecto en tiempo real', texto: 'Revisa el estado y avance de tus proyectos desde cualquier dispositivo.' },
  { src: '/img/banner3.jpg', titulo: 'Un solo equipo, todo coordinado', texto: 'Arquitectos, disenadores e ingenieros trabajando en un mismo lugar.' },
];

const CREDENCIALES_POR_ROL = {
  cliente: 'cliente@disenourbano.cl',
  arquitectura: 'arquitecto@disenourbano.cl',
  coordinacion: 'coordinador@disenourbano.cl',
  diseno: 'disenador@disenourbano.cl',
  estructural: 'ingeniero@disenourbano.cl',
  admin: 'admin@disenourbano.cl',
};

const Login = ({ onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [password, setPassword] = useState('duoc123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      setError('Debe seleccionar un perfil para acceder al sistema.');
      return;
    }

    setError('');
    setLoading(true);
    const correo = CREDENCIALES_POR_ROL[selectedRole];

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, clave: password })
      });

      if (!response.ok) {
        throw new Error('Credenciales invalidas o error en el servidor.');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('rol', data.rol || selectedRole);
        localStorage.setItem('usuarioNombre', data.nombre || '');
        localStorage.setItem('usuarioEmail', data.correo || correo);
      }

      await syncProjectsFromApi();
      onSelectRole(selectedRole);
    } catch (err) {
      setError('No se pudo autenticar con el servidor. Verifica tu contrasena (duoc123).');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedRole('');
    setPassword('duoc123');
    setError('');
  };

  return (
    <div className="container my-4 my-md-5 px-3">
      <div className="text-center mb-4 mb-md-5">
        <h1 className="fw-bold display-5 display-md-4 fs-2 fs-md-1">Portal de Proyectos</h1>
        <p className="text-muted fs-6">Sistema Integrado de Gestion Arquitectonica y Diseno Urbano</p>
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
                Tu navegador no soporta la reproduccion de video.
              </video>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100 p-3 p-md-4 border-0">
            <span className="text-muted small fw-bold">NR. 02</span>
            <h4 className="fw-bold mb-3 fs-5 fs-md-4">Acceso al Sistema (JWT)</h4>
            
            {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
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
                  <option value="cliente">Cliente (cliente@disenourbano.cl)</option>
                  <option value="arquitectura">Arquitectura (arquitecto@disenourbano.cl)</option>
                  <option value="coordinacion">Coordinacion (coordinador@disenourbano.cl)</option>
                  <option value="diseno">Diseno Grafico (disenador@disenourbano.cl)</option>
                  <option value="estructural">Estructural (ingeniero@disenourbano.cl)</option>
                  <option value="admin">Administracion (admin@disenourbano.cl)</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-muted">Contrasena</label>
                <input
                  type="password"
                  className="form-control form-control-lg fs-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex flex-column flex-sm-row gap-2">
                <button type="submit" className="btn btn-dark w-100 fw-bold py-2" disabled={loading}>
                  {loading ? 'CONECTANDO...' : 'INGRESAR'}
                </button>
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
