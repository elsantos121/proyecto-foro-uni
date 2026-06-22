import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY_USUARIOS = 'foro_usuarios';
  private readonly KEY_ACTUAL   = 'foro_usuario_actual';
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() { if (this.isBrowser) this.seed(); }

  private get(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }
  private set(key: string, value: string): void {
    if (this.isBrowser) localStorage.setItem(key, value);
  }
  private remove(key: string): void {
    if (this.isBrowser) localStorage.removeItem(key);
  }

  private seed(): void {
    if (this.get(this.KEY_USUARIOS)) return;
    const data: Usuario[] = [
      { id: '1', nombre: 'Admin',             email: 'admin@foro.com', password: 'admin123', carrera: 'Sistemas',     anio: 5, rol: 'administrador', reputacion: 500, fechaRegistro: '2024-01-01' },
      { id: '2', nombre: 'Moderador',         email: 'mod@foro.com',   password: 'mod123',   carrera: 'Ingeniería',   anio: 4, rol: 'moderador',     reputacion: 300, fechaRegistro: '2024-01-15' },
      { id: '3', nombre: 'Estudiante Prueba', email: 'user@foro.com',  password: 'user123',  carrera: 'Programación', anio: 2, rol: 'estudiante',    reputacion: 50,  fechaRegistro: '2024-02-01' },
    ];
    this.set(this.KEY_USUARIOS, JSON.stringify(data));
  }

  login(email: string, password: string): { exito: boolean; mensaje: string } {
    const usuarios: Usuario[] = JSON.parse(this.get(this.KEY_USUARIOS) || '[]');
    const u = usuarios.find(u => u.email === email && u.password === password);
    if (u) { this.set(this.KEY_ACTUAL, JSON.stringify(u)); return { exito: true, mensaje: 'Bienvenido, ' + u.nombre }; }
    return { exito: false, mensaje: 'Email o contraseña incorrectos' };
  }

  registrar(datos: Omit<Usuario, 'id' | 'rol' | 'reputacion' | 'fechaRegistro'>): { exito: boolean; mensaje: string } {
    const usuarios: Usuario[] = JSON.parse(this.get(this.KEY_USUARIOS) || '[]');
    if (usuarios.find(u => u.email === datos.email)) return { exito: false, mensaje: 'Ya existe una cuenta con ese email' };
    const nuevo: Usuario = { ...datos, id: Date.now().toString(), rol: 'estudiante', reputacion: 0, fechaRegistro: new Date().toISOString().split('T')[0] };
    usuarios.push(nuevo);
    this.set(this.KEY_USUARIOS, JSON.stringify(usuarios));
    this.set(this.KEY_ACTUAL, JSON.stringify(nuevo));
    return { exito: true, mensaje: '¡Bienvenido!' };
  }

  logout(): void { this.remove(this.KEY_ACTUAL); }

  getActual(): Usuario | null {
    const d = this.get(this.KEY_ACTUAL);
    return d ? JSON.parse(d) : null;
  }

  estaLogueado(): boolean { return !!this.getActual(); }
  esAdmin():      boolean { return this.getActual()?.rol === 'administrador'; }
  esModerador():  boolean { const r = this.getActual()?.rol; return r === 'moderador' || r === 'administrador'; }

  getUsuarios(): Usuario[] { return JSON.parse(this.get(this.KEY_USUARIOS) || '[]'); }

  cambiarRol(userId: string, rol: Usuario['rol']): void {
    const us = this.getUsuarios();
    const i  = us.findIndex(u => u.id === userId);
    if (i !== -1) { us[i].rol = rol; this.set(this.KEY_USUARIOS, JSON.stringify(us)); }
  }
}