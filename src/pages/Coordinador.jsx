import PaginaRol from '../components/PaginaRol';
import PanelCoordinacion from '../components/PanelCoordinacion';
import { getProjects } from '../data/db';

const Coordinador = () => {
  return (
    <PaginaRol
      titulo="Panel de Coordinación"
      subtitulo="Gestión de tareas, programación de eventos y monitoreo de estados"
    >
      <PanelCoordinacion projects={getProjects()} />
    </PaginaRol>
  );
};

export default Coordinador;
