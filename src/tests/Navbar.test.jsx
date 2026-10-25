import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NavigationBar from '../components/Navbar';

describe('Navbar', () => {
  it('en celular el menú se cierra al elegir un enlace', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    );
    const boton = screen.getByRole('button', { name: 'Toggle navigation' });
    await user.click(boton);
    expect(boton).not.toHaveClass('collapsed');
    await user.click(screen.getByRole('link', { name: 'Categorias' }));
    expect(boton).toHaveClass('collapsed');
  });
});
