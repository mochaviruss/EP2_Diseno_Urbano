import React from 'react';

const PanelCoordinacion = ({ projects = [] }) => {
  return (
    <div className="card shadow-sm p-3 p-md-4 border-0">
      <span className="text-muted small fw-bold">NR. 03</span>
      <h3 className="fw-bold mb-4 fs-4 fs-md-3">Panel de Coordinación</h3>

      {projects && projects.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {projects.map((p) => (
            <div key={p.id} className="border rounded p-3 bg-light d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div>
                <h5 className="fw-bold mb-1">{p.name}</h5>
                <p className="small text-muted mb-0">Hito Actual: {p.lastDeliverable || 'Revisión General'}</p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-warning text-dark px-3 py-2">PRIORIDAD ALTA</span>
                <button className="btn btn-dark btn-sm fw-bold">REASIGNAR TAREA</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center py-4 my-3" role="alert">
          <h5 className="fw-bold mb-1">No hay tareas de coordinación</h5>
          <p className="small mb-0 text-muted">Actualmente no existen cronogramas ni hitos pendientes.</p>
        </div>
      )}
    </div>
  );
};

export default PanelCoordinacion;