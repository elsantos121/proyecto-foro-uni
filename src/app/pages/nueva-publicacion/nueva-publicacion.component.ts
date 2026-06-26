import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Categoria } from '../../models/categoria.model';
import { PublicacionesService } from '../../services/publicaciones.service';
import { CategoriasService } from '../../services/categorias.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nueva-publicacion',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './nueva-publicacion.component.html',
  styleUrl: './nueva-publicacion.component.css'
})
export class NuevaPublicacionComponent implements OnInit {
  titulo = ''; contenido = ''; tipo: 'pregunta' | 'debate' | 'recurso' = 'pregunta';
  categoriaId = ''; tagsInput = ''; error = '';
  categorias: Categoria[] = [];

  constructor(
    private pubService: PublicacionesService,
    private catService: CategoriasService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void { this.categorias = this.catService.getAll(); }

  publicar(): void {
    if (!this.titulo || !this.contenido || !this.categoriaId) { this.error = 'Completá todos los campos obligatorios'; return; }
    const u = this.auth.getActual();
    if (!u) { this.router.navigate(['/login']); return; }
    const tags = this.tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    const pub = this.pubService.crear({ titulo: this.titulo, contenido: this.contenido, tipo: this.tipo, categoriaId: this.categoriaId, autorId: u.id, autorNombre: u.nombre, fechaCreacion: new Date().toISOString().split('T')[0], tags });
    this.router.navigate(['/foro', pub.id]);
  }
}
