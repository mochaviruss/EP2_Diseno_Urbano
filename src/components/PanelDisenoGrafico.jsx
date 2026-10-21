import React, { useState } from 'react';

const PanelDisenoGrafico = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [renderName, setRenderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProject || !renderName) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }
    alert(`Render "${renderName}" asignado correctamente al proyecto.`);
    setRenderName('');
  };

  return (
    <div className="card shadow-sm p-3 p-md-4 border-0">
      <span className="text-muted small fw-bold">NR. 04</span>
      <h3 className="fw-bold mb-4 fs-4 fs-md-3">Panel de Diseño Gráfico</h3>

      {projects && projects.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted text-uppercase">Proyecto Asociado</label>
            <select
              className="form-select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">-- Seleccione un Proyecto --</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted text-uppercase">Nombre del Render / Material 3D</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej. Vista Axonométrica - Fachada Norte"
              value={renderName}
              onChange={(e) => setRenderName(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark fw-bold w-100 py-2">SUBIR RECURSO VISUAL</button>
        </form>
      ) : (
        <div className="alert alert-info text-center py-4 my-3" role="alert">
          <h5 className="fw-bold mb-1">Sin solicitudes de diseño</h5>
          <p className="small mb-0 text-muted">No existen requerimientos gráficos activos para mostrar.</p>
        </div>
      )}
    </div>
  );
};

export default PanelDisenoGrafico;