import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import CarruselZoom from '../components/CarruselZoom';
import Header from '../components/Header';
import Login from '../components/Login';
import NotificationToast from '../components/NotificationToast';
import PaginaRol from '../components/PaginaRol';
import PanelAdmin from '../components/PanelAdmin';
import PanelCoordinacion from '../components/PanelCoordinacion';
import PanelDisenoGrafico from '../components/PanelDisenoGrafico';
import PanelEstructural from '../components/PanelEstructural';
import PortalCliente from '../components/PortalCliente';
import ProjectCard from '../components/ProjectCard';

import Admin from '../pages/Admin';
import Arquitecto from '../pages/Arquitecto';
import Categorias from '../pages/Categorias';
import Cliente from '../pages/Cliente';
import Coordinador from '../pages/Coordinador';
import Disenador from '../pages/Disenador';
import Ingeniero from '../pages/Ingeniero';
import ResultadoCompra from '../pages/ResultadoCompra';

import { initialProjects, getProjects, addProject, updateProject, deleteProject } from '../data/db';

describe('Pruebas de Cobertura Completa (+85%) - Componentes, Páginas y Datos', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
    window.scrollTo = vi.fn();
  });

  // 1. Base de datos (src/data/db.js -> 100%)
  it('1. Ejecuta el ciclo CRUD completo en db.js (addProject, updateProject, deleteProject)', () => {
    const totalInicial = getProjects().length;
    const nuevo = addProject({
      code: 'PR888',
      name: 'Proyecto Cobertura',
      startDate: '2026-10-25',
      lastDeliverable: 'N/A',
      status: 'PLANIFICADO',
      progress: 25,
      estimatedCost: '$50.000.000'
    });
    expect(getProjects().length).toBe(totalInicial + 1);

    updateProject(nuevo.id, { status: 'ENTREGADO', progress: 100 });
    const actualizado = getProjects().find((p) => p.id === nuevo.id);
    expect(actualizado.status).toBe('ENTREGADO');

    // Casos de ID inexistente para cubrir las ramas condicionales de db.js
    updateProject('ID_INEXISTENTE', { status: 'CANCELADO' });
    deleteProject('ID_INEXISTENTE');

    deleteProject(nuevo.id);
    expect(getProjects().length).toBe(totalInicial);
  });

  // 2. CarruselZoom (src/components/CarruselZoom.jsx -> 100%)
  it('2. Abre y cierra el modal de zoom en CarruselZoom',() => {
    const imagenes = [{ src: '/img/banner1.jpg', titulo: 'Banner Test', texto: 'Texto Test' }];
    render(<CarruselZoom imagenes={imagenes} />);

    const btnAmpliar = screen.getByLabelText('Ampliar imagen: Banner Test');
    fireEvent.click(btnAmpliar);
    expect(screen.getByText('Cerrar')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cerrar'));
  });

  // 3. Header, Login, NotificationToast y PaginaRol (-> 100%)
  it('3. Cubre botón REINICIAR VISTA en Header, error de Login vacío, NotificationToast y PaginaRol', () => {
    const onReset = vi.fn();
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <Header onReset={onReset} />
        <Login onSelectRole={() => {}} />
        <NotificationToast message="" />
        <NotificationToast message="Operación exitosa" type="success" onClose={onClose} />
        <NotificationToast message="Alerta de prueba" type="warning" onClose={onClose} />
        <PaginaRol titulo="Rol Test" subtitulo="Sub Test">
          <span>Contenido Hijo</span>
        </PaginaRol>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('REINICIAR VISTA'));
    expect(onReset).toHaveBeenCalledTimes(1);

    // Enviar Login vacio para cubrir validacion de error y luego elegir opción para limpiar error
    fireEvent.click(screen.getByText('INGRESAR'));
    expect(screen.getByText('Debe seleccionar un perfil para acceder al sistema.')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'cliente' } });

    // Cerrar toast y cerrar sesión en PaginaRol
    fireEvent.click(screen.getAllByLabelText('Close')[0]);
    expect(onClose).toHaveBeenCalled();
    fireEvent.click(screen.getByText('CERRAR SESIÓN'));
  });

  // 4. PanelAdmin y PanelCoordinacion (-> 100%)
  it('4. Cubre acciones y estados vacíos en PanelAdmin y PanelCoordinacion', () => {
    const onEditar = vi.fn();
    const onEliminar = vi.fn();
    const { unmount } = render(
      <PanelAdmin projects={initialProjects} onEditar={onEditar} onEliminar={onEliminar} />
    );

    fireEvent.click(screen.getByText('EXPORTAR A EXCEL'));
    expect(window.alert).toHaveBeenCalledWith('Exportando consolidado de proyectos a Excel...');
    fireEvent.click(screen.getAllByText('Editar')[0]);
    expect(onEditar).toHaveBeenCalled();
    fireEvent.click(screen.getAllByText('Eliminar')[0]);
    expect(onEliminar).toHaveBeenCalled();
    unmount();

    render(
      <>
        <PanelAdmin projects={[]} />
        <PanelCoordinacion projects={initialProjects} />
        <PanelCoordinacion projects={[]} />
      </>
    );
    expect(screen.getByText('No hay registros de proyectos')).toBeInTheDocument();
    expect(screen.getByText('No hay tareas de coordinación')).toBeInTheDocument();
  });

  // 5. PanelDisenoGrafico y PanelEstructural (-> 100%)
  it('5. Cubre formularios y validaciones en PanelDisenoGrafico y PanelEstructural', () => {
    const { unmount } = render(
      <>
        <PanelDisenoGrafico projects={initialProjects} />
        <PanelDisenoGrafico projects={[]} />
      </>
    );

    // Envío vacio y envío completo en Diseño Grafico
    fireEvent.click(screen.getByText('SUBIR RECURSO VISUAL'));
    expect(window.alert).toHaveBeenCalledWith('Por favor complete todos los campos obligatorios.');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: initialProjects[0].id } });
    fireEvent.change(screen.getByPlaceholderText(/Vista Axonométrica/i), { target: { value: 'Render Fachada' } });
    fireEvent.click(screen.getByText('SUBIR RECURSO VISUAL'));
    expect(window.alert).toHaveBeenCalledWith('Render "Render Fachada" asignado correctamente al proyecto.');
    unmount();

    render(
      <>
        <PanelEstructural projects={initialProjects} />
        <PanelEstructural projects={[]} />
      </>
    );

    // Envio vacio y envio completo en Panel Estructural
    fireEvent.click(screen.getByText('REGISTRAR INFORME TÉCNICO'));
    expect(window.alert).toHaveBeenCalledWith('Por favor complete la información técnica.');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: initialProjects[0].id } });
    fireEvent.change(screen.getByPlaceholderText(/Detalle los coeficientes/i), { target: { value: 'Memoria Sísmica OK' } });
    fireEvent.click(screen.getByText('REGISTRAR INFORME TÉCNICO'));
    expect(window.alert).toHaveBeenCalledWith('Memoria de cálculo cargada para la revisión del proyecto.');
  });

  // 6. PortalCliente (-> 100%)
  it('6. Cubre buscador, observaciones y botones en PortalCliente', () => {
    render(<PortalCliente projects={initialProjects} />);

    const textareas = screen.getAllByPlaceholderText('Escribe aquí tus observaciones...');
    fireEvent.change(textareas[0], { target: { value: 'Observación del cliente' } });
    fireEvent.click(screen.getAllByText('APROBAR ENTREGABLE')[0]);
    expect(window.alert).toHaveBeenCalledWith(`Entregable para "${initialProjects[0].name}" aprobado exitosamente.`);
    fireEvent.click(screen.getAllByText('ENVIAR APELACIÓN')[0]);
    expect(window.alert).toHaveBeenCalledWith(`Apelación enviada para "${initialProjects[0].name}".`);

    const buscador = screen.getByPlaceholderText(/Buscar proyecto por nombre/i);
    fireEvent.change(buscador, { target: { value: 'TERMINO_SIN_RESULTADOS_999' } });
    expect(screen.getByText('No se encontraron proyectos')).toBeInTheDocument();
  });

  // 7. Páginas de Rol, Categorias, ProjectCard y ResultadoCompra (-> 100%)
  it('7. Renderiza páginas de rol, filtra en Categorias y verifica ResultadoCompra sin estado', () => {
    render(
      <MemoryRouter>
        <Categorias />
        <Cliente />
        <Coordinador />
        <Disenador />
        <Ingeniero />
        <ResultadoCompra exito={true} />
        <ProjectCard project={initialProjects[0]} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Planificados' }));
    fireEvent.click(screen.getByRole('button', { name: 'En Curso' }));
    expect(screen.getByText('No hay proyectos en esta categoria.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Entregados' }));
    fireEvent.click(screen.getByRole('button', { name: 'Todos' }));
    expect(screen.getByText('No hay un pago para mostrar.')).toBeInTheDocument();
  });

  // 8. Pagina Arquitecto.jsx (-> 95%+)
  it('8. Cubre el formulario de Arquitecto.jsx (validación de error, registro exitoso y cancelar)', () => {
    render(
      <MemoryRouter>
        <Arquitecto />
      </MemoryRouter>
    );

    const btnGuardarPlano = screen.getByRole('button', { name: /Guardar Plano|Cargar Plano/i });
    fireEvent.click(btnGuardarPlano);
    expect(screen.getByText('Debe completar todos los campos obligatorios.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Proyecto'), { target: { value: initialProjects[0].code } });
    fireEvent.change(screen.getByLabelText('Numero de Version'), { target: { value: 'v3.0' } });
    fireEvent.change(screen.getByLabelText('Fecha'), { target: { value: '2026-10-25' } });
    fireEvent.change(screen.getByLabelText('Comentario'), { target: { value: 'Ajuste de cotas' } });

    fireEvent.click(btnGuardarPlano);
    expect(screen.getByText(/Plano registrado exitosamente/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Marcar Tarea/i }));
    expect(window.alert).toHaveBeenCalledWith("Marcado 'En Revision'.");
  });

  // 9. Pagina Admin.jsx (-> 95%+)
  it('9. Cubre el flujo CRUD completo en la página Admin.jsx (validar vacío, crear, editar, cancelar y eliminar)', () => {
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    // 1) Enviar formulario con espacios en blanco -> activa validación de campos obligatorios
    fireEvent.change(screen.getByLabelText('Codigo'), { target: { value: '   ' } });
    fireEvent.change(screen.getByLabelText('Nombre del Proyecto'), { target: { value: '   ' } });
    fireEvent.change(screen.getByLabelText('Fecha de Inicio'), { target: { value: '2026-10-25' } });
    fireEvent.change(screen.getByLabelText('Costo Estimado'), { target: { value: '   ' } });
    fireEvent.click(screen.getByText('Guardar Proyecto'));
    expect(screen.getByText(/Complete los campos obligatorios/i)).toBeInTheDocument();

    // 2) Crear un proyecto nuevo válido (PR777)
    fireEvent.change(screen.getByLabelText('Codigo'), { target: { value: 'PR777' } });
    fireEvent.change(screen.getByLabelText('Nombre del Proyecto'), { target: { value: 'Torre Mirador Sur' } });
    fireEvent.change(screen.getByLabelText('Fecha de Inicio'), { target: { value: '2026-10-25' } });
    fireEvent.change(screen.getByLabelText('Avance (%)'), { target: { value: '50' } });
    fireEvent.change(screen.getByLabelText('Costo Estimado'), { target: { value: '1000000' } });
    fireEvent.click(screen.getByText('Guardar Proyecto'));
    expect(screen.getByText('Torre Mirador Sur')).toBeInTheDocument();

    // 3) Editar un proyecto existente y actualizarlo
    fireEvent.click(screen.getAllByText('Editar')[0]);
    fireEvent.change(screen.getByLabelText('Nombre del Proyecto'), { target: { value: 'Proyecto Editado OK' } });
    fireEvent.click(screen.getByText('Actualizar Proyecto'));
    expect(screen.getByText('Proyecto Editado OK')).toBeInTheDocument();

    // 4) Abrir modo edición y probar el botón Cancelar
    fireEvent.click(screen.getAllByText('Editar')[0]);
    fireEvent.click(screen.getByText('Cancelar'));
    expect(screen.getByText('Guardar Proyecto')).toBeInTheDocument();

    // 5) Eliminar el proyecto recien creado
    const botonesEliminar = screen.getAllByText('Eliminar');
    fireEvent.click(botonesEliminar[botonesEliminar.length - 1]);
    expect(screen.queryByText('Torre Mirador Sur')).not.toBeInTheDocument();
  });
});
