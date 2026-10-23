import { useState } from 'react';
import { Container, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../data/db';

const Categorias = () => {
  const [proyectos] = useState(getProjects);
  const [filtro, setFiltro] = useState('TODOS');

  const proyectosFiltrados = filtro === 'TODOS' 
    ? proyectos 
    : proyectos.filter(p => p.status === filtro);

  return (
    <Container className="mt-5 mb-5">
      <h2 className="mb-4 font-weight-bold">Categorias de Proyectos</h2>
      
      <ButtonGroup className="mb-4 d-flex flex-wrap shadow-sm">
        <Button variant={filtro === 'TODOS' ? 'dark' : 'outline-dark'} onClick={() => setFiltro('TODOS')}>Todos</Button>
        <Button variant={filtro === 'PLANIFICADO' ? 'dark' : 'outline-dark'} onClick={() => setFiltro('PLANIFICADO')}>Planificados</Button>
        <Button variant={filtro === 'EN CURSO' ? 'dark' : 'outline-dark'} onClick={() => setFiltro('EN CURSO')}>En Curso</Button>
        <Button variant={filtro === 'ENTREGADO' ? 'dark' : 'outline-dark'} onClick={() => setFiltro('ENTREGADO')}>Entregados</Button>
      </ButtonGroup>

      <Row className="g-4">
        {proyectosFiltrados.length > 0 ? (
          proyectosFiltrados.map(p => (
            <Col key={p.id} xs={12} md={6} lg={4}>
              <ProjectCard project={p} />
            </Col>
          ))
        ) : (
          <Col><p className="text-muted">No hay proyectos en esta categoria.</p></Col>
        )}
      </Row>
    </Container>
  );
};
export default Categorias;