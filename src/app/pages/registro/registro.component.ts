import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombre = ''; email = ''; password = ''; carrera = ''; anio = 1; error = '';
  constructor(private auth: AuthService, private router: Router) {}
  registrar(): void {
    if (!this.nombre || !this.email || !this.password || !this.carrera) { this.error = 'Completá todos los campos'; return; }
    const r = this.auth.registrar({ nombre: this.nombre, email: this.email, password: this.password, carrera: this.carrera, anio: this.anio });
    if (r.exito) this.router.navigate(['/foro']);
    else this.error = r.mensaje;
  }
}
