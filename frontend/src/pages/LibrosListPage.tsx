import React, { useEffect, useState, useCallback } from "react";
import axios from "../config/axios";
import debounce from "lodash.debounce";
import { useNavigate, useParams } from "react-router-dom";
import LibroTable from "../components/LibroTable";
import LibroDetalleModal from "../components/LibroDetalleModal";
import Paginacion from "../components/Paginacion";

import type { Autor, Editorial, Genero, Libro, Filtros } from "../types";

export default function LibrosListPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const esEdicion = Boolean(id);

  const [libroSeleccionadoId, setLibroSeleccionadoId] = useState<number | null>(
    null,
  );

  const [filtros, setFiltros] = useState<Filtros>({
    genero_id: "",
    editorial_id: "",
    autor_id: "",
    disponible: "",
    order1: "",
    order2: "",
    order3: "",
    order4: "",
    search: "",
  });

  const [generos, setGeneros] = useState<Genero[]>([]);
  const [editoriales, setEditoriales] = useState<Editorial[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);

  const LIMIT = 10;

  const buildOrderParam = (f: Filtros) => {
    return [f.order1, f.order2, f.order3, f.order4].filter(Boolean).join(",");
  };

  const fetchLibros = useCallback(
    async (pageNum: number, filtrosActuales: Filtros) => {
      setLoading(true);

      try {
        const params: Record<string, string | number> = {
          page: pageNum,
          limit: LIMIT,
        };

        if (filtrosActuales.genero_id) {
          params.genero_id = filtrosActuales.genero_id;
        }

        if (filtrosActuales.editorial_id) {
          params.editorial_id = filtrosActuales.editorial_id;
        }

        if (filtrosActuales.autor_id) {
          params.autor_id = filtrosActuales.autor_id;
        }

        if (filtrosActuales.disponible) {
          params.disponible = filtrosActuales.disponible;
        }

        if (filtrosActuales.search) {
          params.search = filtrosActuales.search;
        }

        const orderParam = buildOrderParam(filtrosActuales);

        if (orderParam) {
          params.order = orderParam;
        }

        const res = await axios.get("/libros", { params });

        setLibros(res.data.libros);
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
      } catch {
        alert("Error al cargar los libros");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchOpcionesFiltros = async () => {
    try {
      const [resGeneros, resEditoriales, resAutores] = await Promise.all([
        axios.get("/generos"),
        axios.get("/editoriales"),
        axios.get("/autores"),
      ]);

      setGeneros(resGeneros.data);
      setEditoriales(resEditoriales.data);
      setAutores(resAutores.data);
    } catch (err) {
      console.error("Error cargando filtros:", err);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm: string, filtrosActuales: Filtros) => {
      fetchLibros(1, {
        ...filtrosActuales,
        search: searchTerm,
      });

      setPage(1);
    }, 500),
    [fetchLibros],
  );

  useEffect(() => {
    fetchLibros(page, filtros);
    fetchOpcionesFiltros();

    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const handleFiltroChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    const nuevosFiltros = {
      ...filtros,
      [name]: value,
    };

    setFiltros(nuevosFiltros);

    if (name === "search") {
      debouncedSearch(value, nuevosFiltros);
    } else {
      debouncedSearch.cancel();
      setPage(1);
      fetchLibros(1, nuevosFiltros);
    }
  };

  const limpiarFiltros = () => {
    debouncedSearch.cancel();

    const filtrosIniciales: Filtros = {
      genero_id: "",
      editorial_id: "",
      autor_id: "",
      disponible: "",
      order1: "",
      order2: "",
      order3: "",
      order4: "",
      search: "",
    };

    setFiltros(filtrosIniciales);
    setPage(1);

    fetchLibros(1, filtrosIniciales);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      debouncedSearch.cancel();
      setPage(newPage);
      fetchLibros(newPage, filtros);
    }
  };

  const handleVerDetalles = (id: number) => {
    setLibroSeleccionadoId(id);
  };

  const handleEditar = (id: number) => {
    console.log("Editar libro ID:", id);
    navigate(`/libros/editar/${id}`);
  };

  const handleCerrarDetalles = () => {
    setLibroSeleccionadoId(null);
  };

  const handleEliminar = async (id: number) => {
    const confirmado = window.confirm(
      `¿Estás seguro de que deseas eliminar el libro ID ${id}? Esta acción lo ocultará del listado.`,
    );

    if (!confirmado) return;

    try {
      await axios.delete(`/libros/${id}`);

      // Recargar la página actual con los filtros vigentes.
      const res = await axios.get("/libros", {
        params: {
          page,
          limit: LIMIT,
          ...(filtros.genero_id && {
            genero_id: filtros.genero_id,
          }),
          ...(filtros.editorial_id && {
            editorial_id: filtros.editorial_id,
          }),
          ...(filtros.autor_id && {
            autor_id: filtros.autor_id,
          }),
          ...(filtros.disponible && {
            disponible: filtros.disponible,
          }),
          ...(filtros.search && {
            search: filtros.search,
          }),
          ...(buildOrderParam(filtros) && {
            order: buildOrderParam(filtros),
          }),
        },
      });

      // Si la página quedó vacía, retroceder a la última disponible.
      const nuevaPagina =
        res.data.totalPages > 0 && page > res.data.totalPages
          ? res.data.totalPages
          : page;

      if (nuevaPagina !== page) {
        setPage(nuevaPagina);
        await fetchLibros(nuevaPagina, filtros);
      } else {
        setLibros(res.data.libros);
        setTotalPages(res.data.totalPages);
        setPage(res.data.page);
      }

      alert("Libro eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      alert(
        "No se pudo eliminar el libro. Verifica que el servidor esté disponible.",
      );
    }
  };

  const handleExportarCsv = async () => {
    try {
      const params: Record<string, string> = {};

      if (filtros.genero_id) {
        params.genero_id = filtros.genero_id;
      }

      if (filtros.editorial_id) {
        params.editorial_id = filtros.editorial_id;
      }

      if (filtros.autor_id) {
        params.autor_id = filtros.autor_id;
      }

      if (filtros.disponible) {
        params.disponible = filtros.disponible;
      }

      if (filtros.search.trim()) {
        params.search = filtros.search.trim();
      }

      const orderParam = buildOrderParam(filtros);

      if (orderParam) {
        params.order = orderParam;
      }

      const response = await axios.get("/libros/export/csv", {
        params,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "text/csv;charset=utf-8;",
        }),
      );

      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = "libros.csv";

      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al exportar CSV:", error);
      alert("No se pudo exportar el archivo CSV.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-3 text-center">📚 Listado de Libros</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span className="fw-bold">Filtros y Ordenamiento</span>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-success btn-sm"
              onClick={handleExportarCsv}
            >
              <i className="bi bi-filetype-csv me-1" />
              Exportar CSV
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={limpiarFiltros}
            >
              <i className="bi bi-arrow-counterclockwise me-1" />
              Limpiar filtros
            </button>
          </div>
        </div>

        <div className="card-body">
          <div
            className="mb-3"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr repeat(4, minmax(0, 1fr))",
              gridTemplateRows: "auto auto",
              gap: "0.5rem",
              alignItems: "stretch",
            }}
          >
            {/* Búsqueda: ocupa las dos filas y queda centrada verticalmente */}
            <div
              style={{
                gridColumn: "1",
                gridRow: "1 / 3",
                display: "flex",
                alignItems: "center",
                minWidth: 0,
              }}
            >
              <input
                type="text"
                name="search"
                value={filtros.search}
                placeholder="Buscar título..."
                onChange={handleFiltroChange}
                className="form-control"
              />
            </div>

            {/* Filtros */}
            <div style={{ gridColumn: "2", gridRow: "1", minWidth: 0 }}>
              <select
                name="genero_id"
                value={filtros.genero_id}
                onChange={handleFiltroChange}
                className="form-select"
              >
                <option value="">-- Género --</option>
                {generos.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ gridColumn: "3", gridRow: "1", minWidth: 0 }}>
              <select
                name="editorial_id"
                value={filtros.editorial_id}
                onChange={handleFiltroChange}
                className="form-select"
              >
                <option value="">-- Editorial --</option>
                {editoriales.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ gridColumn: "4", gridRow: "1", minWidth: 0 }}>
              <select
                name="autor_id"
                value={filtros.autor_id}
                onChange={handleFiltroChange}
                className="form-select"
              >
                <option value="">-- Autor --</option>
                {autores.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ gridColumn: "5", gridRow: "1", minWidth: 0 }}>
              <select
                name="disponible"
                value={filtros.disponible}
                onChange={handleFiltroChange}
                className="form-select"
              >
                <option value="">-- Disponible --</option>
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            {/* Ordenamiento: alineado debajo de cada filtro */}
            {(["order1", "order2", "order3", "order4"] as const).map(
              (orderKey, idx) => (
                <div
                  key={orderKey}
                  style={{
                    gridColumn: idx + 2,
                    gridRow: "2",
                    minWidth: 0,
                  }}
                >
                  <label htmlFor={orderKey} className="form-label">
                    Orden ({idx + 1}°)
                  </label>

                  <select
                    id={orderKey}
                    name={orderKey}
                    value={filtros[orderKey]}
                    onChange={handleFiltroChange}
                    className="form-select"
                  >
                    <option value="">-- Orden {idx + 1} --</option>
                    <option value="titulo:asc">Título ↑</option>
                    <option value="titulo:desc">Título ↓</option>
                    <option value="precio:asc">Precio ↑</option>
                    <option value="precio:desc">Precio ↓</option>
                    <option value="editorial:asc">Editorial ↑</option>
                    <option value="editorial:desc">Editorial ↓</option>
                    <option value="genero:asc">Género ↑</option>
                    <option value="genero:desc">Género ↓</option>
                  </select>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Tabla de libros */}
      {loading ? (
        <p>Cargando libros...</p>
      ) : (
        <LibroTable
          libros={libros}
          onVerDetalles={handleVerDetalles}
          onEliminar={handleEliminar}
          onEditar={handleEditar}
        />
      )}

      {/* Modal de detalles */}
      {libroSeleccionadoId !== null && (
        <LibroDetalleModal
          libroId={libroSeleccionadoId}
          onClose={handleCerrarDetalles}
        />
      )}

      {/* Paginación */}
      <Paginacion
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
