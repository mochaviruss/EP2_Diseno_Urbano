import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          DISENO URBANO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-navegacion" />
        <Navbar.Collapse id="menu-navegacion">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/categorias">Categorias</Nav.Link>
            <Nav.Link as={Link} to="/admin">Administracion</Nav.Link>
          </Nav>
          <div className="d-flex gap-2">
            <Button variant="success" as={Link} to="/checkout">Pagar Proyecto</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;