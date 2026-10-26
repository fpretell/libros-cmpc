import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateAutorDto } from "./dto/create-autor.dto";

@Injectable()
export class AutoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAutorDto) {
    return this.prisma.autor.create({
      data: {
        nombre: dto.nombre,
      },
    });
  }

  async findAll() {
    return this.prisma.autor.findMany();
  }

  async findOne(id: number) {
    const autor = await this.prisma.autor.findUnique({
      where: { id },
    });

    if (!autor) {
      throw new NotFoundException(`Autor con ID ${id} no encontrado`);
    }

    return autor;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prisma.autor.delete({
      where: { id },
    });
  }

  async exportToCsvData() {
    const autores = await this.prisma.autor.findMany({
      include: {
        libros: true,
      },
    });

    return autores.map((autor) => ({
      id: autor.id,
      nombre: autor.nombre,
      cantidadLibros: autor.libros.length,
    }));
  }
}
