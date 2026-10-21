import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Categorias from './pages/Categorias';
import Checkout from './pages/Checkout';
import Cliente from './pages/Cliente';
import Arquitecto from './pages/Arquitecto';
import Coordinador from './pages/Coordinador';
import Disenador from './pages/Disenador';
import Ingeniero from './pages/Ingeniero';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/arquitecto" element={<Arquitecto />} />
        <Route path="/coordinador" element={<Coordinador />} />
        <Route path="/disenador" element={<Disenador />} />
        <Route path="/ingeniero" element={<Ingeniero />} />
      </Routes>
    </>
  );
}

export default App;