import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Alert, ProgressBar, Badge } from 'react-bootstrap';
import { getProjects } from '../data/db';

const COLORES = { ENTREGADO: 'success', CANCELADO: 'danger', 'EN CURSO': 'primary' };

const DetalleProyecto = () => {
  const { codigo } = useParams();
  const proyecto = getProjects().find((p) => p.code === codigo);

  if (!proyecto) {
    return (
      <Container className="mt-5 mb-5">
        <Alert variant="warning">No existe un proyecto con el código {codigo}.</Alert>
        <Link to="/categorias" className="btn btn-dark boton-responsivo">Volver a categorías</Link>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <div className="tarjeta-panel shadow-sm">
        <span className="numero-tarjeta">{proyecto.code}</span>
        <div className="tarjeta-panel-encabezado">
          <h2>{proyecto.name}</h2>
        </div>

        <Row className="g-4">
          {proyecto.image && (
            <Col xs={12} lg={6}>
              <img src={proyecto.image} alt={proyecto.name} className="img-fluid rounded w-100" />
            </Col>
          )}
          <Col xs={12} lg={proyecto.image ? 6 : 12}>
            <p className="mb-2">
              <strong>Estado:</strong>{' '}
              <Badge bg={COLORES[proyecto.status] || 'secondary'}>{proyecto.status}</Badge>
            </p>
            <p className="mb-2"><strong>Fecha de inicio:</strong> {proyecto.startDate || 'Sin fecha'}</p>
            <p className="mb-2"><strong>Último entregable:</strong> {proyecto.lastDeliverable || 'N/A'}</p>
            <p className="mb-3"><strong>Costo estimado:</strong> {proyecto.estimatedCost}</p>
            <p className="mb-1"><strong>Avance:</strong></p>
            <ProgressBar now={proyecto.progress} label={`${proyecto.progress}%`} variant="dark" className="mb-4" />
            <Link to="/categorias" className="btn btn-outline-dark boton-responsivo">Volver a categorías</Link>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default DetalleProyecto;
