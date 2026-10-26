import { Test, TestingModule } from "@nestjs/testing";
import { LibrosService } from "./libros.service";
import { PrismaService } from "@/prisma/prisma.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("LibrosService", () => {
  let service: LibrosService;

  const usuarioId = 1;

  const libroMock: any = {
    id: 1,
    titulo: "Libro Test",
    precio: 123.45,
    disponible: true,
    imagen: "imagen.jpg",
    autorId: 1,
    editorialId: 1,
    generoId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    autor: { id: 1, nombre: "Autor Test" },
    editorial: { id: 1, nombre: "Editorial Test" },
    genero: { id: 1, nombre: "Genero Test" },
    inventario: {
      id: 1,
      libroId: 1,
      cantidad: 10,
      fecha: new Date(),
    },
  };

  const txMock: any = {
    libro: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    inventario: {
      create: jest.fn(),
      upsert: jest.fn(),
    },
    auditoria: {
      create: jest.fn(),
    },
  };

  const prismaMock: any = {
    ...txMock,
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    prismaMock.$transaction.mockImplementation(
      async (callback: (tx: any) => Promise<any>) => callback(txMock),
    );

    txMock.libro.create.mockResolvedValue(libroMock);
    txMock.libro.findMany.mockResolvedValue([libroMock]);
    txMock.libro.findUnique.mockResolvedValue(libroMock);
    txMock.libro.findFirst.mockResolvedValue(libroMock);
    txMock.libro.update.mockResolvedValue(libroMock);
    txMock.inventario.upsert.mockResolvedValue(libroMock.inventario);
    txMock.libro.delete.mockResolvedValue(libroMock);

    txMock.libro.count.mockResolvedValue(1);

    txMock.inventario.create.mockResolvedValue(libroMock.inventario);

    txMock.auditoria.create.mockResolvedValue({
      id: 1,
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibrosService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<LibrosService>(LibrosService);
  });

  it("debería estar definido", () => {
    expect(service).toBeDefined();
  });

  it("debería crear un libro con inventario y auditoría", async () => {
    const dto: any = {
      titulo: "Libro Test",
      precio: 123.45,
      disponible: true,
      autor_id: 1,
      editorial_id: 1,
      genero_id: 1,
      cantidad: 10,
      imagen: "imagen.jpg",
    };

    const resultado = await service.createWithInventory(dto, usuarioId);

    expect(resultado).toBeDefined();
    expect(resultado.titulo).toBe(dto.titulo);

    expect(prismaMock.$transaction).toHaveBeenCalled();
    expect(txMock.libro.create).toHaveBeenCalled();
    expect(txMock.inventario.create).toHaveBeenCalled();

    expect(txMock.auditoria.create).toHaveBeenCalledWith({
      data: {
        accion: "CREATE_LIBRO_CON_INVENTARIO",
        detalles: `Creación del libro ID ${libroMock.id} con cantidad inicial ${dto.cantidad}`,
        usuarioId,
      },
    });
  });

  it("debería devolver una lista de libros", async () => {
    const resultado = await service.findAll({});

    expect(resultado).toBeDefined();
    expect(Array.isArray(resultado.libros)).toBe(true);
  });

  it("debería devolver un libro por su ID", async () => {
    const resultado = await service.findOne(1);

    expect(resultado).toBeDefined();
    expect(resultado.id).toBe(1);
  });

  it("debería actualizar un libro y registrar el usuario en auditoría", async () => {
    const actualizado = {
      ...libroMock,
      titulo: "Nuevo Título",
      disponible: false,
    };

    txMock.libro.update.mockResolvedValue(actualizado);

    const resultado = await service.update(
      1,
      {
        titulo: "Nuevo Título",
        disponible: false,
      } as any,
      usuarioId,
    );

    expect(resultado).toBeDefined();
    expect(resultado.titulo).toBe("Nuevo Título");
    expect(resultado.disponible).toBe(false);

    expect(txMock.auditoria.create).toHaveBeenCalledWith({
      data: {
        accion: "UPDATE_LIBRO",
        detalles: "Actualización exitosa del libro ID 1",
        usuarioId,
      },
    });
  });

  it("debería eliminar un libro y registrar el usuario en auditoría", async () => {
    await service.remove(1, usuarioId);

    expect(txMock.libro.update).toHaveBeenCalled();

    expect(txMock.auditoria.create).toHaveBeenCalledWith({
      data: {
        accion: "DELETE_LIBRO",
        detalles: "Eliminación lógica exitosa del libro ID 1",
        usuarioId,
      },
    });
  });

  describe("findAll: filtros y paginación", () => {
    it("debería aplicar filtros, búsqueda, orden y paginación", async () => {
      await service.findAll({
        disponible: "true",
        genero_id: "2",
        editorial_id: "3",
        autor_id: "4",
        search: "  novela  ",
        order: "titulo:desc,precio:asc",
        page: "2",
        limit: "5",
      });

      expect(prismaMock.libro.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            deletedAt: null,
            disponible: true,
            generoId: 2,
            editorialId: 3,
            autorId: 4,
            titulo: {
              contains: "novela",
              mode: "insensitive",
            },
          },
          orderBy: [{ titulo: "desc" }, { precio: "asc" }],
          skip: 5,
          take: 5,
        }),
      );
    });

    it("debería aceptar el filtro disponible false", async () => {
      await service.findAll({ disponible: "false" });

      expect(prismaMock.libro.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            deletedAt: null,
            disponible: false,
          },
        }),
      );
    });

    it("debería usar valores predeterminados para la paginación", async () => {
      const resultado = await service.findAll({});

      expect(prismaMock.libro.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: 10,
          orderBy: [{ id: "asc" }],
        }),
      );

      expect(resultado.page).toBe(1);
      expect(resultado.totalPages).toBe(1);
    });

    it.each([
      { disponible: "sí" },
      { genero_id: "abc" },
      { editorial_id: "0" },
      { autor_id: "-1" },
      { page: "0" },
      { limit: "-2" },
      { page: "1.5" },
      { limit: "101" },
    ])("debería rechazar parámetros inválidos: %o", async (query) => {
      await expect(service.findAll(query)).rejects.toThrow(BadRequestException);
    });

    it("debería admitir órdenes por relaciones y múltiples órdenes en array", async () => {
      await service.findAll({
        order: [
          "editorial:asc",
          "genero:desc",
          "autor:asc",
          "id:desc",
          "createdAt:asc",
          "updatedAt:desc",
        ],
      });

      expect(prismaMock.libro.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: [
            { editorial: { nombre: "asc" } },
            { genero: { nombre: "desc" } },
            { autor: { nombre: "asc" } },
            { id: "desc" },
            { createdAt: "asc" },
            { updatedAt: "desc" },
          ],
        }),
      );
    });

    it("debería ignorar órdenes inválidas y usar el orden predeterminado", async () => {
      await service.findAll({
        order: "titulo:diagonal,desconocido:asc,,precio",
      });

      expect(prismaMock.libro.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: [{ id: "asc" }],
        }),
      );
    });
  });

  describe("findOne", () => {
    it("debería lanzar NotFoundException si el libro no existe", async () => {
      txMock.libro.findFirst.mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe("findAllWithRelations", () => {
    it("debería devolver libros con sus relaciones", async () => {
      const resultado = await service.findAllWithRelations({
        autor_id: 1,
        order: "titulo:asc",
      });

      expect(resultado).toEqual([libroMock]);
      expect(prismaMock.libro.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            deletedAt: null,
            autorId: 1,
          },
          orderBy: [{ titulo: "asc" }],
          include: {
            autor: true,
            editorial: true,
            genero: true,
            inventario: true,
          },
        }),
      );
    });

    it("debería admitir una consulta vacía", async () => {
      await service.findAllWithRelations();

      expect(prismaMock.libro.findMany).toHaveBeenCalled();
    });
  });

  describe("update: inventario", () => {
    it("debería reemplazar la cantidad existente", async () => {
      await service.update(1, { cantidad: 25 } as any, usuarioId);

      expect(txMock.inventario.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { libroId: 1 },
          update: expect.objectContaining({
            cantidad: 25,
            fecha: expect.any(Date),
          }),
          create: {
            libroId: 1,
            cantidad: 25,
          },
        }),
      );
    });

    it("debería aceptar una cantidad de inventario igual a cero", async () => {
      await service.update(1, { cantidad: 0 } as any, usuarioId);

      expect(txMock.inventario.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: expect.objectContaining({ cantidad: 0 }),
        }),
      );
    });

    it.each([-1, 1.5, "abc"])(
      "debería rechazar una cantidad inválida: %s",
      async (cantidad) => {
        await expect(
          service.update(1, { cantidad } as any, usuarioId),
        ).rejects.toThrow(BadRequestException);
      },
    );

    it("no debería modificar el inventario si no se envía cantidad", async () => {
      await service.update(1, { titulo: "Solo título" } as any, usuarioId);

      expect(txMock.inventario.upsert).not.toHaveBeenCalled();
    });

    it("debería aceptar inventarioCantidad como nombre alternativo", async () => {
      await service.update(1, { inventarioCantidad: "15" } as any, usuarioId);

      expect(txMock.inventario.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          update: expect.objectContaining({ cantidad: 15 }),
        }),
      );
    });
  });

  describe("create: validaciones", () => {
    const dtoValido: any = {
      titulo: "Nuevo libro",
      precio: 100,
      disponible: true,
      autor_id: 1,
      editorial_id: 1,
      genero_id: 1,
    };

    it("debería crear un libro correctamente", async () => {
      const resultado = await service.create(dtoValido);

      expect(resultado).toEqual(libroMock);
      expect(prismaMock.libro.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            titulo: "Nuevo libro",
            autor: { connect: { id: 1 } },
            editorial: { connect: { id: 1 } },
            genero: { connect: { id: 1 } },
          }),
        }),
      );
    });

    it.each([
      { autor_id: 0 },
      { editorial_id: "abc" },
      { genero_id: undefined },
    ])("debería rechazar IDs inválidos: %o", async (cambios) => {
      await expect(
        service.create({ ...dtoValido, ...cambios }),
      ).rejects.toThrow(BadRequestException);
    });

    it("debería usar disponible true si no se envía", async () => {
      const { disponible, ...dto } = dtoValido;

      await service.create(dto);

      expect(prismaMock.libro.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ disponible: true }),
        }),
      );
    });
  });

  describe("createWithInventory: validaciones", () => {
    const dtoValido: any = {
      titulo: "Nuevo libro",
      precio: 100,
      disponible: true,
      autor_id: 1,
      editorial_id: 1,
      genero_id: 1,
      cantidad: 10,
    };

    it.each([-1, 1.5, "10"])(
      "debería rechazar una cantidad inválida: %s",
      async (cantidad) => {
        await expect(
          service.createWithInventory({ ...dtoValido, cantidad }, usuarioId),
        ).rejects.toThrow(BadRequestException);
      },
    );

    it("debería rechazar un ID de autor inválido", async () => {
      await expect(
        service.createWithInventory({ ...dtoValido, autor_id: 0 }, usuarioId),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
