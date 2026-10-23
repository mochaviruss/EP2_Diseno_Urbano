import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

const RUTAS = {
  cliente: '/cliente',
  arquitectura: '/arquitecto',
  coordinacion: '/coordinador',
  diseno: '/disenador',
  estructural: '/ingeniero',
  admin: '/admin',
};

const Home = () => {
  const navigate = useNavigate();

  return <Login onSelectRole={(rol) => navigate(RUTAS[rol])} />;
};

export default Home;
