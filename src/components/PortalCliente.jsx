import React, { useState } from 'react';

const PortalCliente = ({ projects }) => {
  const [obs, setObs] = useState({});

  const handleObsChange = (id, text) => {
    setObs({ ...obs, [id]: text });
  };

  return (
    <div className="card shadow-sm p-3 p-md-4 border-0">
      <span className="text-muted small fw-bold">NR. 01</span>
      <h3 className="fw-bold mb-4 fs-4 fs-md-3">Mis Proyectos</h3>

      <div className="d-flex flex-column gap-4">
        {projects.map((p) => (
          <div key={p.id} className="border rounded p-3 bg-white">
            <div className="ratio ratio-21x9 bg-secondary rounded mb-3 overflow-hidden">
              <img src={p.image} alt={p.name} className="object-fit-cover w-100" />
            </div>
            
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-2">
              <h5 className="fw-bold mb-0">Proyecto: {p.name}</h5>
              <span className="badge bg-dark px-3 py-2">{p.status}</span>
            </div>

            <p className="text-muted small mb-1">Fecha de Inicio: {p.startDate}</p>
            <p className="text-muted small mb-3">Último Entregable: {p.lastDeliverable}</p>

            <div className="mb-3">
              <textarea 
                className="form-control form-control-sm" 
                rows="2" 
                placeholder="Escribe aquí tus observaciones..."
                value={obs[p.id] || ''}
                onChange={(e) => handleObsChange(p.id, e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase me-2">ADJUNTAR ARCHIVO</label>
              <input type="file" className="form-control form-control-sm" />
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2">
              <button className="btn btn-dark btn-sm fw-bold w-100">APROBAR ENTREGABLE</button>
              <button className="btn btn-outline-dark btn-sm fw-bold w-100">ENVIAR APELACIÓN</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortalCliente;