import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Publicacion } from '../../models/publicacion.model';
import { Comentario } from '../../models/comentario.model';
import { PublicacionesService } from '../../services/publicaciones.service';
import { CategoriasService } from '../../services/categorias.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detalle-publicacion',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './detalle-publicacion.component.html',
  styleUrl: './detalle-publicacion.component.css'
})
export class DetallePublicacionComponent implements OnInit {
  publicacion: Publicacion | undefined;
  comentarios: Comentario[] = [];
  nuevoComentario = '';
  nombreCategoria = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pubService: PublicacionesService,
    private catService: CategoriasService,
    public  auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.publicacion = this.pubService.getById(id);
    if (!this.publicacion) { this.router.navigate(['/foro']); return; }
    this.nombreCategoria = this.catService.getById(this.publicacion.categoriaId)?.nombre || '';
    this.cargarComentarios();
  }

  cargarComentarios(): void {
    if (this.publicacion) this.comentarios = this.pubService.getComentarios(this.publicacion.id);
  }

  votar(v: number): void {
    const u = this.auth.getActual();
    if (!u || !this.publicacion) return;
    this.pubService.votar(this.publicacion.id, u.id, v);
    this.publicacion = this.pubService.getById(this.publicacion.id);
  }

  votarComentario(comId: string, v: number): void {
    const u = this.auth.getActual();
    if (!u) return;
    this.pubService.votarComentario(comId, u.id, v);
    this.cargarComentarios();
  }

  comentar(): void {
    const u = this.auth.getActual();
    if (!u || !this.nuevoComentario.trim() || !this.publicacion) return;
    this.pubService.agregarComentario({
      contenido: this.nuevoComentario,
      publicacionId: this.publicacion.id,
      autorId: u.id,
      autorNombre: u.nombre,
      fechaCreacion: new Date().toISOString().split('T')[0],
    });
    this.nuevoComentario = '';
    this.cargarComentarios();
  }

  marcarSolucion(comId: string): void {
    if (!this.publicacion) return;
    this.pubService.marcarSolucion(this.publicacion.id, comId);
    this.publicacion = this.pubService.getById(this.publicacion.id);
    this.cargarComentarios();
  }

  reportar(): void {
    const u = this.auth.getActual();
    if (!u || !this.publicacion) return;
    this.pubService.reportar(this.publicacion.id, u.id);
    alert('Publicación reportada. Un moderador la revisará pronto.');
  }

  eliminar(): void {
    if (!this.publicacion || !confirm('¿Eliminar esta publicación?')) return;
    this.pubService.eliminar(this.publicacion.id);
    this.router.navigate(['/foro']);
  }

  esDuenio(): boolean { return this.auth.getActual()?.id === this.publicacion?.autorId; }
}
