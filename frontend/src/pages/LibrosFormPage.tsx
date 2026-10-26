import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import axios from "../config/axios";
import { useNavigate, useParams } from "react-router-dom";

type FormInputs = {
  titulo: string;
  precio: number;
  cantidad: number;
  disponible: boolean;
  autor_id: number;
  editorial_id: number;
  genero_id: number;
  imagen?: FileList;
};

const crearSchema = (esEdicion: boolean) =>
  yup.object({
    titulo: yup.string().required("El título es obligatorio"),

    precio: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .typeError("El precio debe ser un número válido")
      .positive("El precio debe ser positivo")
      .required("El precio es obligatorio"),

    cantidad: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .typeError("La cantidad debe ser un número")
      .integer("La cantidad debe ser un número entero")
      .min(0, "La cantidad no puede ser negativa")
      .required("La cantidad es obligatoria"),

    disponible: yup.boolean().required(),

    autor_id: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .typeError("Debe seleccionar un autor válido")
      .required("Debe seleccionar un autor"),

    editorial_id: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value,
      )
      .typeError("Debe seleccionar una editorial válida")
      .required("Debe seleccionar una editorial"),

    genero_id: yup
      .number()
      .transform((value, originalValue) =>
        originalValue === "" || Number.isNaN(value) ? undefined : value,
      )
      .typeError("Debe seleccionar un género válido")
      .required("Debe seleccionar un género"),

    imagen: yup
      .mixed<FileList>()
      .test("required", "La imagen es obligatoria", (value) => {
        if (esEdicion) return true;
        return !!value && value.length > 0;
      })
      .test("fileSize", "La imagen es muy grande", (value) => {
        if (!value?.length) return true;
        return value[0].size <= 2000000;
      })
      .test("fileType", "Formato de imagen no válido", (value) => {
        if (!value?.length) return true;
        return ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
      }),
  });

export default function LibrosFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const esEdicion = Boolean(id);
  const [preview, setPreview] = useState<string | null>(null);
  const [imagenActual, setImagenActual] = useState<string | null>(null);
  const [autores, setAutores] = useState<{ id: number; nombre: string }[]>([]);
  const [editoriales, setEditoriales] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [generos, setGeneros] = useState<{ id: number; nombre: string }[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(
      crearSchema(esEdicion),
    ) as unknown as Resolver<FormInputs>,
    defaultValues: {
      disponible: false,
      cantidad: 0,
    },
  });

  useEffect(() => {
    axios.get("/autores").then((res) => setAutores(res.data));
    axios.get("/editoriales").then((res) => setEditoriales(res.data));
    axios.get("/generos").then((res) => setGeneros(res.data));
  }, []);

  useEffect(() => {
    if (!id) return;

    const cargarLibro = async () => {
      try {
        const response = await axios.get(`/libros/${id}`);
        const libro = response.data;

        reset({
          titulo: libro.titulo,
          precio: Number(libro.precio),
          cantidad: Number(libro.inventario?.cantidad ?? 0),

          disponible:
            libro.disponible === true ||
            libro.disponible === "true" ||
            libro.disponible === 1,

          autor_id: Number(libro.autor_id ?? libro.autor?.id),
          editorial_id: Number(libro.editorial_id ?? libro.editorial?.id),
          genero_id: Number(libro.genero_id ?? libro.genero?.id),
        });

        setImagenActual(libro.imagen ?? null);
        setPreview(null);
      } catch (error) {
        console.error("Error al cargar el libro:", error);
        alert("No se pudieron cargar los datos del libro");
        navigate("/libros");
      }
    };

    cargarLibro();
  }, [id, reset, navigate]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("titulo", data.titulo);
      formData.append("precio", data.precio.toString());
      formData.append("cantidad", data.cantidad.toString());
      formData.append("disponible", data.disponible ? "true" : "false");
      formData.append("autor_id", data.autor_id.toString());
      formData.append("editorial_id", data.editorial_id.toString());
      formData.append("genero_id", data.genero_id.toString());

      if (data.imagen && data.imagen.length > 0) {
        formData.append("imagen", data.imagen[0]);
      }

      if (esEdicion && id) {
        await axios.put(`/libros/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Libro actualizado con éxito");
      } else {
        if (!data.imagen || data.imagen.length === 0) {
          alert("Debes seleccionar una imagen");
          return;
        }

        await axios.post("/libros", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Libro creado con éxito");
      }

      navigate("/libros");
    } catch (err: any) {
      console.error("Error al guardar el libro:", err);
      alert(err.response?.data?.message || "Error al guardar el libro");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <h2 className="mb-4">Alta / Edición de Libro</h2>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input className="form-control" {...register("titulo")} />
          <div className="text-danger">{errors.titulo?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            {...register("precio", { valueAsNumber: true })}
          />
          <div className="text-danger">{errors.precio?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Cantidad</label>
          <input
            type="number"
            min="0"
            className="form-control"
            {...register("cantidad", { valueAsNumber: true })}
          />
          <div className="text-danger">{errors.cantidad?.message}</div>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="disponible"
            {...register("disponible")}
          />
          <label className="form-check-label" htmlFor="disponible">
            Disponible
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label">Autor</label>
          <select className="form-select" {...register("autor_id")}>
            <option value="">Selecciona un autor</option>
            {autores.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>
          <div className="text-danger">{errors.autor_id?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Editorial</label>
          <select className="form-select" {...register("editorial_id")}>
            <option value="">Selecciona una editorial</option>
            {editoriales.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
          <div className="text-danger">{errors.editorial_id?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Género</label>
          <select className="form-select" {...register("genero_id")}>
            <option value="">Selecciona un género</option>
            {generos.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre}
              </option>
            ))}
          </select>
          <div className="text-danger">{errors.genero_id?.message}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            className="form-control"
            {...register("imagen")}
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setPreview(URL.createObjectURL(file));
              } else {
                setPreview(null);
              }
            }}
          />

          <div className="text-danger">{errors.imagen?.message}</div>

          {preview && (
            <div className="mt-3">
              <p>Nueva imagen seleccionada:</p>
              <img
                src={preview}
                alt="Vista previa de la nueva imagen"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}

          {!preview && esEdicion && imagenActual && (
            <div className="mt-3">
              <p>Imagen actual:</p>
              <img
                src={
                  imagenActual.startsWith("http")
                    ? imagenActual
                    : `http://localhost:3000/uploads/${imagenActual}`
                }
                alt="Imagen actual del libro"
                className="img-thumbnail"
                style={{ maxWidth: "200px" }}
              />
              <p className="text-muted">
                Si no seleccionas otra imagen, se conservará la actual.
              </p>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Guardar
        </button>
      </form>
    </div>
  );
}
