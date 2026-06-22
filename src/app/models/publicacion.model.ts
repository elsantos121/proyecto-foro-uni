export type TipoPublicacion = 'pregunta' | 'debate' | 'recurso';

export interface Publicacion {
  id: string;
  titulo: string;
  contenido: string;
  tipo: TipoPublicacion;
  categoriaId: string;
  autorId: string;
  autorNombre: string;
  fechaCreacion: string;
  votos: number;
  votantes: Record<string, number>;
  solucionId: string | null;
  tags: string[];
  reportes: string[];
  eliminada: boolean;
}
