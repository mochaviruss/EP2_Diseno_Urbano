export const initialProjects = [
  { id: 'P01', code: 'PR001', name: 'Casa Habitacion Lote 4', startDate: '2025-10-01', lastDeliverable: 'N/A', status: 'PLANIFICADO', progress: 45, estimatedCost: '$280.000.000' },
  { id: 'P02', code: 'PR002', name: 'Parque Urbano Las Rosas', startDate: '2025-11-20', lastDeliverable: 'planos_aprobados.pdf', status: 'ENTREGADO', progress: 10, estimatedCost: '$150.000.000' },
  { id: 'P03', code: 'PR003', name: 'Edificio Residencial Norte', startDate: '2026-01-10', lastDeliverable: 'N/A', status: 'CANCELADO', progress: 80, estimatedCost: '$350.000.000' }
];

export const getProjects = () => {
  return initialProjects;
};

export const addProject = (nuevoProyecto) => {
  const nuevoId = 'P0' + (initialProjects.length + 1);
  const proyectoFinal = { ...nuevoProyecto, id: nuevoId };
  initialProjects.push(proyectoFinal);
  return proyectoFinal;
};

export const deleteProject = (id) => {
  const index = initialProjects.findIndex(project => project.id === id);
  if (index !== -1) {
    initialProjects.splice(index, 1);
  }
};

export const updateProject = (id, proyectoActualizado) => {
  const index = initialProjects.findIndex(project => project.id === id);
  if (index !== -1) {
    initialProjects[index] = { ...proyectoActualizado, id: id };
  }
};