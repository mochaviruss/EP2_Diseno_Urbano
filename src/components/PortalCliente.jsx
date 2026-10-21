import React, { useState } from 'react';

const PortalCliente = ({ projects = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [obs, setObs] = useState({});

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card shadow-sm p-3 p-md-4 border-0 w-100">
      <span className="text-muted small fw-bold">NR. 01</span>
      <h3 className="fw-bold mb-3 fs-4 fs-md-3">Mis Proyectos</h3>

      {/* Buscador en tiempo real */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg fs-6"
          placeholder="🔍 Buscar proyecto por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="d-flex flex-column gap-4 w-100">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((p) => (
            <div key={p.id} className="border rounded p-3 p-md-4 bg-white w-100">
              {/* Imagen expandida con altura adaptable */}
              <div className="bg-secondary rounded mb-3 overflow-hidden" style={{ maxHeight: '400px', width: '100%' }}>
                {p.image ? (
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-100 h-100 object-fit-cover" 
                    style={{ minHeight: '220px', maxHeight: '400px' }} 
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center text-white py-5 fw-bold fs-5">
                    {p.name}
                  </div>
                )}
              </div>
              
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-2">
                <h4 className="fw-bold mb-0 fs-5">{p.name}</h4>
                <span className="badge bg-dark px-3 py-2 align-self-start align-self-sm-center">{p.status}</span>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-12 col-md-6">
                  <p className="text-muted small mb-0"><strong>Fecha de Inicio:</strong> {p.startDate || '2025-10-01'}</p>
                </div>
                <div className="col-12 col-md-6">
                  <p className="text-muted small mb-0"><strong>Último Entregable:</strong> {p.lastDeliverable || 'N/A'}</p>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase">Observaciones del Cliente</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  placeholder="Escribe aquí tus observaciones..."
                  value={obs[p.id] || ''}
                  onChange={(e) => setObs({ ...obs, [p.id]: e.target.value })}
                />
              </div>

              <div className="d-flex flex-column flex-sm-row gap-2">
                <button 
                  className="btn btn-dark fw-bold w-100 py-2"
                  onClick={() => alert(`Entregable para "${p.name}" aprobado exitosamente.`)}
                >
                  APROBAR ENTREGABLE
                </button>
                <button 
                  className="btn btn-outline-dark fw-bold w-100 py-2"
                  onClick={() => alert(`Apelación enviada para "${p.name}".`)}
                >
                  ENVIAR APELACIÓN
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info text-center py-4 my-3 w-100" role="alert">
            <h5 className="fw-bold mb-1">No se encontraron proyectos</h5>
            <p className="small mb-0 text-muted">Intenta con otro término de búsqueda o verifica los registros.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalCliente;