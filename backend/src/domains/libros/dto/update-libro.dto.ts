import { PartialType } from "@nestjs/mapped-types";
import { CreateLibroDto } from "./create-libro.dto";
import { IsInt, Min, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class UpdateLibroDto extends PartialType(CreateLibroDto) {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  cantidad?: number;
}
