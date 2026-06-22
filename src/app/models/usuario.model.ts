export type Rol = 'visitante' | 'estudiante' | 'moderador' | 'administrador';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
  carrera: string;
  anio: number;
  rol: Rol;
  reputacion: number;
  fechaRegistro: string;
}
