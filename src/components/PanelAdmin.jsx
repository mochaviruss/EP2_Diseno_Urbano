import React from 'react';

const PanelAdmin = ({ projects = [] }) => {
  return (
    <div className="card shadow-sm p-3 p-md-4 border-0">
      {/* Tarjetas de Métricas / KPIs */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-4">
          <div className="card bg-dark text-white p-3 border-0 rounded text-center">
            <span className="small text-uppercase text-muted">Total Proyectos</span>
            <h3 className="fw-bold mb-0">{projects?.length || 0}</h3>
          </div>
        </div>
        <div className="col-12 col-sm-4">
          <div className="card bg-success text-white p-3 border-0 rounded text-center">
            <span className="small text-uppercase">En Regla</span>
            <h3 className="fw-bold mb-0">100%</h3>
          </div>
        </div>
        <div className="col-12 col-sm-4">
          <div className="card bg-secondary text-white p-3 border-0 rounded text-center">
            <span className="small text-uppercase">Pruebas Pasadas</span>
            <h3 className="fw-bold mb-0">10 / 10</h3>
          </div>
        </div>
      </div>

      {/* Encabezado del Consolidado */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-3">
        <div>
          <span className="text-muted small fw-bold">NR. 01</span>
          <h3 className="fw-bold mb-0 fs-4 fs-md-3">Consolidado de Proyectos</h3>
        </div>
        <button 
          className="btn btn-dark fw-bold btn-sm align-self-start align-self-sm-center"
          onClick={() => alert('Exportando consolidado de proyectos a Excel...')}
        >
          EXPORTAR A EXCEL
        </button>
      </div>

      {/* Tabla de Proyectos */}
      {projects && projects.length > 0 ? (
        <div className="table-responsive">
          <table className="table align-middle mt-3 text-nowrap">
            <thead>
              <tr className="border-bottom">
                <th>CÓDIGO</th>
                <th>PROYECTO</th>
                <th>AVANCE</th>
                <th>COSTO ESTIMADO</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td className="fw-bold">{p.code}</td>
                  <td>{p.name}</td>
                  <td>{p.progress}%</td>
                  <td>{p.estimatedCost}</td>
                  <td>
                    <span className={`badge ${p.status === 'ENTREGADO' ? 'bg-success' : p.status === 'CANCELADO' ? 'bg-danger' : 'bg-secondary'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center py-4 my-3" role="alert">
          <h5 className="fw-bold mb-1">No hay registros de proyectos</h5>
          <p className="small mb-0 text-muted">Actualmente no existen proyectos registrados en el sistema.</p>
        </div>
      )}
    </div>
  );
};

export default PanelAdmin;