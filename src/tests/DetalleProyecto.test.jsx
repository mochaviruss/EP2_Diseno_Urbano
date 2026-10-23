import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetalleProyecto from '../pages/DetalleProyecto';

const renderizarEn = (ruta) => {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/proyectos/:codigo" element={<DetalleProyecto />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('DetalleProyecto', () => {
  it('muestra el proyecto según el código de la URL', () => {
    renderizarEn('/proyectos/PR002');
    expect(screen.getByText('Parque Urbano Las Rosas')).toBeInTheDocument();
    expect(screen.getByText('ENTREGADO')).toBeInTheDocument();
  });

  it('con un código que no existe muestra un aviso', () => {
    renderizarEn('/proyectos/PR999');
    expect(screen.getByText('No existe un proyecto con el código PR999.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Volver a categorías' })).toBeInTheDocument();
  });
});
