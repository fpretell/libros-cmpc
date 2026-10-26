import { PrismaService } from "./prisma.service";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

jest.mock("@prisma/adapter-pg", () => ({
  PrismaPg: jest.fn().mockImplementation((config) => ({
    config,
  })),
}));

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(function (this: any, config) {
    this.config = config;
    this.$connect = jest.fn().mockResolvedValue(undefined);
    this.$disconnect = jest.fn().mockResolvedValue(undefined);
  }),
}));

describe("PrismaService", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();

    process.env = {
      ...originalEnv,
      DB_HOST: "localhost",
      DB_PORT: "5432",
      DB_USERNAME: "test_user",
      DB_PASSWORD: "test_password",
      DB_NAME: "test_db",
    };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("debería construir el servicio con la configuración de PostgreSQL", () => {
    const service = new PrismaService();

    expect(service).toBeDefined();
    expect(PrismaPg).toHaveBeenCalledWith({
      connectionString:
        "postgresql://test_user:test_password@localhost:5432/test_db",
    });
    expect(PrismaClient).toHaveBeenCalledTimes(1);
  });

  it("debería codificar caracteres especiales en usuario y contraseña", () => {
    process.env.DB_USERNAME = "user@demo";
    process.env.DB_PASSWORD = "pass:word/123";

    new PrismaService();

    expect(PrismaPg).toHaveBeenCalledWith({
      connectionString:
        "postgresql://user%40demo:pass%3Aword%2F123@localhost:5432/test_db",
    });
  });

  it.each(["DB_HOST", "DB_PORT", "DB_USERNAME", "DB_PASSWORD", "DB_NAME"])(
    "debería lanzar un error si falta %s",
    (variable) => {
      delete process.env[variable];

      expect(() => new PrismaService()).toThrow(
        "Faltan variables de conexión a PostgreSQL",
      );
    },
  );

  it("debería conectar al inicializar el módulo", async () => {
    const service = new PrismaService();

    await service.onModuleInit();

    expect(service.$connect).toHaveBeenCalledTimes(1);
  });

  it("debería desconectar al destruir el módulo", async () => {
    const service = new PrismaService();

    await service.onModuleDestroy();

    expect(service.$disconnect).toHaveBeenCalledTimes(1);
  });
});
