const ProjectCard = ({ project }) => {
  return (
    <div className="tarjeta-panel h-100 d-flex flex-column shadow-sm">
      <div className="tarjeta-panel-encabezado">
        <div>
          <span className="numero-tarjeta">{project.code}</span>
          <h2>{project.name}</h2>
        </div>
      </div>
      <div className="flex-grow-1">
        <p className="mb-1"><strong>Estado:</strong> {project.status}</p>
        <p className="mb-1"><strong>Avance:</strong> {project.progress}%</p>
        <p className="mb-1"><strong>Costo Estimado:</strong> {project.estimatedCost}</p>
      </div>
      <div className="mt-3">
        <button className="btn btn-dark boton-responsivo">Ver Detalles</button>
      </div>
    </div>
  );
};
export default ProjectCard;