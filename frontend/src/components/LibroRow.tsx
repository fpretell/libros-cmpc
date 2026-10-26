import React from "react";
import type { Libro } from "../types";

type LibroRowProps = {
  libro: Libro;
  onVerDetalles: (id: number) => void;
  onEliminar: (id: number) => void;
  onEditar: (id: number) => void;
};

export default function LibroRow({
  libro,
  onVerDetalles,
  onEliminar,
  onEditar,
}: LibroRowProps) {
  return (
    <tr>
      <td>{libro.id}</td>
      <td>{libro.titulo}</td>
      <td>
        {libro.imagen ? (
          <img
            src={`http://localhost:3000/uploads/${libro.imagen}`}
            alt={libro.titulo}
            style={{
              width: "50px",
              height: "75px",
              objectFit: "cover",
              borderRadius: "4px",
              boxShadow: "0 0 3px rgba(0,0,0,0.2)",
            }}
          />
        ) : (
          <span className="text-muted">Sin imagen</span>
        )}
      </td>
      <td>{libro.precio}</td>
      <td>{libro.editorial?.nombre || "—"}</td>
      <td>{libro.genero?.nombre || "—"}</td>
      <td>{libro.disponible ? "Sí" : "No"}</td>
      <td>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => onVerDetalles(libro.id)}
          >
            <i className="bi bi-eye me-1" />
            Detalles
          </button>

          <button
            type="button"
            className="btn btn-outline-warning btn-sm"
            onClick={() => onEditar(libro.id)}
          >
            <i className="bi bi-pencil me-1" />
            Editar
          </button>

          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => onEliminar(libro.id)}
          >
            <i className="bi bi-trash me-1" />
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}
