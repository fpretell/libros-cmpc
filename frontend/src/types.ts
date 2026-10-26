export type Filtros = {
  genero_id: string;
  editorial_id: string;
  autor_id: string;
  disponible: string;
  order1: string;
  order2: string;
  order3: string;
  order4: string;
  search: string;
};

export type Autor = {
  id: number;
  nombre: string;
};

export type Editorial = {
  id: number;
  nombre: string;
};

export type Genero = {
  id: number;
  nombre: string;
};

export type Inventario = {
  id: number;
  cantidad: number;
  fecha: string;
};

export type Libro = {
  id: number;
  titulo: string;
  precio: number | string;
  disponible: boolean;

  autor_id: number;
  editorial_id: number;
  genero_id: number;

  imagen?: string | null;

  // Datos adicionales del detalle
  autor?: Autor | null;
  editorial?: Editorial | null;
  genero?: Genero | null;
  inventario?: Inventario | Inventario[] | null;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};
