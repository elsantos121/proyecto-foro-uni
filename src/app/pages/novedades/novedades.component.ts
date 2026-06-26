import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Novedad } from '../../models/novedad.model';
import { NovedadesService } from '../../services/novedades.service';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css'
})
export class NovedadesComponent implements OnInit {
  novedades: Novedad[] = [];
  categoriaSeleccionada: string = 'todas';
  categorias: string[] = [];

  constructor(private novedadesService: NovedadesService) {}

  ngOnInit(): void {
    this.novedades = this.novedadesService.getNovedades();
    this.categorias = [...new Set(this.novedades.map(n => n.categoria))];
  }

  get novedadesFiltradas(): Novedad[] {
    if (this.categoriaSeleccionada === 'todas') return this.novedades;
    return this.novedades.filter(n => n.categoria === this.categoriaSeleccionada);
  }

  filtrar(categoria: string): void {
    this.categoriaSeleccionada = categoria;
  }
}