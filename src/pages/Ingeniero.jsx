import PaginaRol from '../components/PaginaRol';
import PanelEstructural from '../components/PanelEstructural';
import { getProjects } from '../data/db';

const Ingeniero = () => {
  return (
    <PaginaRol
      titulo="Panel Estructural"
      subtitulo="Módulo de revisión de planos, reportes de fallas y entrega de cálculos"
    >
      <PanelEstructural projects={getProjects()} />
    </PaginaRol>
  );
};

export default Ingeniero;
