import React from 'react';

const PanelAdmin = ({ projects }) => {
  return (
    <div className="card shadow-sm p-3 p-md-4 border-0">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-3">
        <div>
          <span className="text-muted small fw-bold">NR. 01</span>
          <h3 className="fw-bold mb-0 fs-4 fs-md-3">Consolidado de Proyectos</h3>
        </div>
        <button className="btn btn-dark fw-bold btn-sm align-self-start align-self-sm-center">
          EXPORTAR A EXCEL
        </button>
      </div>

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
    </div>
  );
};

export default PanelAdmin;