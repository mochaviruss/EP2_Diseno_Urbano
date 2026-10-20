import { useState } from 'react';
import { Carousel, Modal, Button } from 'react-bootstrap';

function CarruselZoom({ imagenes }) {
  const [imagenZoom, setImagenZoom] = useState(null);

  return (
    <>
      <Carousel className="carrusel-inicio">
        {imagenes.map((imagen) => (
          <Carousel.Item key={imagen.src}>
            <button
              type="button"
              className="boton-imagen"
              onClick={() => setImagenZoom(imagen)}
              aria-label={`Ampliar imagen: ${imagen.titulo}`}
            >
              <img src={imagen.src} alt={imagen.titulo} className="d-block w-100" />
            </button>
            <Carousel.Caption className="leyenda-carrusel">
              <h2>{imagen.titulo}</h2>
              <p className="d-none d-sm-block mb-0">{imagen.texto}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Modal show={imagenZoom !== null} onHide={() => setImagenZoom(null)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="h5">
            {imagenZoom?.titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {imagenZoom && (
            <img src={imagenZoom.src} alt={imagenZoom.titulo} className="imagen-zoom" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setImagenZoom(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CarruselZoom;
