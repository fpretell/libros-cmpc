import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateLibroDto } from "./dto/create-libro.dto";
import { UpdateLibroDto } from "./dto/update-libro.dto";

@Injectable()
export class LibrosService {
  constructor(private readonly prisma: PrismaService) {}

  private buildFilters(query: any): {
    where: Prisma.LibroWhereInput;
    orderBy: Prisma.LibroOrderByWithRelationInput[];
  } {
    const where: Prisma.LibroWhereInput = {
      deletedAt: null,
    };

    const orderBy: Prisma.LibroOrderByWithRelationInput[] = [];

    if (query.disponible !== undefined) {
      if (!["true", "false"].includes(String(query.disponible))) {
        throw new BadRequestException(
          "El filtro disponible debe ser true o false",
        );
      }

      where.disponible = query.disponible === "true";
    }

    const parseId = (value: unknown, field: string): number | undefined => {
      if (value === undefined || value === null || value === "") {
        return undefined;
      }

      const id = Number(value);

      if (!Number.isInteger(id) || id <= 0) {
        throw new BadRequestException(
          `El filtro ${field} debe ser un entero positivo`,
        );
      }

      return id;
    };

    const generoId = parseId(query.genero_id, "genero_id");
    const editorialId = parseId(query.editorial_id, "editorial_id");
    const autorId = parseId(query.autor_id, "autor_id");

    if (generoId !== undefined) where.generoId = generoId;
    if (editorialId !== undefined) where.editorialId = editorialId;
    if (autorId !== undefined) where.autorId = autorId;

    if (query.search) {
      where.titulo = {
        contains: String(query.search).trim(),
        mode: "insensitive",
      };
    }

    if (query.order) {
      const rawOrders: string[] = Array.isArray(query.order)
        ? query.order
        : String(query.order).split(",");

      for (const item of rawOrders) {
        if (typeof item !== "string" || !item.trim()) continue;

        const [rawKey, rawDirection] = item.split(":");
        const key = rawKey?.trim();
        const direction = rawDirection?.trim().toLowerCase();

        if (!key || !direction || !["asc", "desc"].includes(direction)) {
          continue;
        }

        const dir = direction as Prisma.SortOrder;

        switch (key) {
          case "editorial":
            orderBy.push({ editorial: { nombre: dir } });
            break;
          case "genero":
            orderBy.push({ genero: { nombre: dir } });
            break;
          case "autor":
            orderBy.push({ autor: { nombre: dir } });
            break;
          case "id":
          case "titulo":
          case "precio":
          case "disponible":
          case "createdAt":
          case "updatedAt":
            orderBy.push({ [key]: dir });
            break;
        }
      }
    }

    if (orderBy.length === 0) {
      orderBy.push({ id: "asc" });
    }

    return { where, orderBy };
  }

