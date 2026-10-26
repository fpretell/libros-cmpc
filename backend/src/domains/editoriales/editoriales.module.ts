import { Module } from "@nestjs/common";
import { EditorialesService } from "./editoriales.service";
import { EditorialesController } from "./editoriales.controller";
import { PrismaService } from "@/prisma/prisma.service";

@Module({
  controllers: [EditorialesController],
  providers: [EditorialesService, PrismaService],
  exports: [EditorialesService],
})
export class EditorialesModule {}
