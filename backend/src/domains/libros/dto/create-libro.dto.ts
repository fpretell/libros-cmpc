import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";
import { Type, Transform } from "class-transformer";

export class CreateLibroDto {
  @IsString()
  titulo: string;

  @IsNumber()
  @Type(() => Number)
  precio: number;

  @IsBoolean()
  @Transform(({ value }) => value === true || value === "true")
  disponible: boolean;

  @IsNumber()
  @Type(() => Number)
  autor_id: number;

  @IsOptional()
  @IsString()
  imagen: string;

  @IsNumber()
  @Type(() => Number)
  editorial_id: number;

  @IsNumber()
  @Type(() => Number)
  genero_id: number;
}
