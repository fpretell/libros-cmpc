import React from "react";
import type { Libro } from "../types";
import LibroRow from "./LibroRow";

type LibroTableProps = {
  libros: Libro[];
  onVerDetalles: (id: number) => void;
  onEliminar: (id: number) => void;
  onEditar: (id: number) => void;
};

export default function LibroTable({
  libros,
  onVerDetalles,
  onEliminar,
  onEditar,
}: LibroTableProps) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Imagen</th>
          <th>Precio</th>
          <th>Editorial</th>
          <th>Género</th>
          <th>Disponible</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {libros.length === 0 ? (
          <tr>
            <td colSpan={8} className="text-center">
              No se encontraron libros
            </td>
          </tr>
        ) : (
          libros.map((libro) => (
            <LibroRow
              key={libro.id}
              libro={libro}
              onVerDetalles={onVerDetalles}
              onEliminar={onEliminar}
              onEditar={onEditar}
            />
          ))
        )}
      </tbody>
    </table>
  );
}
