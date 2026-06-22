import { TestBed } from '@angular/core/testing';
import { PublicacionesService } from './publicaciones.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('PublicacionesService', () => {
  let service: PublicacionesService;
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    vi.stubGlobal('localStorage', {
      getItem:    (k: string) => store[k] ?? null,
      setItem:    (k: string, v: string) => { store[k] = v; },
      removeItem: (k: string) => { delete store[k]; },
      clear:      () => { store = {}; },
    });
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacionesService);
  });

  it('debería cargar las publicaciones iniciales', () => {
    expect(service.getPublicaciones().length).toBeGreaterThan(0);
  });

  it('debería crear una nueva publicación', () => {
    const antes = service.getPublicaciones().length;
    service.crear({ titulo: 'Test', contenido: 'Contenido', tipo: 'pregunta', categoriaId: '1', autorId: '3', autorNombre: 'Tester', fechaCreacion: '2024-04-01', tags: [] });
    expect(service.getPublicaciones().length).toBe(antes + 1);
  });

  it('debería buscar publicaciones por término', () => {
    const r = service.buscar('javascript');
    expect(r.length).toBeGreaterThan(0);
  });

  it('debería filtrar publicaciones por categoría', () => {
    const r = service.buscar('', '1');
    r.forEach(p => expect(p.categoriaId).toBe('1'));
  });

  it('debería registrar votos en una publicación', () => {
    const pub = service.getPublicaciones()[0];
    const votoInicial = pub.votos;
    service.votar(pub.id, 'usuario-test', 1);
    expect(service.getById(pub.id)!.votos).toBe(votoInicial + 1);
  });

  it('debería eliminar el voto si se vota igual dos veces', () => {
    const pub = service.getPublicaciones()[0];
    const votoInicial = pub.votos;
    service.votar(pub.id, 'usuario-test', 1);
    service.votar(pub.id, 'usuario-test', 1);
    expect(service.getById(pub.id)!.votos).toBe(votoInicial);
  });

  it('debería agregar y recuperar comentarios', () => {
    const pub = service.getPublicaciones()[0];
    service.agregarComentario({ contenido: 'Mi comentario', publicacionId: pub.id, autorId: '3', autorNombre: 'Tester', fechaCreacion: '2024-04-01' });
    const coms = service.getComentarios(pub.id);
    expect(coms.some(c => c.contenido === 'Mi comentario')).toBe(true);
  });

  it('debería marcar una publicación como eliminada', () => {
    const pub = service.getPublicaciones()[0];
    service.eliminar(pub.id);
    expect(service.getPublicaciones().find(p => p.id === pub.id)).toBeUndefined();
  });
});