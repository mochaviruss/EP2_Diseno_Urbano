import { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Alert, Table, Button } from 'react-bootstrap';
import { addProject, getProjects, deleteProject, updateProject } from '../data/db';

const Admin = () => {
  const estadoInicial = { code: '', name: '', startDate: '', status: 'PLANIFICADO', progress: 0, estimatedCost: '' };
  const [formData, setFormData] = useState(estadoInicial);
  const [mensaje, setMensaje] = useState(null);
  const [listaProyectos, setListaProyectos] = useState([]);
  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEdicion, setIdEdicion] = useState(null);

  useEffect(() => {
    setListaProyectos([...getProjects()]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (modoEdicion) {
      updateProject(idEdicion, formData);
      setMensaje(`Proyecto actualizado con exito.`);
    } else {
      addProject(formData);
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
  };

  return (
    <Container className="mt-5 mb-5">
      <div className="tarjeta-panel shadow-sm mb-4">
        <div className="tarjeta-panel-encabezado">
          <h2>{modoEdicion ? 'Editar Proyecto' : 'Registrar Nuevo Proyecto'}</h2>
        </div>
        {mensaje && <Alert variant="success">{mensaje}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label className="form-label">Codigo</Form.Label>
              <Form.Control type="text" name="code" value={formData.code} onChange={handleChange} required />
            </Form.Group>
            <Form.Group as={Col} md="8">
              <Form.Label className="form-label">Nombre del Proyecto</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label className="form-label">Fecha de Inicio</Form.Label>
              <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="form-label">Estado</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleChange}>
                <option value="PLANIFICADO">Planificado</option>
                <option value="EN CURSO">En Curso</option>
                <option value="ENTREGADO">Entregado</option>
                <option value="CANCELADO">Cancelado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="form-label">Avance (%)</Form.Label>
              <Form.Control type="number" name="progress" min="0" max="100" value={formData.progress} onChange={handleChange} />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} md="6">
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

      <div className="tarjeta-panel shadow-sm">
        <div className="tarjeta-panel-encabezado">
          <h2>Proyectos Existentes</h2>
        </div>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Avance</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaProyectos.map(p => (
              <tr key={p.id}>
                <td>{p.code}</td>
                <td>{p.name}</td>
                <td>{p.status}</td>
                <td>{p.progress}%</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="warning" size="sm" onClick={() => handleEdit(p)}>Editar</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Eliminar</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Admin;