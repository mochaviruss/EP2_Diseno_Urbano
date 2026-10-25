import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Checkout from '../pages/Checkout';
import ResultadoCompra from '../pages/ResultadoCompra';

const renderizar = () => {
  render(
    <MemoryRouter initialEntries={['/checkout']}>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/exito" element={<ResultadoCompra exito={true} />} />
        <Route path="/checkout/error" element={<ResultadoCompra exito={false} />} />
      </Routes>
    </MemoryRouter>
  );
};

const completar = async (user, correo, calle) => {
  await user.type(screen.getByLabelText('Nombre Cliente'), 'Ana Rojas');
  await user.type(screen.getByLabelText('Correo'), correo);
  await user.type(screen.getByLabelText('Direccion del Proyecto'), calle);
  await user.type(screen.getByLabelText('Comuna'), 'Maipu');
  await user.click(screen.getByRole('button', { name: 'Simular Pago' }));
};

describe('Checkout', () => {
  it('con datos correctos muestra la página de pago exitoso con el resumen', async () => {
    const user = userEvent.setup();
    renderizar();
    await completar(user, 'ana@correo.cl', 'Av. Central 123');
    expect(screen.getByText('Pago exitoso')).toBeInTheDocument();
    expect(screen.getByText('Ana Rojas')).toBeInTheDocument();
  });

  it('con una dirección de solo espacios muestra la página de error', async () => {
    const user = userEvent.setup();
    renderizar();
    await completar(user, 'ana@correo.cl', '   ');
    expect(screen.getByText('No se pudo realizar el pago')).toBeInTheDocument();
  });

  it('con un correo inválido muestra la página de error', async () => {
    const user = userEvent.setup();
    renderizar();
    await completar(user, 'a@b', 'Av. Central 123');
    expect(screen.getByText('No se pudo realizar el pago')).toBeInTheDocument();
  });
});
