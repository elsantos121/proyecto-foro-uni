export interface Novedad {
	id: number;
	titulo: string;
	resumen: string;
	contenido: string;
	autor: string;
	fechaPublicacion: Date;
	categoria: string;
	imagenUrl?: string;
	destacada: boolean;
	activa: boolean;
}

