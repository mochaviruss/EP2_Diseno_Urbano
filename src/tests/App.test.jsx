import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Header from '../components/Header';
import Login from '../components/Login';
import PanelAdmin from '../components/PanelAdmin';
import { initialProjects } from '../data/db';

describe('Pruebas Unitarias - Portal de Proyectos', () => {

  // Test 1: Verificar el título principal en el Login
  it('1. Debe renderizar el título principal en la pantalla de Login', () => {
    render(<Login onSelectRole={() => {}} />);
    expect(screen.getByText('Portal de Proyectos')).toBeInTheDocument();
  });

  // Test 2: Verificar que existan las opciones de roles en el selector
  it('2. Debe contener el selector con la opción de Administración', () => {
    render(<Login onSelectRole={() => {}} />);
    expect(screen.getByRole('option', { name: 'Administración' })).toBeInTheDocument();
  });

  // Test 3: Verificar que el Header muestre el título dinámico
  it('3. Debe renderizar correctamente el título pasado por props al Header', () => {
    render(<Header title="Panel de prueba" subtitle="Subtítulo de prueba" />);
    expect(screen.getByText('Panel de prueba')).toBeInTheDocument();
  });

  // Test 4: Verificar el botón de cerrar sesión en el Header
  it('4. Debe llamar a la función onLogout al hacer clic en CERRAR SESIÓN', () => {
    const handleLogout = vi.fn();
    render(<Header title="Test" onLogout={handleLogout} />);
    const btnLogout = screen.getByText('CERRAR SESIÓN');
    fireEvent.click(btnLogout);
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });

  // Test 5: Verificar que la lista de datos simulados no esté vacía
  it('5. Debe cargar los datos iniciales de los proyectos correctamente', () => {
    expect(initialProjects.length).toBeGreaterThan(0);
    expect(initialProjects[0]).toHaveProperty('code');
  });

  // Test 6: Verificar que la tabla de administración muestre los códigos de los proyectos
  it('6. Debe renderizar los códigos de proyectos en el Panel de Administración', () => {
    render(<PanelAdmin projects={initialProjects} />);
    expect(screen.getByText('PR001')).toBeInTheDocument();
  });

  // Test 7: Verificar el cambio de vista al seleccionar un rol en la App
  it('7. Debe cambiar la vista de Login al panel al seleccionar un rol', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'admin' } });
    const btnIngresar = screen.getByText('INGRESAR');
    fireEvent.click(btnIngresar);
    expect(screen.getByText('Panel de Administración')).toBeInTheDocument();
  });

  // Test 8: Verificar que el botón Limpiar reinicie el selector de rol
  it('8. Debe reiniciar el selector al hacer clic en LIMPIAR', () => {
    render(<Login onSelectRole={() => {}} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'cliente' } });
    const btnLimpiar = screen.getByText('LIMPIAR');
    fireEvent.click(btnLimpiar);
    expect(select.value).toBe('');
  });

  // Test 9: Verificar que se muestre el botón de exportación en el panel Admin
  it('9. Debe renderizar el botón Exportar a Excel en el Panel de Administración', () => {
    render(<PanelAdmin projects={initialProjects} />);
    expect(screen.getByText('EXPORTAR A EXCEL')).toBeInTheDocument();
  });

  // Test 10: Verificar que la aplicación renderice el pie de página
 it('10. Debe renderizar el footer con la información del equipo', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'admin' } });
    const btnIngresar = screen.getByText('INGRESAR');
    fireEvent.click(btnIngresar);
    expect(screen.getByText(/Diseño Urbano Team-Panco/i)).toBeInTheDocument();
  });
});