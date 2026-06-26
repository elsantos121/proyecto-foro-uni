export interface Recurso {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'imagen' | 'video' | 'pdf' | 'documento';
  url: string;
  miniatura?: string;
  categoria: string;
  subidoPor: {
    id: string;
    nombre: string;
    avatar?: string;
  };
  fechaSubida: Date;
  descargas: number;
  likes: number;
  userLiked?: boolean;
  tags: string[];
  tamanio?: number;
  esPublico: boolean;
}

export interface CategoriaGaleria {
  id: string;
  nombre: string;
  icono: string;
  cantidad: number;
}