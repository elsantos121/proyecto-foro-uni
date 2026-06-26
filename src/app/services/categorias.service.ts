import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Categoria } from '../models/categoria.model';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private readonly KEY = 'foro_categorias';
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() { if (this.isBrowser) this.seed(); }

  private get(key: string): string | null { return this.isBrowser ? localStorage.getItem(key) : null; }
  private set(key: string, value: string): void { if (this.isBrowser) localStorage.setItem(key, value); }

  private seed(): void {
    if (this.get(this.KEY)) return;
    const data: Categoria[] = [
      { id: '1', nombre: 'Programación Web', descripcion: 'HTML, CSS, JavaScript, frameworks', icono: '🌐' },
      { id: '2', nombre: 'Base de Datos',    descripcion: 'SQL, NoSQL, modelado de datos',      icono: '🗄️' },
      { id: '3', nombre: 'Matemáticas',      descripcion: 'Álgebra, cálculo, estadística',       icono: '📐' },
      { id: '4', nombre: 'Algoritmos',       descripcion: 'Estructuras de datos y algoritmos',   icono: '🔁' },
      { id: '5', nombre: 'Redes',            descripcion: 'Modelo OSI, TCP/IP, protocolos',      icono: '📡' },
      { id: '6', nombre: 'General',          descripcion: 'Temas generales de la carrera',       icono: '📌' },
    ];
    this.set(this.KEY, JSON.stringify(data));
  }

  getAll(): Categoria[]                      { return JSON.parse(this.get(this.KEY) || '[]'); }
  getById(id: string): Categoria | undefined { return this.getAll().find(c => c.id === id); }
  crear(cat: Omit<Categoria, 'id'>): void {
    const cats = this.getAll(); cats.push({ ...cat, id: Date.now().toString() }); this.set(this.KEY, JSON.stringify(cats));
  }
  eliminar(id: string): void {
    this.set(this.KEY, JSON.stringify(this.getAll().filter(c => c.id !== id)));
  }
}