const API_URL = import.meta.env.VITE_API_URL || 'http://35.175.222.93:8080/api/v1';

export let initialProjects = [];

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const formatCLP = (val) => {
  if (typeof val === 'number') return '$' + val.toLocaleString('es-CL');
  return val || '$0';
};

const parseCostNumber = (val) => {
  if (typeof val === 'number') return val;
  const digits = String(val || '0').replace(/\D/g, '');
  return digits ? Number(digits) : 0;
};

const mapFromBackend = (p) => ({
  id: p.id,
  code: p.code || '',
  name: p.name || '',
  startDate: p.startDate || '2026-01-01',
  lastDeliverable: p.lastDeliverable || 'N/A',
  status: p.status || 'PLANIFICADO',
  progress: Number(p.progress ?? 0),
  estimatedCost: formatCLP(p.estimatedCost),
  image: p.image || '/img/proyecto-cliente.jpg'
});

const mapToBackend = (p) => ({
  code: p.code,
  name: p.name,
  startDate: p.startDate || '2026-01-01',
  lastDeliverable: p.lastDeliverable || 'N/A',
  status: p.status || 'PLANIFICADO',
  progress: Number(p.progress || 0),
  estimatedCost: parseCostNumber(p.estimatedCost),
  image: p.image || '/img/proyecto-cliente.jpg'
});

export const syncProjectsFromApi = async () => {
  try {
    const res = await fetch(`${API_URL}/proyectos`, { headers: getAuthHeaders() });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const mapped = data.map(mapFromBackend);
        initialProjects.splice(0, initialProjects.length, ...mapped);
        window.dispatchEvent(new Event('projectsUpdated'));
        return mapped;
      }
    }
  } catch (err) {
    console.warn('Error cargando proyectos desde API:', err);
  }
  return initialProjects;
};

syncProjectsFromApi();

export const getProjects = () => initialProjects;

export const addProject = async (nuevoProyecto) => {
  try {
    const res = await fetch(`${API_URL}/proyectos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(mapToBackend(nuevoProyecto))
    });
    if (res.ok) {
      const creado = mapFromBackend(await res.json());
      initialProjects.push(creado);
      window.dispatchEvent(new Event('projectsUpdated'));
      return creado;
    }
  } catch (err) {
    console.error('Error al crear proyecto:', err);
  }
};

export const deleteProject = async (id) => {
  try {
    const res = await fetch(`${API_URL}/proyectos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      const index = initialProjects.findIndex((project) => project.id === id);
      if (index !== -1) initialProjects.splice(index, 1);
      window.dispatchEvent(new Event('projectsUpdated'));
    }
  } catch (err) {
    console.error('Error al eliminar proyecto:', err);
  }
};

export const updateProject = async (id, proyectoActualizado) => {
  try {
    const res = await fetch(`${API_URL}/proyectos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(mapToBackend(proyectoActualizado))
    });
    if (res.ok) {
      const actualizado = mapFromBackend(await res.json());
      const index = initialProjects.findIndex((project) => project.id === id);
      if (index !== -1) initialProjects[index] = actualizado;
      window.dispatchEvent(new Event('projectsUpdated'));
    }
  } catch (err) {
    console.error('Error al actualizar proyecto:', err);
  }
};
