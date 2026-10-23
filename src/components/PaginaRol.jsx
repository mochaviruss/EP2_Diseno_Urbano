import { useNavigate } from 'react-router-dom';
import Header from './Header';

const PaginaRol = ({ titulo, subtitulo, children }) => {
  const navigate = useNavigate();

  return (
    <>
      <Header title={titulo} subtitle={subtitulo} onLogout={() => navigate('/')} />
      <div className="container-fluid px-3 px-md-5 my-4 pb-5">{children}</div>
    </>
  );
};

export default PaginaRol;
