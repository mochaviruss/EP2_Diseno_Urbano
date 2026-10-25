# Diseño Urbano - Portal de Proyectos

Página web hecha con **React, Vite y React Bootstrap** para la gestión de proyectos de arquitectura del caso Diseño Urbano (DSY1104 - Desarrollo Fullstack II).

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173`.

En la EC2 de AWS se usa `npm run dev -- --host` y se abre `http://IP-PUBLICA:5173`.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia la página |
| `npm run test` | Ejecuta las pruebas |
| `npm run coverage` | Ejecuta las pruebas y genera el informe de cobertura |
| `npm run build` | Genera la versión final |

## Páginas

| Ruta | Página |
|---|---|
| `/` | Inicio y acceso por perfil |
| `/categorias` | Proyectos por estado |
| `/proyectos/:codigo` | Detalle de un proyecto |
| `/checkout` | Pago del adelanto |
| `/checkout/exito` y `/checkout/error` | Resultado del pago |
| `/cliente`, `/arquitecto`, `/disenador`, `/ingeniero`, `/coordinador` | Panel de cada rol |
| `/admin` | Administración de proyectos |

## Equipo

- Ian Villalobos
- Emanuel
- Dani Alday
