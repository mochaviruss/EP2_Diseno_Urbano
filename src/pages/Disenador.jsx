import PaginaRol from '../components/PaginaRol';
import PanelDisenoGrafico from '../components/PanelDisenoGrafico';
import { getProjects } from '../data/db';

const Disenador = () => {
  return (
    <PaginaRol
      titulo="Panel de Diseño Gráfico"
      subtitulo="Módulo de entregables y revisión de solicitudes"
    >
      <PanelDisenoGrafico projects={getProjects()} />
    </PaginaRol>
  );
};

export default Disenador;
