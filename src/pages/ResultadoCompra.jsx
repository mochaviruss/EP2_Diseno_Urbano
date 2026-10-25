import { useLocation, Link } from 'react-router-dom';
import { Container, Alert, Table } from 'react-bootstrap';

const ResultadoCompra = ({ exito }) => {
  const { state } = useLocation();

  if (!state) {
    return (
      <Container className="mt-5 mb-5">
        <Alert variant="info">No hay un pago para mostrar.</Alert>
        <Link to="/checkout" className="btn btn-dark">Ir al checkout</Link>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <div className="tarjeta-panel shadow-sm">
        <div className="tarjeta-panel-encabezado">
          <h2>{exito ? 'Pago exitoso' : 'No se pudo realizar el pago'}</h2>
        </div>
        <Alert variant={exito ? 'success' : 'danger'}>
          {exito ? 'Tu orden fue generada correctamente.' : 'Revisa tus datos e inténtalo de nuevo.'}
        </Alert>
        <Table>
          <tbody>
            <tr><th>Cliente</th><td>{state.nombre}</td></tr>
            <tr><th>Correo</th><td>{state.correo}</td></tr>
            <tr><th>Dirección</th><td>{state.calle}, {state.comuna}</td></tr>
          </tbody>
        </Table>
        <Link to={exito ? '/' : '/checkout'} className="btn btn-dark">
          {exito ? 'Volver al inicio' : 'Intentar de nuevo'}
        </Link>
      </div>
    </Container>
  );
};

export default ResultadoCompra;
