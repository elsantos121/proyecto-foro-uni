import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = ''; password = ''; error = '';
  constructor(private auth: AuthService, private router: Router) {}
  login(): void {
    const r = this.auth.login(this.email, this.password);
    if (r.exito) this.router.navigate(['/foro']);
    else this.error = r.mensaje;
  }
}