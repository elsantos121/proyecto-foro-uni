import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recurso, CategoriaGaleria } from '../models/recurso.model';
import { RECURSOS_MOCK, CATEGORIAS_MOCK } from '../data/recursos.data';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  constructor() { }

  getRecursos(): Observable<Recurso[]> {
    return of(RECURSOS_MOCK);
  }

  getRecursoById(id: string): Observable<Recurso | undefined> {
    const recurso = RECURSOS_MOCK.find(r => r.id === id);
    return of(recurso);
  }

  
  getCategorias(): Observable<CategoriaGaleria[]> {
    return of(CATEGORIAS_MOCK);
  }

  
  getRecursosPorCategoria(categoriaId: string): Observable<Recurso[]> {
    const recursos = RECURSOS_MOCK.filter(r => r.categoria === categoriaId);
    return of(recursos);
  }

  buscarRecursos(termino: string): Observable<Recurso[]> {
    const resultado = RECURSOS_MOCK.filter(r => 
      r.titulo.toLowerCase().includes(termino.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(termino.toLowerCase()) ||
      r.tags.some(tag => tag.toLowerCase().includes(termino.toLowerCase()))
    );
    return of(resultado);
  }
  likeRecurso(id: string): Observable<{ likes: number }> {
    const recurso = RECURSOS_MOCK.find(r => r.id === id);
    if (recurso) {
      recurso.likes++;
      return of({ likes: recurso.likes });
    }
    return of({ likes: 0 });
  }
  toggleLike(id: string): Observable<{ likes: number, userLiked: boolean }> {
  const recurso = RECURSOS_MOCK.find(r => r.id === id);
  if (recurso) {
    if (recurso.userLiked) {
      recurso.likes--;
      recurso.userLiked = false;
    } else {
      recurso.likes++;
      recurso.userLiked = true;
    }
    return of({ likes: recurso.likes, userLiked: recurso.userLiked });
  }
  return of({ likes: 0, userLiked: false });
}
}