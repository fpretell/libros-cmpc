export interface Libro {
  id: number;
  titulo: string;
  precio: number;
  disponible: boolean;
  autor_id: number;
  editorial_id: number;
  genero_id: number;
  imagen?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
