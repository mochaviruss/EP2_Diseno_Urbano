import { useState } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import PaginaRol from '../components/PaginaRol';
import PanelAdmin from '../components/PanelAdmin';
import { addProject, getProjects, deleteProject, updateProject } from '../data/db';

const Admin = () => {
  const estadoInicial = { code: '', name: '', startDate: '', status: 'PLANIFICADO', progress: 0, estimatedCost: '' };
  const [formData, setFormData] = useState(estadoInicial);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [listaProyectos, setListaProyectos] = useState(() => [...getProjects()]);
  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEdicion, setIdEdicion] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const codigo = formData.code.trim().toUpperCase();
    if (!codigo || !formData.name.trim() || !formData.estimatedCost.trim()) {
      setError('Complete los campos obligatorios (no se aceptan solo espacios).');
      return;
    }
    if (listaProyectos.some((p) => p.code === codigo && p.id !== idEdicion)) {
      setError(`Ya existe un proyecto con el código ${codigo}.`);
      return;
    }
    setError(null);
    const datos = { ...formData, code: codigo, name: formData.name.trim(), progress: Number(formData.progress) };

    if (modoEdicion) {
      updateProject(idEdicion, datos);
      setMensaje(`Proyecto actualizado con exito.`);
    } else {
      addProject(datos);
      setMensaje(`Proyecto agregado con exito.`);
    }

    setFormData(estadoInicial);
    setModoEdicion(false);
    setIdEdicion(null);
    setListaProyectos([...getProjects()]);
    
    setTimeout(() => setMensaje(null), 3000);
  };

  const handleDelete = (id) => {
    if(window.confirm("¿Seguro que deseas eliminar este proyecto?")) {
      deleteProject(id);
      if (id === idEdicion) cancelarEdicion();
      setListaProyectos([...getProjects()]);
    }
  };

  const handleEdit = (proyecto) => {
    setModoEdicion(true);
    setIdEdicion(proyecto.id);
    setFormData({
      code: proyecto.code,
      name: proyecto.name,
      startDate: proyecto.startDate,
      status: proyecto.status,
      progress: proyecto.progress,
      estimatedCost: proyecto.estimatedCost
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setIdEdicion(null);
    setFormData(estadoInicial);
    setError(null);
  };

  return (
    <PaginaRol
      titulo="Panel de Administración"
      subtitulo="Reportes consolidado de avance y gestión financiera de proyectos"
    >
      <div className="tarjeta-panel shadow-sm mb-4">
        <div className="tarjeta-panel-encabezado">
          <h2>{modoEdicion ? 'Editar Proyecto' : 'Registrar Nuevo Proyecto'}</h2>
        </div>
        {mensaje && <Alert variant="success">{mensaje}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group controlId="code" as={Col} md="4">
              <Form.Label className="form-label">Codigo</Form.Label>
              <Form.Control type="text" name="code" value={formData.code} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="name" as={Col} md="8">
              <Form.Label className="form-label">Nombre del Proyecto</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="startDate" as={Col} md="4">
              <Form.Label className="form-label">Fecha de Inicio</Form.Label>
              <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="status" as={Col} md="4">
              <Form.Label className="form-label">Estado</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="PLANIFICADO">Planificado</option>
                <option value="EN CURSO">En Curso</option>
                <option value="ENTREGADO">Entregado</option>
                <option value="CANCELADO">Cancelado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="progress" as={Col} md="4">
              <Form.Label className="form-label">Avance (%)</Form.Label>
              <Form.Control type="number" name="progress" min="0" max="100" value={formData.progress} onChange={handleChange} />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group controlId="estimatedCost" as={Col} md="6">
              <Form.Label className="form-label">Costo Estimado</Form.Label>
              <Form.Control type="text" name="estimatedCost" value={formData.estimatedCost} onChange={handleChange} required />
            </Form.Group>
          </Row>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-dark boton-responsivo">
              {modoEdicion ? 'Actualizar Proyecto' : 'Guardar Proyecto'}
            </button>
            {modoEdicion && (
              <button type="button" className="btn btn-outline-secondary boton-responsivo" onClick={cancelarEdicion}>
                Cancelar
              </button>
            )}
          </div>
        </Form>
      </div>

      <PanelAdmin projects={listaProyectos} onEditar={handleEdit} onEliminar={handleDelete} />
    </PaginaRol>
  );
};

export default Admin;