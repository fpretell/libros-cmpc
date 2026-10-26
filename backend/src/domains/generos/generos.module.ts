import { Module } from "@nestjs/common";
import { GenerosService } from "./generos.service";
import { GenerosController } from "./generos.controller";
import { PrismaService } from "@/prisma/prisma.service";

@Module({
  controllers: [GenerosController],
  providers: [GenerosService, PrismaService],
})
export class GenerosModule {}
