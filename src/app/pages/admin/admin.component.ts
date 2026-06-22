import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Publicacion } from '../../models/publicacion.model';
import { AuthService } from '../../services/auth.service';
import { PublicacionesService } from '../../services/publicaciones.service';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  usuarios: Usuario[] = [];
  reportadas: Publicacion[] = [];
  categorias: any[] = [];
  seccion: 'usuarios' | 'reportes' | 'categorias' = 'usuarios';
  nuevaCat = { nombre: '', descripcion: '', icono: '📌' };

  constructor(
    private auth: AuthService,
    private pubService: PublicacionesService,
    private catService: CategoriasService
  ) {}

  ngOnInit(): void { this.cargar(); }

  cargar(): void {
    this.usuarios   = this.auth.getUsuarios();
    this.reportadas = this.pubService.getReportadas();
    this.categorias = this.catService.getAll();
  }

  cambiarRol(userId: string, evento: Event): void {
    const rol = (evento.target as HTMLSelectElement).value as Usuario['rol'];
    this.auth.cambiarRol(userId, rol);
    this.cargar();
  }

  eliminarPub(id: string): void {
    if (confirm('¿Eliminar esta publicación?')) { this.pubService.eliminar(id); this.cargar(); }
  }

  crearCat(): void {
    if (!this.nuevaCat.nombre) return;
    this.catService.crear(this.nuevaCat);
    this.nuevaCat = { nombre: '', descripcion: '', icono: '📌' };
    this.cargar();
  }

  eliminarCat(id: string): void {
    if (confirm('¿Eliminar esta categoría?')) { this.catService.eliminar(id); this.cargar(); }
  }
}
