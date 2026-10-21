import { useState } from 'react';
import { Container, Form, Row, Col, Alert } from 'react-bootstrap';

const Arquitecto = () => {
  const [formData, setFormData] = useState({ proyecto: '', version: '', fecha: '', comentario: '' });
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subirPlano = () => {
    if (!formData.proyecto || !formData.version || !formData.fecha || !formData.comentario) {
      setError(true); setMensaje(null); return;
    }
    setError(false);
    setMensaje("Plano registrado exitosamente. Control de versiones actualizado.");
    setFormData({ proyecto: '', version: '', fecha: '', comentario: '' });
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="tarjeta-panel shadow-sm">
            <span className="numero-tarjeta">NR. 01</span>
            <div className="tarjeta-panel-encabezado">
              <h2>Subir Nueva Version de Plano</h2>
            </div>
            {error && <Alert variant="danger">Debe completar todos los campos obligatorios.</Alert>}
            {mensaje && <Alert variant="success">{mensaje}</Alert>}

            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Label className="form-label">Proyecto</Form.Label>
                  <Form.Select name="proyecto" value={formData.proyecto} onChange={handleChange}>
                    <option value="">-- Seleccione --</option>
                    <option value="PR001">Centro Comercial La Florida</option>
                    <option value="PR002">Parque Urbano Las Rosas</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label className="form-label">Numero de Version</Form.Label>
                  <Form.Control type="text" name="version" placeholder="Ej: v2.1" value={formData.version} onChange={handleChange} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12">
                  <Form.Label className="form-label">Fecha</Form.Label>
                  <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                </Form.Group>
              </Row>
              <Row className="mb-4">
                <Form.Group as={Col} md="12">
                  <Form.Label className="form-label">Comentario</Form.Label>
                  <Form.Control as="textarea" name="comentario" rows={3} placeholder="Detalle los cambios..." value={formData.comentario} onChange={handleChange} />
                </Form.Group>
              </Row>
              <div className="d-flex gap-2 mt-4">
                <button type="button" className="btn btn-dark boton-responsivo flex-grow-1" onClick={subirPlano}>Cargar Plano</button>
                <button type="button" className="btn btn-outline-dark boton-responsivo flex-grow-1" onClick={() => alert("Marcado 'En Revision'.")}>Marcar Tarea como En Revision</button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Arquitecto;