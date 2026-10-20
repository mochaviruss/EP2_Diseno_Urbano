import React, { useState } from 'react';

const PanelCoordinacion = ({ initialTasks }) => {
  const [tasks] = useState(initialTasks || []);
  const [taskUser, setTaskUser] = useState('');
  const [taskDetail, setTaskDetail] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-6">
        <div className="card shadow-sm p-3 p-md-4 border-0 mb-4">
          <span className="text-muted small fw-bold">NR. 01</span>
          <h4 className="fw-bold mb-3 fs-5 fs-md-4">Asignar Tareas</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">SELECCIONAR USUARIO</label>
              <select className="form-select" value={taskUser} onChange={(e) => setTaskUser(e.target.value)}>
                <option value="">-- Seleccione un responsable --</option>
                <option value="user1">Arquitecto Juan</option>
                <option value="user2">Ingeniero Pedro</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">DESCRIPCIÓN DE LA TAREA</label>
              <textarea className="form-control" rows="3" placeholder="Ingrese el detalle de la tarea..." value={taskDetail} onChange={(e) => setTaskDetail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-dark w-100 fw-bold">ASIGNAR TAREA</button>
          </form>
        </div>

        <div className="card shadow-sm p-3 p-md-4 border-0">
          <span className="text-muted small fw-bold">NR. 02</span>
          <h4 className="fw-bold mb-3 fs-5 fs-md-4">Fijar Eventos y Fechas</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">NOMBRE DEL EVENTO</label>
              <input type="text" className="form-control" placeholder="Ej: Reunión con cliente" value={eventName} onChange={(e) => setEventName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">FECHA Y HORA</label>
              <input type="datetime-local" className="form-control" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-dark w-100 fw-bold">GUARDAR EVENTO</button>
          </form>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="card shadow-sm p-3 p-md-4 border-0 h-100">
          <span className="text-muted small fw-bold">MONITOR</span>
          <h4 className="fw-bold mb-3 fs-5 fs-md-4">Estados en Tiempo Real</h4>
          <ul className="list-group list-group-flush">
            {tasks.map((t, idx) => (
              <li key={idx} className="list-group-item px-0 py-2 small fw-semibold text-secondary">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PanelCoordinacion;