import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Publicacion } from '../../models/publicacion.model';
import { Categoria } from '../../models/categoria.model';
import { PublicacionesService } from '../../services/publicaciones.service';
import { CategoriasService } from '../../services/categorias.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.css'
})
export class ForoComponent implements OnInit {
  publicaciones: Publicacion[] = [];
  categorias: Categoria[] = [];
  termino = '';
  categoriaFiltro = '';
  tipoFiltro = '';

  constructor(
    private pubService: PublicacionesService,
    private catService: CategoriasService,
    public  auth: AuthService
  ) {}

  ngOnInit(): void {
    this.categorias = this.catService.getAll();
    this.cargar();
  }

  cargar(): void {
    this.publicaciones = this.pubService
      .buscar(this.termino, this.categoriaFiltro || undefined)
      .filter(p => !this.tipoFiltro || p.tipo === this.tipoFiltro);
  }

  getNombreCategoria(id: string): string {
    return this.catService.getById(id)?.nombre || 'Sin categoría';
  }

  resumen(texto: string): string {
    return texto.length > 130 ? texto.slice(0, 130) + '...' : texto;
  }

  limpiar(): void {
    this.termino = ''; this.categoriaFiltro = ''; this.tipoFiltro = '';
    this.cargar();
  }
}
