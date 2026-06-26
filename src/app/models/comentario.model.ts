export interface Comentario {
  id: string;
  contenido: string;
  publicacionId: string;
  autorId: string;
  autorNombre: string;
  fechaCreacion: string;
  votos: number;
  votantes: Record<string, number>;
  esSolucion: boolean;
  reportes: string[];
  eliminado: boolean;
}
