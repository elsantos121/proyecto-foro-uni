import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AuthService', () => {
  let service: AuthService;
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
    service = TestBed.inject(AuthService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería iniciar sesión con credenciales correctas', () => {
    const r = service.login('admin@foro.com', 'admin123');
    expect(r.exito).toBe(true);
    expect(service.estaLogueado()).toBe(true);
  });

  it('debería fallar con credenciales incorrectas', () => {
    const r = service.login('no@existe.com', 'malpass');
    expect(r.exito).toBe(false);
    expect(service.estaLogueado()).toBe(false);
  });

  it('debería registrar un nuevo usuario', () => {
    const r = service.registrar({ nombre: 'Test', email: 'test@test.com', password: '123456', carrera: 'Sistemas', anio: 1 });
    expect(r.exito).toBe(true);
    expect(service.estaLogueado()).toBe(true);
  });

  it('no debería registrar un email ya existente', () => {
    const r = service.registrar({ nombre: 'Admin2', email: 'admin@foro.com', password: '123', carrera: 'X', anio: 1 });
    expect(r.exito).toBe(false);
  });

  it('debería cerrar sesión correctamente', () => {
    service.login('user@foro.com', 'user123');
    expect(service.estaLogueado()).toBe(true);
    service.logout();
    expect(service.estaLogueado()).toBe(false);
  });

  it('debería identificar correctamente al admin', () => {
    service.login('admin@foro.com', 'admin123');
    expect(service.esAdmin()).toBe(true);
    expect(service.esModerador()).toBe(true);
  });

  it('debería identificar correctamente al moderador', () => {
    service.login('mod@foro.com', 'mod123');
    expect(service.esAdmin()).toBe(false);
    expect(service.esModerador()).toBe(true);
  });
});