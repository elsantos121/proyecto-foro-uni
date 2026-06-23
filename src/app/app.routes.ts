import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '',                  redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',              loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login',             loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'registro',          loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroComponent) },
  { path: 'foro',              loadComponent: () => import('./pages/foro/foro.component').then(m => m.ForoComponent) },
  { path: 'foro/:id',          loadComponent: () => import('./pages/detalle-publicacion/detalle-publicacion.component').then(m => m.DetallePublicacionComponent) },
  { path: 'nueva-publicacion', loadComponent: () => import('./pages/nueva-publicacion/nueva-publicacion.component').then(m => m.NuevaPublicacionComponent), canActivate: [authGuard] },
  { path: 'perfil',            loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent), canActivate: [authGuard] },
  { path: 'admin',             loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent), canActivate: [adminGuard] },
  { path: 'servicios',         loadComponent: () => import('./pages/servicios/servicios.component').then(m => m.ServiciosComponent) },
  { path: 'galeria',           loadComponent: () => import('./pages/galeria/galeria.component').then(m => m.GaleriaComponent) },
  { path: 'galeria/:id',       loadComponent: () => import('./pages/galeria-detalle/galeria-detalle.component').then(m => m.GaleriaDetalleComponent) },
  { path: 'nosotros',          loadComponent: () => import('./pages/nosotros/nosotros.component').then(m => m.NosotrosComponent) },
  // Rutas de los compañeros (cada uno agrega la suya):
  // { path: 'blog',     loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent) },
  // { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto.component').then(m => m.ContactoComponent) },
];
