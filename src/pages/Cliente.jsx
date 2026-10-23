import PaginaRol from '../components/PaginaRol';
import PortalCliente from '../components/PortalCliente';
import { getProjects } from '../data/db';

const Cliente = () => {
  return (
    <PaginaRol
      titulo="Portal del Cliente"
      subtitulo="¡Bienvenido! Aquí puedes revisar el estado y avance de tus proyectos"
    >
      <PortalCliente projects={getProjects()} />
    </PaginaRol>
  );
};

export default Cliente;
