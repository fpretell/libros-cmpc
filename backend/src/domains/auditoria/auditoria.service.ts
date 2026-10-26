import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";

export interface CrearAuditoriaDto {
  accion: string;
  detalles?: string;
  usuarioId?: number;
}

@Injectable()
export class AuditoriaService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Registra una acción realizada en el sistema.
   */
  async crear(dto: CrearAuditoriaDto) {
    return this.prisma.auditoria.create({
      data: {
        accion: dto.accion,
        detalles: dto.detalles,
        usuario:
          dto.usuarioId !== undefined
            ? { connect: { id: dto.usuarioId } }
            : undefined,
      },
    });
  }

  /**
   * Obtiene las auditorías más recientes.
   */
  async findAll(limite = 100) {
    const take = Math.min(Math.max(1, limite), 500);

    return this.prisma.auditoria.findMany({
      take,
      orderBy: { createdAt: "desc" },
      include: {
        usuario: {
          select: {
            id: true,
            email: true,
            nombre: true,
          },
        },
      },
    });
  }

  /**
   * Busca una auditoría por su identificador.
   */
  async findOne(id: number) {
    return this.prisma.auditoria.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            email: true,
            nombre: true,
          },
        },
      },
    });
  }

  /**
   * Obtiene el historial de un usuario.
   */
  async findByUsuario(usuarioId: number, limite = 100) {
    const take = Math.min(Math.max(1, limite), 500);

    return this.prisma.auditoria.findMany({
      where: { usuarioId },
      take,
      orderBy: { createdAt: "desc" },
    });
  }
}
