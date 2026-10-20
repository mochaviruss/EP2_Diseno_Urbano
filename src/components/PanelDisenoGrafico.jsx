import React, { useState } from 'react';

const PanelDisenoGrafico = () => {
  const [reason, setReason] = useState('');

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-6">
        <div className="card shadow-sm p-3 p-md-4 border-0 h-100">
          <span className="text-muted small fw-bold">NR. 01</span>
          <h4 className="fw-bold mb-3 fs-5 fs-md-4">Gestionar Solicitud</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">SOLICITUD PENDIENTE</label>
              <select className="form-select">
                <option value="1">Render Fachada Principal</option>
                <option value="2">Plano 3D Iluminación</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">MOTIVO DE RECHAZO (SOLO SI SE RECHAZA)</label>
              <textarea className="form-control" rows="3" placeholder="Especifique el motivo en caso de rechazo..." value={reason} onChange={(e) => setReason(e.target.value)} />
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-dark w-100 fw-bold">ACEPTAR</button>
              <button type="button" className="btn btn-outline-dark w-100 fw-bold">RECHAZAR</button>
            </div>
          </form>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="card shadow-sm p-3 p-md-4 border-0 h-100">
          <span className="text-muted small fw-bold">NR. 02</span>
          <h4 className="fw-bold mb-3 fs-5 fs-md-4">Entrega de Material Visual</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">DESTINATARIO / CLIENTE</label>
              <select className="form-select">
                <option value="">-- Seleccione Cliente --</option>
                <option value="c1">Inmobiliaria del Sur</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">NOTAS DE AVANCE</label>
              <textarea className="form-control" rows="3" placeholder="Detalle las observaciones de la entrega..." />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">ADJUNTAR ARCHIVO (.PDF, .PNG, .ZIP, .AI)</label>
              <input type="file" className="form-control" />
            </div>
            <button type="submit" className="btn btn-dark w-100 fw-bold">ENVIAR MATERIAL</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PanelDisenoGrafico;