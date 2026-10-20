import React, { useState } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import PanelAdmin from './components/PanelAdmin';
import { initialProjects } from './data/mockData';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentRole, setCurrentRole] = useState(null);
  const [projects, setProjects] = useState(initialProjects);

  const handleLogout = () => setCurrentRole(null);
  const handleReset = () => setProjects(initialProjects);

  const getHeaderTitle = (role) => {
    switch (role) {
      case 'cliente': return 'Portal del Cliente';
      case 'arquitectura': return 'Panel de Arquitectura';
      case 'coordinacion': return 'Panel de Coordinación';
      case 'diseno': return 'Panel de Diseño Gráfico';
      case 'estructural': return 'Panel Estructural';
      case 'admin': return 'Panel de Administración';
      default: return 'Portal';
    }
  };

  const getHeaderSubtitle = (role) => {
    switch (role) {
      case 'cliente': return '¡Bienvenido! Aquí puedes revisar el estado y avance de tus proyectos';
      case 'arquitectura': return 'Módulo de carga de versiones, planos y actualización de revisión';
      case 'coordinacion': return 'Gestión de tareas, programación de eventos y monitoreo de estados';
      case 'diseno': return 'Módulo de entregables y revisión de solicitudes';
      case 'estructural': return 'Módulo de revisión de planos, reportes de fallas y entrega de cálculos';
      case 'admin': return 'Reportes consolidado de avance y gestión financiera de proyectos';
      default: return '';
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {!currentRole ? (
        <Login onSelectRole={setCurrentRole} />
      ) : (
        <>
          <Header 
            title={getHeaderTitle(currentRole)}
            subtitle={getHeaderSubtitle(currentRole)}
            onLogout={handleLogout} 
            onReset={handleReset} 
          />
          <main className="container flex-grow-1 pb-5">
            {currentRole === 'admin' && <PanelAdmin projects={projects} />}
            {currentRole !== 'admin' && (
              <div className="card shadow-sm p-4 border-0 text-center">
                <h4 className="fw-bold">Vista de {getHeaderTitle(currentRole)}</h4>
                <p className="text-muted mb-0">Módulo en React listo para integrar.</p>
              </div>
            )}
          </main>
          <footer className="bg-dark text-white text-center py-3 mt-auto">
            <small>© 2026 Diseño Urbano Team-Panco. Soporte: TeamPanco@ShelterBuildings.com</small>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;