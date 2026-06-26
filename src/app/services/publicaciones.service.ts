import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Publicacion } from '../models/publicacion.model';
import { Comentario } from '../models/comentario.model';

@Injectable({ providedIn: 'root' })
export class PublicacionesService {
  private readonly KEY_PUB = 'foro_publicaciones';
  private readonly KEY_COM = 'foro_comentarios';
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() { if (this.isBrowser) this.seed(); }

  private get(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }
  private set(key: string, value: string): void {
    if (this.isBrowser) localStorage.setItem(key, value);
  }

  private seed(): void {
    if (this.get(this.KEY_PUB)) return;
    const pubs: Publicacion[] = [
      { id: '1', titulo: '¿Cómo usar async/await en JavaScript?', contenido: 'Estoy aprendiendo JavaScript y no entiendo bien cómo funciona async/await. ¿Alguien puede explicarme con un ejemplo sencillo? Intenté leer la documentación pero sigo confundido con las Promesas.', tipo: 'pregunta', categoriaId: '1', autorId: '3', autorNombre: 'Estudiante Prueba', fechaCreacion: '2024-03-01', votos: 5, votantes: {}, solucionId: '2', tags: ['javascript', 'async'], reportes: [], eliminada: false },
      { id: '2', titulo: 'SQL vs NoSQL: ¿cuándo usar cada uno?', contenido: 'Me gustaría debatir sobre las diferencias entre bases de datos relacionales y no relacionales. ¿En qué casos conviene usar cada tipo?', tipo: 'debate', categoriaId: '2', autorId: '2', autorNombre: 'Moderador', fechaCreacion: '2024-03-05', votos: 8, votantes: {}, solucionId: null, tags: ['sql', 'nosql'], reportes: [], eliminada: false },
      { id: '3', titulo: 'Resumen Álgebra Lineal para el final', contenido: 'Acá les dejo un resumen de los temas más importantes de Álgebra Lineal. Incluye transformaciones lineales, matrices, determinantes y vectores propios.', tipo: 'recurso', categoriaId: '3', autorId: '3', autorNombre: 'Estudiante Prueba', fechaCreacion: '2024-03-10', votos: 12, votantes: {}, solucionId: null, tags: ['algebra', 'resumen'], reportes: [], eliminada: false },
      { id: '4', titulo: '¿Qué es el algoritmo de Dijkstra?', contenido: 'En clase mencionaron el algoritmo de Dijkstra pero no lo entendí bien. ¿Alguien puede explicar cómo funciona paso a paso?', tipo: 'pregunta', categoriaId: '4', autorId: '3', autorNombre: 'Estudiante Prueba', fechaCreacion: '2024-03-15', votos: 3, votantes: {}, solucionId: null, tags: ['algoritmos', 'grafos'], reportes: [], eliminada: false },
      { id: '5', titulo: 'Modelo OSI explicado con ejemplos', contenido: 'El modelo OSI es fundamental para entender las redes. En este post explico cada capa con ejemplos cotidianos para el examen.', tipo: 'recurso', categoriaId: '5', autorId: '2', autorNombre: 'Moderador', fechaCreacion: '2024-03-20', votos: 15, votantes: {}, solucionId: null, tags: ['redes', 'osi'], reportes: [], eliminada: false },
    ];
    const coms: Comentario[] = [
      { id: '1', contenido: 'Async/await es azúcar sintáctica sobre Promesas. Una función async siempre devuelve una Promesa, y await pausa la ejecución hasta que se resuelva.', publicacionId: '1', autorId: '2', autorNombre: 'Moderador', fechaCreacion: '2024-03-02', votos: 3, votantes: {}, esSolucion: false, reportes: [], eliminado: false },
      { id: '2', contenido: 'Ejemplo: async function getData(url) { const res = await fetch(url); return await res.json(); } Escribís código que parece sincrónico pero es asíncrono.', publicacionId: '1', autorId: '1', autorNombre: 'Admin', fechaCreacion: '2024-03-02', votos: 5, votantes: {}, esSolucion: true, reportes: [], eliminado: false },
      { id: '3', contenido: 'SQL es mejor con datos estructurados e integridad referencial. NoSQL brilla con datos flexibles o cuando necesitás escalar horizontalmente.', publicacionId: '2', autorId: '1', autorNombre: 'Admin', fechaCreacion: '2024-03-06', votos: 6, votantes: {}, esSolucion: false, reportes: [], eliminado: false },
    ];
    this.set(this.KEY_PUB, JSON.stringify(pubs));
    this.set(this.KEY_COM, JSON.stringify(coms));
  }

