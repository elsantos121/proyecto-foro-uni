import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Publicacion } from '../../models/publicacion.model';
import { AuthService } from '../../services/auth.service';
import { PublicacionesService } from '../../services/publicaciones.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  publicaciones: Publicacion[] = [];
  constructor(private auth: AuthService, private pubService: PublicacionesService) {}
  ngOnInit(): void {
    this.usuario = this.auth.getActual();
    if (this.usuario) this.publicaciones = this.pubService.getPublicaciones().filter(p => p.autorId === this.usuario!.id);
  }
}
