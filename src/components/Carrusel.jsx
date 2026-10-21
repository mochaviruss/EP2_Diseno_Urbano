import { Carousel } from 'react-bootstrap';

const Carrusel = () => {
  return (
    <Carousel touch={true} keyboard={true}>
      <Carousel.Item>
        {/* Asegúrate de tener estas imágenes en tu carpeta public/img/ */}
        <img className="d-block w-100" src="/img/banner1.jpg" alt="Primer slide" style={{ maxHeight: '500px', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>Proyecto Habitacional</h3>
          <p>Diseño y planificación urbana.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/img/banner2.jpg" alt="Segundo slide" style={{ maxHeight: '500px', objectFit: 'cover' }} />
        <Carousel.Caption>
          <h3>Parques y Recreación</h3>
          <p>Integración con el medio ambiente.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Carrusel;