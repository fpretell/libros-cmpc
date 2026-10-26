import { Module } from "@nestjs/common";
import { AutoresService } from "./autores.service";
import { AutoresController } from "./autores.controller";
import { PrismaService } from "@/prisma/prisma.service";

@Module({
  controllers: [AutoresController],
  providers: [AutoresService, PrismaService],
})
export class AutoresModule {}
