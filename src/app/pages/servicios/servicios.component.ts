import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Servicio {
  icono: string;
  titulo: string;
  descripcion: string;
  etiqueta: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})
export class ServiciosComponent {
  servicios: Servicio[] = [
    {
      icono: '📝',
      titulo: 'Registro y acceso',
      descripcion:
        'Creá tu cuenta con tu email universitario, iniciá sesión y accedé a todo el contenido del foro. Tu perfil incluye foto, carrera y año cursado.',
      etiqueta: 'Usuarios',
    },
    {
      icono: '💬',
      titulo: 'Publicaciones y debates',
      descripcion:
        'Publicá preguntas, iniciá debates o compartí recursos con tus compañeros. Organizá tu contenido por materia o carrera para que todos lo encuentren fácil.',
      etiqueta: 'Contenido',
    },
    {
      icono: '🗂️',
      titulo: 'Categorías por materia',
      descripcion:
        'Cada publicación pertenece a una categoría: Programación Web, Base de Datos, Matemáticas y más. Navegá directamente por lo que te interesa.',
      etiqueta: 'Organización',
    },
    {
      icono: '🔍',
      titulo: 'Buscador',
      descripcion:
        'Encontrá publicaciones por palabras clave, etiquetas o categorías. Si alguien ya preguntó lo mismo, encontrás la respuesta en segundos.',
      etiqueta: 'Búsqueda',
    },
    {
      icono: '👍',
      titulo: 'Sistema de votos',
      descripcion:
        'Votá las respuestas que más ayudan. Las más votadas suben al tope para que todos encuentren la mejor solución rápido.',
      etiqueta: 'Comunidad',
    },
    {
      icono: '📎',
      titulo: 'Compartir apuntes',
      descripcion:
        'Subí archivos PDF e imágenes directamente en tus publicaciones. Compartí tus apuntes, resúmenes o ejercicios resueltos con toda la comunidad.',
      etiqueta: 'Archivos',
    },
    {
      icono: '✅',
      titulo: 'Marcar solución',
      descripcion:
        'En preguntas, podés marcar una respuesta como solución oficial. Así los que busquen lo mismo después saben exactamente qué funcionó.',
      etiqueta: 'Preguntas',
    },
    {
      icono: '🛡️',
      titulo: 'Moderación y reportes',
      descripcion:
        'Reportá contenido inapropiado con un clic. Los moderadores revisan los reportes y mantienen el foro un espacio útil y respetuoso.',
      etiqueta: 'Administración',
    },
  ];
}
