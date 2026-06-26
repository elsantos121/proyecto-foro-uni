import { Recurso, CategoriaGaleria } from '../models/recurso.model';

export const RECURSOS_MOCK: Recurso[] = [
  {
    id: '1',
    titulo: 'Apuntes de Programación Web',
    descripcion: 'Apuntes completos de la materia Programación Web con ejemplos prácticos.',
    tipo: 'pdf',
    url: 'assets/pdfs/programacion-web.pdf',
    miniatura: 'assets/thumbnails/programacion-web.jpg',
    categoria: 'programacion',
    subidoPor: {
      id: '1',
      nombre: 'María González',
      avatar: 'assets/avatars/user1.jpg'
    },
    fechaSubida: new Date('2026-06-20'),
    descargas: 45,
    likes: 12,
    tags: ['programación', 'web', 'html', 'css', 'javascript'],
    tamanio: 2048000,
    esPublico: true
  },
  {
    id: '2',
    titulo: 'Guía de Base de Datos',
    descripcion: 'Guía práctica para entender SQL y diseño de bases de datos.',
    tipo: 'documento',
    url: 'assets/docs/guia-bd.docx',
    miniatura: 'assets/thumbnails/bd.jpg',
    categoria: 'base-datos',
    subidoPor: {
      id: '2',
      nombre: 'Carlos Rodríguez',
      avatar: 'assets/avatars/user2.jpg'
    },
    fechaSubida: new Date('2026-06-18'),
    descargas: 32,
    likes: 8,
    tags: ['sql', 'base de datos', 'mysql', 'postgresql'],
    tamanio: 1024000,
    esPublico: true
  },
  {
    id: '3',
    titulo: 'Video Tutorial: Angular desde Cero',
    descripcion: 'Video explicativo sobre los fundamentos de Angular para principiantes.',
    tipo: 'video',
    url: 'assets/videos/angular-tutorial.mp4',
    miniatura: 'assets/thumbnails/angular.jpg',
    categoria: 'programacion',
    subidoPor: {
      id: '3',
      nombre: 'Laura Fernández',
      avatar: 'assets/avatars/user3.jpg'
    },
    fechaSubida: new Date('2026-06-15'),
    descargas: 67,
    likes: 24,
    tags: ['angular', 'video', 'tutorial', 'frontend'],
    tamanio: 15728640,
    esPublico: true
  },
  {
    id: '4',
    titulo: 'Imagen: Diagrama de Redes',
    descripcion: 'Diagrama de topología de redes para la materia de Redes.',
    tipo: 'imagen',
    url: 'assets/images/diagrama-redes.png',
    miniatura: 'assets/thumbnails/redes.jpg',
    categoria: 'redes',
    subidoPor: {
      id: '4',
      nombre: 'Javier Martínez',
      avatar: 'assets/avatars/user4.jpg'
    },
    fechaSubida: new Date('2026-06-12'),
    descargas: 28,
    likes: 15,
    tags: ['redes', 'diagrama', 'topología'],
    tamanio: 512000,
    esPublico: true
  }
];

export const CATEGORIAS_MOCK: CategoriaGaleria[] = [
  { id: 'programacion', nombre: 'Programación', icono: 'fa-code', cantidad: 2 },
  { id: 'base-datos', nombre: 'Base de Datos', icono: 'fa-database', cantidad: 1 },
  { id: 'redes', nombre: 'Redes', icono: 'fa-network-wired', cantidad: 1 },
  { id: 'matematicas', nombre: 'Matemáticas', icono: 'fa-calculator', cantidad: 0 },
  { id: 'ingles', nombre: 'Inglés', icono: 'fa-language', cantidad: 0 }
];