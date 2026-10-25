import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Checkout = () => {
  const [formData, setFormData] = useState({ nombre: '', correo: '', calle: '', comuna: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre.trim() && /\S+@\S+\.\S+/.test(formData.correo) && formData.calle.trim() && formData.comuna.trim()) {
      navigate('/checkout/exito', { state: formData });
    } else {
      navigate('/checkout/error', { state: formData });
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <div className="tarjeta-panel shadow-sm">
        <div className="tarjeta-panel-encabezado">
          <h2>Checkout - Pagar Adelanto</h2>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group controlId="nombre" as={Col} md="6">
              <Form.Label className="form-label">Nombre Cliente</Form.Label>
              <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="correo" as={Col} md="6">
              <Form.Label className="form-label">Correo</Form.Label>
              <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} required />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group controlId="calle" as={Col} md="8">
              <Form.Label className="form-label">Direccion del Proyecto</Form.Label>
              <Form.Control type="text" name="calle" placeholder="Ej. Av. Siempreviva 742" value={formData.calle} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="comuna" as={Col} md="4">
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