import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Checkout = () => {
  const [formData, setFormData] = useState({ nombre: '', correo: '', calle: '', comuna: '' });
  const [pagoExitoso, setPagoExitoso] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre && formData.calle) {
      setPagoExitoso(true);
    } else {
      setPagoExitoso(false);
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <div className="tarjeta-panel shadow-sm">
        <div className="tarjeta-panel-encabezado">
          <h2>Checkout - Pagar Adelanto</h2>
        </div>
        {pagoExitoso === true && <Alert variant="success">Pago exitoso. Orden generada.</Alert>}
        {pagoExitoso === false && <Alert variant="danger">Error en el pago. Revisa tus datos.</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label className="form-label">Nombre Cliente</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label className="form-label">Correo</Form.Label>
              <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} md="8">
              <Form.Label className="form-label">Direccion del Proyecto</Form.Label>
              <Form.Control type="text" name="calle" placeholder="Ej. Av. Siempreviva 742" value={formData.calle} onChange={handleChange} required />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="form-label">Comuna</Form.Label>
              <Form.Control type="text" name="comuna" value={formData.comuna} onChange={handleChange} required />
            </Form.Group>
          </Row>
          <Button type="submit" className="btn btn-dark boton-responsivo">Simular Pago</Button>
        </Form>
      </div>
    </Container>
  );
};
export default Checkout;