export interface Autor {
  id: number;
  nombre: string;
}

export interface Editorial {
  id: number;
  nombre: string;
}

export interface Genero {
  id: number;
  nombre: string;
}

export interface Inventario {
  id: number;
  cantidad: number;
  fecha: string;
}

export interface Libro {
  id: number;
  titulo: string;
  precio: number | string;
  disponible: boolean;
  autor_id: number;
  editorial_id: number;
  genero_id: number;
  imagen?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;

  autor?: Autor | null;
  editorial?: Editorial | null;
  genero?: Genero | null;
  inventario?: Inventario | null;
}
