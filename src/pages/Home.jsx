import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';

const Home = () => {
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);
  const [indiceActual, setIndiceActual] = useState(0);
  
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const navigate = useNavigate();
  const imagenes = ["/Banner1.jpg", "/Banner2.jpg", "/Banner3.jpg"];

  const irSiguiente = useCallback(() => {
    setIndiceActual((prev) => (prev + 1) % imagenes.length);
  }, [imagenes.length]);

  const irAnterior = useCallback(() => {
    setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  }, [imagenes.length]);

  useEffect(() => {
    const intervalo = setInterval(irSiguiente, 3500);
    return () => clearInterval(intervalo);
  }, [irSiguiente]);

  useEffect(() => {
    const manejarTeclado = (e) => {
      if (e.key === 'ArrowLeft') irAnterior();
      if (e.key === 'ArrowRight') irSiguiente();
    };
    window.addEventListener('keydown', manejarTeclado);
    return () => window.removeEventListener('keydown', manejarTeclado);
  }, [irAnterior, irSiguiente]);

  const iniciarArrastre = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
  };

  const moverArrastre = (e) => {
    if (!isDragging || startX === null) return;
    const actualX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
    const diferencia = startX - actualX;

    if (diferencia > 50) {
      irSiguiente();
      setIsDragging(false);
      setStartX(null);
    } else if (diferencia < -50) {
      irAnterior();
      setIsDragging(false);
      setStartX(null);
    }
  };

  const terminarArrastre = () => {
    setIsDragging(false);
    setStartX(null);
  };

  const ingresarSistema = () => {
    if (rolSeleccionado === "") {
      setErrorLogin(true);
    } else {
      setErrorLogin(false);
      navigate(rolSeleccionado);
    }
  };

  return (
    <>
      <div className="hero-section">
        <Container>
          <h1>Portal de Proyectos</h1>
          <p style={{ color: '#a0a0a5' }}>Sistema Integrado de Gestion Arquitectonica y Diseno Urbano</p>
        </Container>
      </div>

      <Container className="mb-5">
        <div className="carrusel-top-container">
          <div 
            className="carrusel-wrapper"
            onMouseDown={iniciarArrastre}
            onMouseMove={moverArrastre}
            onMouseUp={terminarArrastre}
            onMouseLeave={terminarArrastre}
            onTouchStart={iniciarArrastre}
            onTouchMove={moverArrastre}
            onTouchEnd={terminarArrastre}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div 
              className="carrusel-track" 
              style={{ 
                transform: `translateX(calc(15% - ${indiceActual * 70}% - ${indiceActual * 20}px))`,
                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {imagenes.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`Banner ${index + 1}`} 
                  draggable="false"
                  style={{ 
                    opacity: index === indiceActual ? 1 : 0.4, 
                    transform: index === indiceActual ? 'scale(1)' : 'scale(0.9)',
                    transition: 'all 0.6s ease'
                  }} 
                />
              ))}
            </div>
          </div>
        </div>

        <Row className="g-4">
          <Col md={6}>
            <div className="tarjeta-panel shadow-sm">
              <h2 className="mb-4">Recorrido Virtual</h2>
              <video 
                controls 
                autoPlay 
                muted 
                loop 
                style={{ width: '100%', borderRadius: '8px', border: '1px solid #e5e5e7' }}
              >
                <source src="/recorrido.mp4" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
          </Col>

          <Col md={6}>
            <div className="tarjeta-panel shadow-sm">
              <h2 className="mb-4">Acceso al Sistema</h2>
              
              <Form.Group className="mb-4">
                <Form.Label style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6e6e73' }}>
                  Seleccionar Perfil / Rol
                </Form.Label>
                <Form.Select 
                  size="lg"
                  value={rolSeleccionado} 
                  onChange={(e) => setRolSeleccionado(e.target.value)}
                  isInvalid={errorLogin}
                  style={{ backgroundColor: '#fafafa', fontSize: '0.95rem' }}
                >
                  <option value="" disabled>-- Seleccione su Perfil --</option>
                  <option value="/cliente">Cliente / Inversionista</option>
                  <option value="/arquitecto">Arquitecto Proyectista</option>
                  <option value="/coordinador">Coordinador de Proyecto</option>
                  <option value="/disenador">Disenador Urbano</option>
                  <option value="/ingeniero">Ingeniero Calculista</option>
                  <option value="/admin">Administrador del Sistema</option>
                </Form.Select>
                {errorLogin && <Alert variant="danger" className="mt-2 py-2">Seleccione un perfil para ingresar.</Alert>}
              </Form.Group>

              <div className="d-flex gap-3 mt-4">
                <button className="btn btn-dark w-100 py-3" style={{ fontWeight: 'bold' }} onClick={ingresarSistema}>
                  INGRESAR
                </button>
                <button className="btn btn-outline-secondary w-100 py-3" style={{ fontWeight: 'bold' }} onClick={() => {setRolSeleccionado(''); setErrorLogin(false);}}>
                  LIMPIAR
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;