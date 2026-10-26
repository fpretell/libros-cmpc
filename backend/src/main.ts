import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import * as express from "express";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as path from "path";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // URL autorizada del frontend, definida en las variables de entorno
  const frontendUrl = configService.getOrThrow<string>("FRONTEND_URL");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle("Gestión Libros API")
    .setDescription(`
API para la gestión de libros.

**Autenticación**
- Utiliza el endpoint \`/api/v1/auth/login\` para iniciar sesión.
- Copia el token recibido y pulsa "Authorize" para acceder a los endpoints protegidos.
- También puedes registrar usuarios mediante \`/api/v1/auth/register\`.
`)
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        in: "header",
      },
      "jwt",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/v1/docs", app, document);

  // CORS utiliza únicamente FRONTEND_URL
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  // Archivos estáticos
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
