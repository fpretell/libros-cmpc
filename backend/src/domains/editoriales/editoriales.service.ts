import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateEditorialDto } from "./dto/create-editorial.dto";

@Injectable()
export class EditorialesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEditorialDto) {
    try {
      return await this.prisma.editorial.create({
        data: {
          nombre: dto.nombre,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException("Ya existe una editorial con esos datos.");
      }

      throw error;
    }
  }

  async findAll() {
    return this.prisma.editorial.findMany({
      orderBy: {
        nombre: "asc",
      },
    });
  }

  async findOne(id: number) {
    const editorial = await this.prisma.editorial.findUnique({
      where: { id },
    });

    if (!editorial) {
      throw new NotFoundException(`Editorial con ID ${id} no encontrada`);
    }

    return editorial;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    try {
      await this.prisma.editorial.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2003"
      ) {
        throw new ConflictException(
          "No se puede eliminar la editorial porque tiene libros asociados.",
        );
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundException(`Editorial con ID ${id} no encontrada`);
      }

      throw error;
    }
  }
}
