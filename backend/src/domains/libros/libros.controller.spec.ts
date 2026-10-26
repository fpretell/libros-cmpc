import { Test, TestingModule } from "@nestjs/testing";
import { Prisma } from "@prisma/client";
import { LibrosController } from "./libros.controller";
import { LibrosService } from "./libros.service";

describe("LibrosController", () => {
  let controller: LibrosController;
  let service: LibrosService;

  const reqMock = {
    user: {
      userId: 1,
      email: "test@test.com",
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibrosController],
      providers: [
        {
          provide: LibrosService,
          useValue: {
            findAll: jest.fn(),
            findAllWithRelations: jest.fn(),
            findOne: jest.fn(),
            createWithInventory: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LibrosController>(LibrosController);
    service = module.get<LibrosService>(LibrosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getById", () => {
    it("debería retornar un libro por id", async () => {
      const fecha = new Date();

      const libroMock = {
        id: 1,
        titulo: "Test Libro",
        precio: new Prisma.Decimal("100.00"),
        disponible: true,
        imagen: null,
        autorId: 1,
        editorialId: 1,
        generoId: 1,
        createdAt: fecha,
        updatedAt: fecha,
        deletedAt: null,
        autor: {
          id: 1,
          nombre: "Autor de prueba",
        },
        editorial: {
          id: 1,
          nombre: "Editorial de prueba",
        },
        genero: {
          id: 1,
          nombre: "Género de prueba",
        },
        inventario: {
          id: 1,
          libroId: 1,
          cantidad: 10,
          fecha,
        },
      };

      jest.spyOn(service, "findOne").mockResolvedValue(libroMock as any);

      const result = await controller.getById(1);

      expect(result).toEqual(libroMock);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("remove", () => {
    it("debería eliminar un libro existente y pasar el usuarioId", async () => {
      jest.spyOn(service, "remove").mockResolvedValue(undefined);

      await controller.remove(1, reqMock as any);

      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(1, 1);
    });
  });

  describe("update", () => {
    it("debería actualizar un libro existente y pasar el usuarioId", async () => {
      const fecha = new Date();
      const updateDto = { titulo: "Libro actualizado" };

      const libroMock = {
        id: 1,
        titulo: updateDto.titulo,
        precio: new Prisma.Decimal("100.00"),
        disponible: true,
        imagen: null,
        autorId: 1,
        editorialId: 1,
        generoId: 1,
        createdAt: fecha,
        updatedAt: fecha,
        deletedAt: null,
      };

      jest.spyOn(service, "update").mockResolvedValue(libroMock as any);

      const result = await controller.update(
        1,
        updateDto as any,
        undefined,
        reqMock as any,
      );

      expect(result).toEqual(libroMock);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(1, updateDto, 1);
    });
  });

  describe("healthCheck", () => {
    it("debería retornar el estado ok", () => {
      expect(controller.healthCheck()).toEqual({ status: "ok" });
    });
  });

  describe("getAll", () => {
    it("debería pasar los filtros al servicio", async () => {
      const query = {
        search: "novela",
        disponible: "true",
        page: "2",
        limit: "5",
      };

      const respuesta = {
        libros: [{ id: 1, titulo: "Novela" }],
        total: 1,
        page: 2,
        totalPages: 1,
      };

      jest.spyOn(service, "findAll").mockResolvedValue(respuesta as any);

      await expect(controller.getAll(query)).resolves.toEqual(respuesta);
      expect(service.findAll).toHaveBeenCalledWith(query);
    });

    it("debería propagar los errores del servicio", async () => {
      jest
        .spyOn(service, "findAll")
        .mockRejectedValue(new Error("Error de consulta"));

      await expect(controller.getAll({})).rejects.toThrow("Error de consulta");
    });
  });

  describe("create", () => {
    const dto: any = {
      titulo: "Libro nuevo",
      precio: 100,
      autor_id: 1,
      editorial_id: 1,
      genero_id: 1,
      cantidad: 5,
    };

    it("debería crear un libro sin imagen", async () => {
      const libroCreado = { id: 10, titulo: "Libro nuevo" };

      jest
        .spyOn(service, "createWithInventory")
        .mockResolvedValue(libroCreado as any);

      const resultado = await controller.create(
        undefined,
        { ...dto },
        reqMock as any,
      );

      expect(resultado).toEqual(libroCreado);
      expect(service.createWithInventory).toHaveBeenCalledWith(dto, 1);
    });

    it("debería asignar el nombre de archivo al DTO", async () => {
      const file = {
        filename: "portada-test.jpg",
      } as Express.Multer.File;

      jest
        .spyOn(service, "createWithInventory")
        .mockResolvedValue({ id: 10 } as any);

      const dtoConImagen = { ...dto };

      await controller.create(file, dtoConImagen, reqMock as any);

      expect(dtoConImagen.imagen).toBe("portada-test.jpg");
      expect(service.createWithInventory).toHaveBeenCalledWith(dtoConImagen, 1);
    });

    it("debería propagar los errores de creación", async () => {
      jest
        .spyOn(service, "createWithInventory")
        .mockRejectedValue(new Error("Error al crear"));

      await expect(
        controller.create(undefined, { ...dto }, reqMock as any),
      ).rejects.toThrow("Error al crear");
    });
  });

  describe("exportToCsv", () => {
    it("debería generar CSV y configurar la respuesta HTTP", async () => {
      jest.spyOn(service, "findAllWithRelations").mockResolvedValue([
        {
          id: 1,
          titulo: "Libro de prueba",
          precio: 100,
          disponible: true,
          autor: { nombre: "Autor" },
          editorial: { nombre: "Editorial" },
          genero: { nombre: "Novela" },
        },
      ] as any);

      const resMock = {
        header: jest.fn().mockReturnThis(),
        attachment: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      await controller.exportToCsv({}, resMock as any);

      expect(service.findAllWithRelations).toHaveBeenCalledWith({});
      expect(resMock.header).toHaveBeenCalledWith("Content-Type", "text/csv");
      expect(resMock.attachment).toHaveBeenCalledWith("libros.csv");
      expect(resMock.send).toHaveBeenCalledWith(
        expect.stringContaining("Libro de prueba"),
      );
    });

    it("debería admitir libros sin relaciones", async () => {
      jest.spyOn(service, "findAllWithRelations").mockResolvedValue([
        {
          id: 2,
          titulo: "Libro sin relaciones",
          precio: 50,
          disponible: false,
          autor: null,
          editorial: null,
          genero: null,
        },
      ] as any);

      const resMock = {
        header: jest.fn().mockReturnThis(),
        attachment: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };

      await controller.exportToCsv({}, resMock as any);

      expect(resMock.send).toHaveBeenCalledWith(
        expect.stringContaining("Libro sin relaciones"),
      );
    });
  });

  describe("update: imagen", () => {
    it("debería asignar el nombre del archivo al DTO", async () => {
      const dto: any = { titulo: "Actualizado" };
      const file = {
        filename: "nueva-portada.jpg",
      } as Express.Multer.File;

      jest.spyOn(service, "update").mockResolvedValue({
        id: 1,
        titulo: "Actualizado",
        imagen: "nueva-portada.jpg",
      } as any);

      await controller.update(1, dto, file, reqMock as any);

      expect(dto.imagen).toBe("nueva-portada.jpg");
      expect(service.update).toHaveBeenCalledWith(1, dto, 1);
    });
  });

  describe("remove: errores", () => {
    it("debería propagar los errores del servicio", async () => {
      jest
        .spyOn(service, "remove")
        .mockRejectedValue(new Error("No se pudo eliminar"));

      await expect(controller.remove(1, reqMock as any)).rejects.toThrow(
        "No se pudo eliminar",
      );
    });
  });
});
