import React, { useState } from 'react';

const PanelEstructural = () => {
  const [falla, setFalla] = useState('');
  const [conformidad, setConformidad] = useState(false);

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-6">
        <div className="card shadow-sm p-3 p-md-4 border-0 h-100">
          <span className="text-muted small fw-bold">NR. 01</span>
          <h4 className="fw-bold mb-3 fs-5 fs-md-4">Planos Recibidos (Aprobados)</h4>
          
          <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4">
            <span className="fw-semibold small">Plano_Arquitectura_V2.dwg</span>
            <button className="btn btn-dark btn-sm fw-bold">DESCARGAR</button>
          </div>

          <h5 className="fw-bold small text-uppercase mb-2">Reportar Fallas en Planos</h5>
          <textarea className="form-control mb-1" rows="3" placeholder="Detalle la falla estructural..." value={falla} onChange={(e) => setFalla(e.target.value)} />
          <span className="text-danger small d-block mb-3">Mínimo 20 caracteres obligatorios.</span>
          <button className="btn btn-outline-secondary w-100 fw-bold btn-sm">SOLICITAR REVISIÓN / REPORTAR FALLA</button>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="card shadow-sm p-3 p-md-4 border-0 h-100">
          <span className="text-muted small fw-bold">NR. 02</span>
          <h4 className="fw-bold mb-3 fs-5 fs-md-4">Entrega de Cálculos y Diseño</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">RECEPTOR</label>
              <select className="form-select">
                <option value="">-- Seleccione --</option>
                <option value="1">Jefe de Obra</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">VERSIÓN DE CÁLCULO</label>
              <input type="text" className="form-control" placeholder="Ej: V1, Final" />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">ADJUNTAR MEMORIA (.PDF, .DWG, .ZIP)</label>
              <input type="file" className="form-control" />
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="checkConf" checked={conformidad} onChange={(e) => setConformidad(e.target.checked)} />
              <label className="form-check-label small" htmlFor="checkConf">
                Certifico la conformidad técnica y normativa.
              </label>
            </div>
            <span className="text-danger small d-block mb-3">Debe marcar la casilla de conformidad.</span>
            <button type="submit" className="btn btn-dark w-100 fw-bold">ENVIAR DISEÑO ESTRUCTURAL</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PanelEstructural;