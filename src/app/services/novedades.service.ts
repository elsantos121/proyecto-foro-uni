import { Injectable } from '@angular/core';
import { Novedad } from '../models/novedad.model';

@Injectable({ providedIn: 'root' })
export class NovedadesService {

  private novedades: Novedad[] = [
    {
      id: 1,
      titulo: 'Apertura del sistema de inscripción a finales',
      resumen: 'A partir del 1° de julio podés inscribirte a las mesas de examen finales del mes de julio y agosto.',
      contenido: `El sistema de autogestión estudiantil estará habilitado desde el 1° de julio para registrarse a las mesas de examen finales correspondientes al turno julio-agosto.
Los alumnos regulares deberán ingresar con sus credenciales y seleccionar las materias en las que desean rendir. Recordá que podés inscribirte a un máximo de 3 materias por turno.
Tené en cuenta las siguientes fechas importantes:
- Inscripciones: del 1 al 10 de julio
- Mesa de examen julio: del 15 al 26 de julio
- Mesa de examen agosto: del 5 al 16 de agosto
Para más información, contactá a la Secretaría Académica o consultá el reglamento disponible en la web institucional.`,
      imagenUrl: 'assets/images/inscripciones.jpg',
      categoria: 'Académico',
      fechaPublicacion: new Date('2024-06-25'),
      autor: 'Secretaría Académica',
      destacada: true,
      activa: true
    },
    {
      id: 2,
      titulo: 'Nuevo laboratorio de computación inaugurado',
      resumen: 'La universidad inauguró un nuevo laboratorio con 40 equipos de última generación disponibles para los estudiantes de sistemas.',
      contenido: `Con una inversión significativa en infraestructura tecnológica, la institución pone a disposición de la comunidad estudiantil un moderno laboratorio equipado con 40 computadoras de última generación.
El nuevo espacio, ubicado en el Pabellón B (aula 204), cuenta con:
- 40 PCs con procesadores Intel Core i7 de 12.ª generación
- 16 GB de RAM y SSD de 512 GB en cada equipo
- Software preinstalado: Visual Studio Code, IntelliJ IDEA, MySQL Workbench, Node.js, Python 3 y más
- Conexión de fibra óptica de 1 Gbps
- Proyector y pantalla interactiva
El laboratorio estará disponible en los horarios de cursada y también en horario libre para trabajos prácticos. La reserva se realiza a través del portal estudiantil con al menos 24 horas de anticipación.`,
      imagenUrl: 'assets/images/laboratorio.jpg',
      categoria: 'Infraestructura',
      fechaPublicacion: new Date('2024-06-18'),
      autor: 'Departamento de Sistemas',
      destacada: false,
      activa: true
    },
    {
      id: 3,
      titulo: 'Becas disponibles para el segundo cuatrimestre',
      resumen: 'Se abrió el período de postulación para becas de ayuda económica, transporte y material de estudio.',
      contenido: `La Dirección de Bienestar Estudiantil informa que se encuentran abiertas las postulaciones para las becas del segundo cuatrimestre. Los programas disponibles son:
**Beca de Ayuda Económica**
Destinada a estudiantes con dificultades socioeconómicas acreditadas. Monto mensual: $45.000.
**Beca de Transporte**
Para alumnos que residen a más de 30 km del campus. Cubre el 80% del costo del abono mensual.
**Beca de Material de Estudio**
Subsidio único de $20.000 para la compra de libros y material didáctico.
**Requisitos generales:**
- Ser alumno regular (mínimo 50% de materias aprobadas del año anterior)
- Presentar documentación socioeconómica actualizada
- No ser beneficiario de otra beca en el mismo período
Las postulaciones cierran el 15 de julio. Más información en la Dirección de Bienestar, Pabellón A, planta baja.`,
      imagenUrl: 'assets/images/becas.jpg',
      categoria: 'Bienestar',
      fechaPublicacion: new Date('2024-06-10'),
      autor: 'Dirección de Bienestar Estudiantil',
      destacada: true,
      activa: true
    },
    {
      id: 4,
      titulo: 'Hackathon universitario: "Soluciones para la comunidad"',
      resumen: 'El 20 de julio se realizará el primer hackathon organizado por estudiantes de sistemas. ¡Equipos de 2 a 4 personas!',
      contenido: `El Centro de Estudiantes de Sistemas organiza el primer hackathon universitario bajo el lema "Soluciones para la comunidad". El evento se realizará el sábado 20 de julio de 9:00 a 20:00 hs en el Aula Magna.
**¿De qué se trata?**
Los equipos tendrán 10 horas para desarrollar un prototipo funcional que resuelva un problema real de la comunidad universitaria o del barrio.
**Premios:**
- 1.er puesto: notebook + certificado
- 2.do puesto: tablet + certificado
- 3.er puesto: auriculares + certificado
- Todos los participantes reciben certificado de participación
**Inscripción:**
Completar el formulario disponible en el portal estudiantil antes del 10 de julio. Equipos de 2 a 4 personas (podés inscribirte solo y el comité te asigna equipo).
Los lenguajes, tecnologías y plataformas son libres. Se provee Wi-Fi, refrigerios y mentores disponibles durante todo el evento.`,
      imagenUrl: 'assets/images/hackathon.jpg',
      categoria: 'Eventos',
      fechaPublicacion: new Date('2024-06-05'),
      autor: 'Centro de Estudiantes',
      destacada: true,
      activa: true
    },
    {
      id: 5,
      titulo: 'Cambio de horario en Secretaría de Alumnos',
      resumen: 'Durante julio y agosto, la atención al público será de 9:00 a 13:00 hs. El turno tarde queda suspendido por receso invernal.',
      contenido: `Se informa a los alumnos que durante los meses de julio y agosto, la Secretaría de Alumnos modificará su horario de atención al público.
**Horario de invierno (julio–agosto):**
- Lunes a viernes: 9:00 a 13:00 hs
- Tardes y sábados: sin atención
Los trámites que pueden realizarse durante este período:
- Certificados de alumno regular
- Constancias de materias aprobadas
- Cambios de carrera y equivalencias
- Inscripción a materias del segundo cuatrimestre
Se recomienda concurrir temprano, especialmente durante las primeras semanas de julio cuando el volumen de trámites es mayor.
Los trámites urgentes fuera del horario de atención deben solicitarse por correo institucional con al menos 48 horas de anticipación.`,
      imagenUrl: 'assets/images/horario.jpg',
      categoria: 'Administrativo',
      fechaPublicacion: new Date('2024-05-28'),
      autor: 'Secretaría de Alumnos',
      destacada: false,
      activa: true
    }
  ];

  getNovedades(): Novedad[] {
    return this.novedades;
  }

  getById(id: number): Novedad | undefined {
    return this.novedades.find(n => n.id === id);
  }

  getRecientes(cantidad: number = 3): Novedad[] {
    return [...this.novedades]
      .sort((a, b) => b.fechaPublicacion.getTime() - a.fechaPublicacion.getTime())
      .slice(0, cantidad);
  }
}