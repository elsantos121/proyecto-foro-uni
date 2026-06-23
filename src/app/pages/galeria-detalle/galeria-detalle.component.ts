import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursosService } from '../../services/recursos.service';
import { Recurso } from '../../models/recurso.model';

@Component({
  selector: 'app-galeria-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria-detalle.component.html',
  styleUrl: './galeria-detalle.component.css'
})
export class GaleriaDetalleComponent implements OnInit {
  recurso: Recurso | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recursosService: RecursosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recursosService.getRecursoById(id).subscribe({
        next: (data) => {
          this.recurso = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al cargar recurso:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.router.navigate(['/galeria']);
    }
  }

  volver(): void {
    this.router.navigate(['/galeria']);
  }

  descargar(): void {
    if (this.recurso) {
      this.recurso.descargas++;
      window.open(this.recurso.url, '_blank');
    }
  }

  darLike(): void {
  if (this.recurso) {
    this.recursosService.toggleLike(this.recurso.id).subscribe({
      next: (response: any) => {
        if (this.recurso) {
          this.recurso.likes = response.likes;
          this.recurso.userLiked = response.userLiked;
        }
      },
      error: (error: any) => {
        console.error('Error al dar like:', error);
      }
    });
  }
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
}