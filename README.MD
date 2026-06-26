# INTEGRANTES DEL GRUPO
- Santiago Orlando Luna
- Nicolas Fernandez Garcia
- Ivo Giuliano Cappetto
- Martin Sánchez
- Joaquín Grosso
- Lautaro Gutierrez Lardit 

# informacion del proyecto


# Foro Universitario — Alcance y Funcionalidades

## ¿Qué es?
Una plataforma web donde estudiantes pueden compartir apuntes, hacer preguntas, debatir temas y organizarse por materias o carreras.

---

## Alcance del proyecto (para un cuatrimestre)

El proyecto se divide en tres módulos principales: **usuarios**, **contenido** y **administración**.

---

## Funcionalidades

### 👤 Módulo de Usuarios
- Registro e inicio de sesión (con email y contraseña)
- Perfil de usuario con foto, carrera y año cursado
- Historial de publicaciones y comentarios propios
- Sistema de reputación o puntos por participar

### 📝 Módulo de Contenido (el núcleo)
- Crear, editar y eliminar publicaciones (preguntas, debates, recursos)
- Categorías por materia o carrera (Programación Web, Base de Datos, etc.)
- Comentarios y respuestas anidadas en cada publicación
- Sistema de votos  para destacar las mejores respuestas
- Buscador por palabras clave, categoría o etiquetas
- Marcar una respuesta como "solución" en publicaciones de tipo pregunta

### 🛡️ Módulo de Administración
- Panel de admin para gestionar usuarios, publicaciones y reportes
- Sistema de moderación: reportar contenido inapropiado
- Crear y editar categorías

---

## Roles del sistema

| Rol | Permisos |
|---|---|
| Visitante | Solo lectura |
| Estudiante | Publicar, comentar, votar |
| Moderador | Eliminar contenido, gestionar reportes |
| Administrador | Control total |

---


# ProyectoForoUni

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

