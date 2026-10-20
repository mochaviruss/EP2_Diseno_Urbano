import React, { useState } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import PortalCliente from './components/PortalCliente';
import PanelArquitectura from './components/PanelArquitectura';
import PanelCoordinacion from './components/PanelCoordinacion';
import PanelDisenoGrafico from './components/PanelDisenoGrafico';
import PanelEstructural from './components/PanelEstructural';
import PanelAdmin from './components/PanelAdmin';
import { initialProjects, initialTasks } from './data/mockData';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentRole, setCurrentRole] = useState(null);
  const [projects] = useState(initialProjects);

  const handleLogout = () => setCurrentRole(null);
  const handleReset = () => window.location.reload();

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
    <div className="min-vh-100 bg-light d-flex flex-column justify-content-between">
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
            {currentRole === 'cliente' && <PortalCliente projects={projects} />}
            {currentRole === 'arquitectura' && <PanelArquitectura projects={projects} onAddPlano={() => {}} />}
            {currentRole === 'coordinacion' && <PanelCoordinacion initialTasks={initialTasks} />}
            {currentRole === 'diseno' && <PanelDisenoGrafico />}
            {currentRole === 'estructural' && <PanelEstructural />}
            {currentRole === 'admin' && <PanelAdmin projects={projects} />}
          </main>
        </>
      )}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <small>© 2026 Diseño Urbano Team-Panco. Soporte: TeamPanco@ShelterBuildings.com</small>
      </footer>
    </div>
  );
}

export default App;