  async findAll(query: any): Promise<{
    libros: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const { where, orderBy } = this.buildFilters(query);

    // Paginación.
    const parsePositiveInteger = (
      value: unknown,
      defaultValue: number,
      field: string,
    ): number => {
      if (value === undefined || value === null || value === "") {
        return defaultValue;
      }

      const number = Number(value);

      if (!Number.isInteger(number) || number <= 0) {
        throw new BadRequestException(`${field} debe ser un entero positivo`);
      }

      return number;
    };

    const page = parsePositiveInteger(query.page, 1, "page");
    const limit = parsePositiveInteger(query.limit, 10, "limit");

    if (limit > 100) {
      throw new BadRequestException("El límite máximo de resultados es 100");
    }

    const skip = (page - 1) * limit;

    const [libros, total] = await Promise.all([
      this.prisma.libro.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          autor: { select: { id: true, nombre: true } },
          editorial: { select: { id: true, nombre: true } },
          genero: { select: { id: true, nombre: true } },
        },
      }),
      this.prisma.libro.count({ where }),
    ]);

    return {
      libros,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const libro = await this.prisma.libro.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        autor: true,
        editorial: true,
        genero: true,
        inventario: true,
      },
    });

    if (!libro) {
      throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    }

    return libro;
  }

  async update(id: number, updateDto: UpdateLibroDto, usuarioId: number) {
    // Verificar que el libro exista.
    await this.findOne(id);

    const dto = updateDto as any;
    const data: Prisma.LibroUpdateInput = {};

    if (dto.titulo !== undefined) {
      data.titulo = dto.titulo;
    }

    if (dto.precio !== undefined) {
      data.precio = dto.precio;
    }

    if (dto.disponible !== undefined) {
      data.disponible = dto.disponible;
    }

    if (dto.imagen !== undefined) {
      data.imagen = dto.imagen;
    }

    // Actualizar las relaciones del libro si se enviaron.
    const relationIds: Array<{
      camel: "autorId" | "editorialId" | "generoId";
      snake: "autor_id" | "editorial_id" | "genero_id";
      relation: "autor" | "editorial" | "genero";
    }> = [
      {
        camel: "autorId",
        snake: "autor_id",
        relation: "autor",
      },
      {
        camel: "editorialId",
        snake: "editorial_id",
        relation: "editorial",
      },
      {
        camel: "generoId",
        snake: "genero_id",
        relation: "genero",
      },
    ];

    for (const item of relationIds) {
      const value = dto[item.camel] ?? dto[item.snake];

      if (value !== undefined && value !== null && value !== "") {
        const relatedId = Number(value);

        if (!Number.isInteger(relatedId) || relatedId <= 0) {
          throw new BadRequestException(
            `${item.snake} debe ser un entero positivo`,
          );
        }

        data[item.relation] = {
          connect: { id: relatedId },
        } as never;
      }
    }

    // Leer la cantidad enviada por el formulario.
    const cantidadRaw = dto.cantidad ?? dto.inventarioCantidad;
    let cantidad: number | undefined;

    if (
      cantidadRaw !== undefined &&
      cantidadRaw !== null &&
      cantidadRaw !== ""
    ) {
      cantidad = Number(cantidadRaw);

      if (!Number.isInteger(cantidad) || cantidad < 0) {
        throw new BadRequestException(
          "La cantidad del inventario debe ser un entero mayor o igual a cero",
        );
      }
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        // 1. Actualizar los datos del libro.
        const updated = await tx.libro.update({
          where: { id },
          data,
        });

        // 2. Reemplazar la cantidad solo si el formulario la envió.
        if (cantidad !== undefined) {
          await tx.inventario.upsert({
            where: { libroId: id },
            update: {
              cantidad,
              fecha: new Date(),
            },
            create: {
              libroId: id,
              cantidad,
            },
          });
        }

        // 3. Registrar la auditoría.
        await tx.auditoria.create({
          data: {
            accion: "UPDATE_LIBRO",
            detalles: `Actualización exitosa del libro ID ${id}`,
            usuarioId,
          },
        });

        return updated;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new NotFoundException(
            "No se encontró el libro o una entidad relacionada",
          );
        }

        if (error.code === "P2003") {
          throw new BadRequestException(
            "La referencia a una entidad relacionada no es válida",
          );
        }
      }

      // No convertir excepciones HTTP ya conocidas en errores 500.
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException("Error al actualizar el libro");
    }
  }

  async remove(id: number, usuarioId: number): Promise<void> {
    await this.findOne(id);

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.libro.update({
          where: { id },
          data: {
            deletedAt: new Date(),
          },
        });

        await tx.auditoria.create({
          data: {
            accion: "DELETE_LIBRO",
            detalles: `Eliminación lógica exitosa del libro ID ${id}`,
            usuarioId,
          },
        });
      });
    } catch {
      throw new InternalServerErrorException("Error al eliminar el libro");
    }
  }

  async create(dto: CreateLibroDto) {
    const data = dto as any;

    const autorId = this.resolveId(data.autorId ?? data.autor_id, "autor_id");
    const editorialId = this.resolveId(
      data.editorialId ?? data.editorial_id,
      "editorial_id",
    );
    const generoId = this.resolveId(
      data.generoId ?? data.genero_id,
      "genero_id",
    );

    try {
      return await this.prisma.libro.create({
        data: {
          titulo: data.titulo,
          precio: data.precio,
          disponible: data.disponible ?? true,
          imagen: data.imagen,
          autor: { connect: { id: autorId } },
          editorial: { connect: { id: editorialId } },
          genero: { connect: { id: generoId } },
        },
      });
    } catch (error) {
      this.handleCreateError(error);
    }
  }

  async findAllWithRelations(query: any = {}) {
    const { where, orderBy } = this.buildFilters(query);

    return this.prisma.libro.findMany({
      where,
      orderBy,
      include: {
        autor: true,
        editorial: true,
        genero: true,
        inventario: true,
      },
    });
  }

  async createWithInventory(
    dto: CreateLibroDto & {
      cantidad: number;
      fecha?: Date;
      imagen?: string;
    },
    usuarioId: number,
  ) {
    const data = dto as any;

    const autorId = this.resolveId(data.autorId ?? data.autor_id, "autor_id");
    const editorialId = this.resolveId(
      data.editorialId ?? data.editorial_id,
      "editorial_id",
    );
    const generoId = this.resolveId(
      data.generoId ?? data.genero_id,
      "genero_id",
    );

    if (!Number.isInteger(data.cantidad) || data.cantidad < 0) {
      throw new BadRequestException(
        "La cantidad de inventario debe ser un entero no negativo",
      );
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        const libro = await tx.libro.create({
          data: {
            titulo: data.titulo,
            precio: data.precio,
            disponible: data.disponible ?? true,
            imagen: data.imagen,
            autor: { connect: { id: autorId } },
            editorial: { connect: { id: editorialId } },
            genero: { connect: { id: generoId } },
          },
        });

        await tx.inventario.create({
          data: {
            libroId: libro.id,
            cantidad: data.cantidad,
          },
        });

        await tx.auditoria.create({
          data: {
            accion: "CREATE_LIBRO_CON_INVENTARIO",
            detalles: `Creación del libro ID ${libro.id} con cantidad inicial ${data.cantidad}`,
            usuarioId,
          },
        });

        return libro;
      });
    } catch (error) {
      this.handleCreateError(error);
    }
  }

  private resolveId(value: unknown, field: string): number {
    const id = Number(value);

    if (
      value === undefined ||
      value === null ||
      value === "" ||
      !Number.isInteger(id) ||
      id <= 0
    ) {
      throw new BadRequestException(
        `${field} es obligatorio y debe ser un entero positivo`,
      );
    }

    return id;
  }

  private handleCreateError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003" || error.code === "P2025") {
        throw new BadRequestException(
          "El autor, la editorial o el género indicado no existe",
        );
      }

      if (error.code === "P2002") {
        throw new ConflictException(
          "Ya existe un registro con esos datos únicos",
        );
      }
    }

    throw new InternalServerErrorException("Error al crear el libro");
  }
}
