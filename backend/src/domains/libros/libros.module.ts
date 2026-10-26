import { Module } from "@nestjs/common";
import { LibrosService } from "./libros.service";
import { LibrosController } from "./libros.controller";
import { PrismaService } from "@/prisma/prisma.service";

@Module({
  providers: [LibrosService, PrismaService],
  controllers: [LibrosController],
})
export class LibrosModule {}
