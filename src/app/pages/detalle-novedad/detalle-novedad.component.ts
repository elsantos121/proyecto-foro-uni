import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Novedad } from '../../models/novedad.model';
import { NovedadesService } from '../../services/novedades.service';

@Component({
  selector: 'app-detalle-novedad',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-novedad.component.html',
  styleUrl: './detalle-novedad.component.css'
})
export class DetalleNovedadComponent implements OnInit {
  novedad: Novedad | undefined;
  relacionadas: Novedad[] = [];

  constructor(
    private route: ActivatedRoute,
    private novedadesService: NovedadesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Corregido: Convertimos el ID de string a number para que coincida con el servicio y modelo
      const idStr = params.get('id');
      const id = idStr ? Number(idStr) : 0;
      
      this.novedad = this.novedadesService.getById(id);
      
      // Corregido: El filtro ahora compara números correctamente
      this.relacionadas = this.novedadesService.getNovedades()
        .filter(n => n.id !== id)
        .slice(0, 3);
    });
  }

  // Corregido: Ahora recibe un objeto Date directamente
  formatearFecha(fecha: Date | undefined): string {
    if (!fecha) return '';
    return fecha.toLocaleDateString('es-AR', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
  }

  // Convierte saltos de línea en párrafos para el HTML
  getParagraphs(texto: string): string[] {
    return texto.split('\n\n').filter(p => p.trim().length > 0);
  }
}