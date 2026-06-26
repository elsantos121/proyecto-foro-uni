import { Novedad } from '../models/novedad.model';

export const NOVEDADES_DATA: Novedad[] = [
  {
    id: 1,
    titulo: 'Lanzamiento del Foro Universitario',
    resumen: 'Se habilitó la primera versión del sistema.',
    contenido:
      'El Foro Universitario ya está disponible para todos los estudiantes. Los usuarios podrán compartir recursos, realizar consultas y mantenerse informados mediante publicaciones oficiales.',
    autor: 'Administrador',
    fechaPublicacion: new Date('2026-06-01'),
    categoria: 'General',
    imagenUrl: 'assets/images/foro-lanzamiento.jpg',
    destacada: true,
    activa: true
  },
  {
    id: 2,
    titulo: 'Nueva sección de Recursos Académicos',
    resumen: 'Ahora es posible compartir apuntes y material de estudio.',
    contenido:
      'Se agregó una sección dedicada a recursos académicos donde los estudiantes podrán publicar documentos, enlaces y material complementario para las distintas materias.',
    autor: 'Equipo de Desarrollo',
    fechaPublicacion: new Date('2026-06-05'),
    categoria: 'Actualizaciones',
    imagenUrl: 'assets/images/recursos.jpg',
    destacada: true,
    activa: true
  },
  {
    id: 3,
    titulo: 'Mejoras en el sistema de comentarios',
    resumen: 'Se optimizó la interacción entre usuarios.',
    contenido:
      'Se realizaron mejoras en el sistema de comentarios permitiendo respuestas más rápidas y una mejor organización de las conversaciones.',
    autor: 'Administrador',
    fechaPublicacion: new Date('2026-06-10'),
    categoria: 'Mejoras',
    imagenUrl: 'assets/images/comentarios.jpg',
    destacada: false,
    activa: true
  },
  {
    id: 4,
    titulo: 'Mantenimiento programado',
    resumen: 'Actualización de infraestructura.',
    contenido:
      'El sistema permanecerá en mantenimiento durante el fin de semana para realizar tareas de optimización y actualización de seguridad.',
    autor: 'Soporte Técnico',
    fechaPublicacion: new Date('2026-06-15'),
    categoria: 'Avisos',
    destacada: false,
    activa: true
  },
  {
    id: 5,
    titulo: 'Integración con notificaciones',
    resumen: 'Los usuarios recibirán alertas sobre novedades importantes.',
    contenido:
      'Se incorporó un sistema de notificaciones para informar a los usuarios sobre nuevas publicaciones, eventos académicos y anuncios institucionales.',
    autor: 'Equipo de Desarrollo',
    fechaPublicacion: new Date('2026-06-20'),
    categoria: 'Actualizaciones',
    imagenUrl: 'assets/images/notificaciones.jpg',
    destacada: true,
    activa: true
  }
];