  getPublicaciones(): Publicacion[] {
    return (JSON.parse(this.get(this.KEY_PUB) || '[]') as Publicacion[]).filter(p => !p.eliminada);
  }
  getById(id: string): Publicacion | undefined {
    return (JSON.parse(this.get(this.KEY_PUB) || '[]') as Publicacion[]).find(p => p.id === id);
  }
  crear(datos: Omit<Publicacion, 'id' | 'votos' | 'votantes' | 'solucionId' | 'reportes' | 'eliminada'>): Publicacion {
    const pubs = JSON.parse(this.get(this.KEY_PUB) || '[]') as Publicacion[];
    const nueva: Publicacion = { ...datos, id: Date.now().toString(), votos: 0, votantes: {}, solucionId: null, reportes: [], eliminada: false };
    pubs.push(nueva);
    this.set(this.KEY_PUB, JSON.stringify(pubs));
    return nueva;
  }
  votar(pubId: string, userId: string, voto: number): void {
    const pubs = JSON.parse(this.get(this.KEY_PUB) || '[]') as Publicacion[];
    const i = pubs.findIndex(p => p.id === pubId);
    if (i === -1) return;
    const actual = pubs[i].votantes[userId];
    if (actual === voto) { pubs[i].votos -= voto; delete pubs[i].votantes[userId]; }
    else { if (actual) pubs[i].votos -= actual; pubs[i].votos += voto; pubs[i].votantes[userId] = voto; }
    this.set(this.KEY_PUB, JSON.stringify(pubs));
  }
  reportar(pubId: string, userId: string): void {
    const pubs = JSON.parse(this.get(this.KEY_PUB) || '[]') as Publicacion[];
    const i = pubs.findIndex(p => p.id === pubId);
    if (i !== -1 && !pubs[i].reportes.includes(userId)) { pubs[i].reportes.push(userId); this.set(this.KEY_PUB, JSON.stringify(pubs)); }
  }
  eliminar(pubId: string): void {
    const pubs = JSON.parse(this.get(this.KEY_PUB) || '[]') as Publicacion[];
    const i = pubs.findIndex(p => p.id === pubId);
    if (i !== -1) { pubs[i].eliminada = true; this.set(this.KEY_PUB, JSON.stringify(pubs)); }
  }
  buscar(termino: string, categoriaId?: string): Publicacion[] {
    const t = termino.toLowerCase();
    return this.getPublicaciones().filter(p => {
      const matchT = !t || p.titulo.toLowerCase().includes(t) || p.contenido.toLowerCase().includes(t) || p.tags.some(tag => tag.includes(t));
      const matchC = !categoriaId || p.categoriaId === categoriaId;
      return matchT && matchC;
    });
  }
  getReportadas(): Publicacion[] {
    return (JSON.parse(this.get(this.KEY_PUB) || '[]') as Publicacion[]).filter(p => p.reportes.length > 0 && !p.eliminada);
  }
  getComentarios(pubId: string): Comentario[] {
    return (JSON.parse(this.get(this.KEY_COM) || '[]') as Comentario[]).filter(c => c.publicacionId === pubId && !c.eliminado);
  }
  agregarComentario(datos: Omit<Comentario, 'id' | 'votos' | 'votantes' | 'esSolucion' | 'reportes' | 'eliminado'>): Comentario {
    const coms = JSON.parse(this.get(this.KEY_COM) || '[]') as Comentario[];
    const nuevo: Comentario = { ...datos, id: Date.now().toString(), votos: 0, votantes: {}, esSolucion: false, reportes: [], eliminado: false };
    coms.push(nuevo);
    this.set(this.KEY_COM, JSON.stringify(coms));
    return nuevo;
  }
  votarComentario(comId: string, userId: string, voto: number): void {
    const coms = JSON.parse(this.get(this.KEY_COM) || '[]') as Comentario[];
    const i = coms.findIndex(c => c.id === comId);
    if (i === -1) return;
    const actual = coms[i].votantes[userId];
    if (actual === voto) { coms[i].votos -= voto; delete coms[i].votantes[userId]; }
    else { if (actual) coms[i].votos -= actual; coms[i].votos += voto; coms[i].votantes[userId] = voto; }
    this.set(this.KEY_COM, JSON.stringify(coms));
  }
  marcarSolucion(pubId: string, comId: string): void {
    const pubs = JSON.parse(this.get(this.KEY_PUB) || '[]') as Publicacion[];
    const coms = JSON.parse(this.get(this.KEY_COM) || '[]') as Comentario[];
    const pi = pubs.findIndex(p => p.id === pubId);
    if (pi !== -1) { pubs[pi].solucionId = comId; this.set(this.KEY_PUB, JSON.stringify(pubs)); }
    coms.forEach((c, i) => { if (c.publicacionId === pubId) coms[i].esSolucion = (c.id === comId); });
    this.set(this.KEY_COM, JSON.stringify(coms));
  }
  eliminarComentario(comId: string): void {
    const coms = JSON.parse(this.get(this.KEY_COM) || '[]') as Comentario[];
    const i = coms.findIndex(c => c.id === comId);
    if (i !== -1) { coms[i].eliminado = true; this.set(this.KEY_COM, JSON.stringify(coms)); }
  }
}