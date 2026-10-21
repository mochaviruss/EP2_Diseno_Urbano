import React, { useState } from 'react';

const PanelEstructural = ({ projects = [] }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [calcReport, setCalcReport] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProject || !calcReport) {
      alert('Por favor complete la información técnica.');
      return;
    }
    alert(`Memoria de cálculo cargada para la revisión del proyecto.`);
    setCalcReport('');
  };

  return (
    <div className="card shadow-sm p-3 p-md-4 border-0">
      <span className="text-muted small fw-bold">NR. 05</span>
      <h3 className="fw-bold mb-4 fs-4 fs-md-3">Panel Estructural</h3>

      {projects && projects.length > 0 ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted text-uppercase">Proyecto</label>
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
            <label className="form-label small fw-bold text-muted text-uppercase">Memoria de Cargas / Observación Técnica</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Detalle los coeficientes sísmicos o especificaciones del hormigón/acero..."
              value={calcReport}
              onChange={(e) => setCalcReport(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark fw-bold w-100 py-2">REGISTRAR INFORME TÉCNICO</button>
        </form>
      ) : (
        <div className="alert alert-info text-center py-4 my-3" role="alert">
          <h5 className="fw-bold mb-1">Sin revisiones pendientes</h5>
          <p className="small mb-0 text-muted">No existen proyectos que requieran cálculo de estructuras en este momento.</p>
        </div>
      )}
    </div>
  );
};

export default PanelEstructural;