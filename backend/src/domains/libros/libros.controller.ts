// src/domains/libros/libros.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Res,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { LibrosService } from "./libros.service";
import { UpdateLibroDto } from "./dto/update-libro.dto";

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Response } from "express";
import { Parser } from "json2csv";
import { CreateLibroConInventarioDto } from "./dto/create-libro-con-inventario.dto";
import { ApiBody } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Public } from "src/auth/public.decorator";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { mkdirSync, mkdir } from "fs";

const uploadDir = join(process.cwd(), "uploads");
mkdirSync(uploadDir, { recursive: true });

@ApiBearerAuth("jwt")
@ApiTags("Libros")
@UseGuards(JwtAuthGuard)
@Controller("libros")
export class LibrosController {
  constructor(private readonly librosService: LibrosService) { }

  @Get('/health')
  @Public()
  @ApiOperation({
    summary: 'Verificar el estado del módulo de libros',
    description: 'Comprueba que el endpoint de salud esté disponible.',
  })
  @ApiResponse({
    status: 200,
    description: 'El módulo de libros está funcionando correctamente.',
    schema: {
      example: { status: 'ok' },
    },
  })
  healthCheck() {
    return { status: 'ok' };
  }

  @Get("export/csv")
  async exportToCsv(@Query() query: any, @Res() res: Response) {
    const libros = await this.librosService.findAllWithRelations(query);

    const plainData = libros.map((libro) => ({
      id: libro.id,
      titulo: libro.titulo,
      precio: libro.precio,
      disponible: libro.disponible,
      autor: libro.autor?.nombre,
      editorial: libro.editorial?.nombre,
      genero: libro.genero?.nombre,
    }));

    const fields = [
      "id",
      "titulo",
      "precio",
      "disponible",
      "autor",
      "editorial",
      "genero",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(plainData);

    res.header("Content-Type", "text/csv");
    res.attachment("libros.csv");
    res.send(csv);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos los libros con relaciones" })
  @ApiResponse({ status: 200, description: "Libros encontrados" })
  getAll(@Query() query: any) {
    return this.librosService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener un libro por ID" })
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.librosService.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(
    FileInterceptor("imagen", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          mkdir(uploadDir, { recursive: true }, (err) => {
            cb(err, uploadDir);
          });
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);

          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateLibroDto: UpdateLibroDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    if (file) {
      updateLibroDto.imagen = file.filename;
    }

    return this.librosService.update(id, updateLibroDto, req.user.userId);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar un libro" })
  remove(@Param("id", ParseIntPipe) id: number, @Req() req) {
    return this.librosService.remove(id, req.user.userId);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("imagen", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          mkdir(uploadDir, { recursive: true }, (err) => {
            cb(err, uploadDir);
          });
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiOperation({ summary: "Crear un libro con inventario inicial" })
  @ApiResponse({ status: 201, description: "Libro creado con inventario" })
  @ApiBody({
    type: CreateLibroConInventarioDto,
    description: "Libro a crear",
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateLibroConInventarioDto,
    @Req() req,
  ) {
    if (file) {
      dto.imagen = file.filename;
    }
    return this.librosService.createWithInventory(dto, req.user.userId);
  }
}
