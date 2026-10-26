import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LibrosModule } from "./domains/libros/libros.module";
import { GenerosModule } from "./domains/generos/generos.module";
import { EditorialesModule } from "./domains/editoriales/editoriales.module";
import { AutoresModule } from "./domains/autores/autores.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LibrosModule,
    GenerosModule,
    EditorialesModule,
    AutoresModule,
    AuthModule,
  ],
})
export class AppModule {}
