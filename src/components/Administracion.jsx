import { useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { proyectosData } from '../db';

const Administracion = () => {
  const [proyectos, setProyectos] = useState(proyectosData);

  const eliminarProyecto = (id) => {
    const filtrados = proyectos.filter(proyecto => proyecto.id !== id);
    setProyectos(filtrados);
  };

  return (
    <Container className="mt-5">
      <h2>Panel de Administración</h2>
      <Button variant="success" className="mb-3">Agregar Nuevo Proyecto</Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Costo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto) => (
            <tr key={proyecto.id}>
              <td>{proyecto.codigo}</td>
              <td>{proyecto.nombre}</td>
              <td>{proyecto.estado}</td>
              <td>{proyecto.costo}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm" onClick={() => eliminarProyecto(proyecto.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Administracion;