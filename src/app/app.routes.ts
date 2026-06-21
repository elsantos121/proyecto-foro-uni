import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'servicios',
    loadComponent: () =>
      import('./pages/servicios/servicios.component').then(m => m.ServiciosComponent),
  },
];