export interface AuditoriaCreateDto {
  entidad: string;
  operacion: string;
  registro_id: number;
  datos_previos: object | null;
  datos_nuevos: object | null;
  fecha?: Date;
}
