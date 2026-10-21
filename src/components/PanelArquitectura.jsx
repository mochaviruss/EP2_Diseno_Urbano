import React, { useState } from 'react';

const PanelArquitectura = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [version, setVersion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProject || !version) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }
    alert(`Plano ${version} cargado exitosamente para el proyecto.`);
    setVersion('');
  };

  return (
    <div className="card shadow-sm p-3 p-md-4 border-0">
      <span className="text-muted small fw-bold">NR. 02</span>
      <h3 className="fw-bold mb-4 fs-4 fs-md-3">Panel de Arquitectura</h3>

      {projects && projects.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted text-uppercase">
              Seleccionar Proyecto
            </label>
            <select
              className="form-select"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">-- Seleccione un Proyecto --</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted text-uppercase">
              Versión del Plano (.DWG / .PDF)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ej. v1.2 - Corrección de Elevaciones"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark fw-bold w-100 py-2">
            CARGAR PLANO
          </button>
        </form>
      ) : (
        <div className="alert alert-info text-center py-4 my-3" role="alert">
          <h5 className="fw-bold mb-1">No hay proyectos asignados</h5>
          <p className="small mb-0 text-muted">Actualmente no existen registros disponibles para este perfil.</p>
        </div>
      )}
    </div>
  );
};

export default PanelArquitectura;