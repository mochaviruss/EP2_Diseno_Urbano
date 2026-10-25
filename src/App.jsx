import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Categorias from './pages/Categorias';
import DetalleProyecto from './pages/DetalleProyecto';
import Checkout from './pages/Checkout';
import ResultadoCompra from './pages/ResultadoCompra';
import Cliente from './pages/Cliente';
import Arquitecto from './pages/Arquitecto';
import Coordinador from './pages/Coordinador';
import Disenador from './pages/Disenador';
import Ingeniero from './pages/Ingeniero';

function App() {
  return (
    <div className="w-100 min-vh-100 bg-light d-flex flex-column">
      <NavigationBar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/proyectos/:codigo" element={<DetalleProyecto />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/exito" element={<ResultadoCompra exito={true} />} />
          <Route path="/checkout/error" element={<ResultadoCompra exito={false} />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/arquitecto" element={<Arquitecto />} />
          <Route path="/coordinador" element={<Coordinador />} />
          <Route path="/disenador" element={<Disenador />} />
          <Route path="/ingeniero" element={<Ingeniero />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
        <small>© 2026 Diseño Urbano Team-Panco. Soporte: TeamPanco@ShelterBuildings.com</small>
      </footer>
    </div>
  );
}

export default App;
