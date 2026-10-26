import { useEffect, useState } from "react";
import axios from "../config/axios";
import type { Libro } from "../types";

type LibroDetalleModalProps = {
  libroId: number;
  onClose: () => void;
};

const API_URL = "http://localhost:3000";

function formatearFecha(fecha?: string | null): string {
  if (!fecha) return "No disponible";

  const date = new Date(fecha);

  if (Number.isNaN(date.getTime())) return "No disponible";

  return date.toLocaleString("es-AR");
}

function formatearPrecio(precio: number | string): string {
  const numero = Number(precio);

  if (!Number.isFinite(numero)) return String(precio);

  return numero.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
}

export default function LibroDetalleModal({
  libroId,
  onClose,
}: LibroDetalleModalProps) {
  const [libro, setLibro] = useState<Libro | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const cargarDetalle = async () => {
      setLoading(true);
      setError("");
      setLibro(null);

      try {
        const respuesta = await axios.get<Libro>(`/libros/${libroId}`, {
          signal: controller.signal,
        });

        setLibro(respuesta.data);
      } catch {
        if (!controller.signal.aborted) {
          setError("No se pudieron cargar los detalles del libro.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    cargarDetalle();

    return () => controller.abort();
  }, [libroId]);

  const inventarios = libro?.inventario
    ? Array.isArray(libro.inventario)
      ? libro.inventario
      : [libro.inventario]
    : [];

  return (
    <div
      className="modal d-block"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="libroDetalleTitulo"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
        role="document"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="libroDetalleTitulo">
              <i className="bi bi-book me-2" />
              Detalles del libro
            </h5>

            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onClose}
            />
          </div>

          <div className="modal-body">
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-2 mb-0">Cargando detalles del libro...</p>
              </div>
            )}

            {!loading && error && (
              <div className="alert alert-danger mb-0" role="alert">
                {error}
              </div>
            )}

            {!loading && libro && (
              <>
                <div className="row g-4 mb-4">
                  <div className="col-md-4 text-center">
                    {libro.imagen ? (
                      <img
                        src={`${API_URL}/uploads/${libro.imagen}`}
                        alt={`Portada de ${libro.titulo}`}
                        className="img-fluid rounded shadow-sm"
                        style={{
                          maxHeight: "280px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <div className="border rounded p-5 text-muted">
                        <i className="bi bi-image fs-1 d-block mb-2" />
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="col-md-8">
                    <h4>{libro.titulo}</h4>

                    <p className="text-muted mb-2">ID: {libro.id}</p>

                    <h5 className="text-primary mb-3">
                      {formatearPrecio(libro.precio)}
                    </h5>

                    <span
                      className={`badge ${
                        libro.disponible
                          ? "text-bg-success"
                          : "text-bg-secondary"
                      }`}
                    >
                      {libro.disponible ? "Disponible" : "No disponible"}
                    </span>
                  </div>
                </div>

                <h6 className="border-bottom pb-2">
                  Información bibliográfica
                </h6>

                <div className="table-responsive mb-4">
                  <table className="table table-sm table-striped">
                    <tbody>
                      <tr>
                        <th scope="row" style={{ width: "35%" }}>
                          Autor
                        </th>
                        <td>{libro.autor?.nombre ?? "No disponible"}</td>
                      </tr>
                      <tr>
                        <th scope="row">Editorial</th>
                        <td>{libro.editorial?.nombre ?? "No disponible"}</td>
                      </tr>
                      <tr>
                        <th scope="row">Género</th>
                        <td>{libro.genero?.nombre ?? "No disponible"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h6 className="border-bottom pb-2">Inventario</h6>

                {inventarios.length > 0 ? (
                  <div className="table-responsive mb-4">
                    <table className="table table-sm table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Cantidad</th>
                          <th>Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inventarios.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.cantidad}</td>
                            <td>{formatearFecha(item.fecha)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted mb-4">
                    No hay información de inventario disponible.
                  </p>
                )}

                <h6 className="border-bottom pb-2">Auditoría del registro</h6>

                <div className="table-responsive">
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <th scope="row" style={{ width: "35%" }}>
                          Fecha de creación
                        </th>
                        <td>{formatearFecha(libro.createdAt)}</td>
                      </tr>
                      <tr>
                        <th scope="row">Última actualización</th>
                        <td>{formatearFecha(libro.updatedAt)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
