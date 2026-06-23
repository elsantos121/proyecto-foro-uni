import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecursosService } from '../../services/recursos.service';
import { Recurso, CategoriaGaleria } from '../../models/recurso.model';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent implements OnInit {
  recursos: Recurso[] = [];
  categorias: CategoriaGaleria[] = [];
  recursosFiltrados: Recurso[] = [];
  categoriaSeleccionada: string = 'todas';
  terminoBusqueda: string = '';
  isLoading = true;

constructor(
  private recursosService: RecursosService,
  private router: Router
) {}

  ngOnInit(): void {
    this.cargarRecursos();
    this.cargarCategorias();
  }

  cargarRecursos(): void {
    this.isLoading = true;
    this.recursosService.getRecursos().subscribe({
      next: (data) => {
        this.recursos = data;
        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar recursos:', error);
        this.isLoading = false;
      }
    });
  }

  cargarCategorias(): void {
    this.recursosService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  filtrarPorCategoria(categoriaId: string): void {
    this.categoriaSeleccionada = categoriaId;
    this.aplicarFiltros();
  }

  buscarRecursos(): void {
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.recursosFiltrados = this.recursos.filter(recurso => {
      const coincideCategoria = this.categoriaSeleccionada === 'todas' || 
                               recurso.categoria === this.categoriaSeleccionada;
      const coincideBusqueda = recurso.titulo.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
                              recurso.descripcion.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
                              recurso.tags.some(tag => tag.toLowerCase().includes(this.terminoBusqueda.toLowerCase()));
      return coincideCategoria && coincideBusqueda;
    });
  }

  getIconoTipo(tipo: string): string {
    const iconos: {[key: string]: string} = {
      'imagen': 'fa-image',
      'video': 'fa-video',
      'pdf': 'fa-file-pdf',
      'documento': 'fa-file-alt'
    };
    return iconos[tipo] || 'fa-file';
  }

  getColorTipo(tipo: string): string {
    const colores: {[key: string]: string} = {
      'imagen': '#4CAF50',
      'video': '#FF5722',
      'pdf': '#F44336',
      'documento': '#2196F3'
    };
    return colores[tipo] || '#666';
  }
 darLike(id: string): void {
  this.recursosService.toggleLike(id).subscribe({
    next: (response: any) => {
      const recurso = this.recursos.find(r => r.id === id);
      if (recurso) {
        recurso.likes = response.likes;
        recurso.userLiked = response.userLiked;
      }
      const recursoFiltrado = this.recursosFiltrados.find(r => r.id === id);
      if (recursoFiltrado) {
        recursoFiltrado.likes = response.likes;
        recursoFiltrado.userLiked = response.userLiked;
      }
    },
    error: (error: any) => {
      console.error('Error al dar like:', error);
    }
  });
}

  descargarRecurso(recurso: Recurso): void {
    recurso.descargas++;
    window.open(recurso.url, '_blank');
    console.log(`Descargando: ${recurso.titulo}`);
  }

verDetalle(id: string): void {
  this.router.navigate(['/galeria', id]);
}
}