import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateGeneroDto } from "./dto/create-genero.dto";

@Injectable()
export class GenerosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGeneroDto) {
    return this.prisma.genero.create({
      data: {
        nombre: dto.nombre,
      },
    });
  }

  async findAll() {
    return this.prisma.genero.findMany();
  }

  async findOne(id: number) {
    const genero = await this.prisma.genero.findUnique({
      where: { id },
    });

    if (!genero) {
      throw new NotFoundException(`Género con ID ${id} no encontrado`);
    }

    return genero;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.prisma.genero.delete({
      where: { id },
    });
  }
}
