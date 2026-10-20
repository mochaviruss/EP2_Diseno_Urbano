import React, { useState } from 'react';

const PanelArquitectura = ({ projects, onAddPlano }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [version, setVersion] = useState('');
  const [reviewStatus, setReviewStatus] = useState('Pendiente');

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-6">
        <div className="card shadow-sm p-3 p-md-4 border-0 h-100">
          <span className="text-muted small fw-bold">NR. 01</span>
          <h4 className="fw-bold mb-3 fs-5 fs-md-4">Cargar Nueva Versión de Plano</h4>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">PROYECTO</label>
              <select 
                className="form-select" 
                value={selectedProject} 
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">-- Seleccione Proyecto --</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">VERSIÓN DEL PLANO</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Ej: V2.1, Final" 
                value={version} 
                onChange={(e) => setVersion(e.target.value)} 
              />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">ADJUNTAR ARCHIVO (.DWG, .PDF)</label>
              <input type="file" className="form-control" />
            </div>

            <button type="submit" className="btn btn-dark w-100 fw-bold">CARGAR PLANO</button>
          </form>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="card shadow-sm p-3 p-md-4 border-0 h-100">
          <span className="text-muted small fw-bold">NR. 02</span>
          <h4 className="fw-bold mb-3 fs-5 fs-md-4">Estado de Revisión Técnica</h4>
          
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted text-uppercase">ESTADO DE REVISIÓN</label>
            <select 
              className="form-select" 
              value={reviewStatus} 
              onChange={(e) => setReviewStatus(e.target.value)}
            >
              <option value="Pendiente">Pendiente de Aprobación</option>
              <option value="Aprobado">Aprobado Técnicamente</option>
              <option value="Rechazado">Rechazado con Observaciones</option>
            </select>
          </div>

          <div className="alert alert-secondary mt-4 mb-0" role="alert">
            <h6 className="fw-bold mb-1">Estado Actual:</h6>
            <span className="badge bg-dark fs-6">{reviewStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelArquitectura;