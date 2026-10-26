export interface Auditoria {
  id: number;
  entidad: string;
  operacion: string;
  registro_id: number | null;
  datos_previos: object | null;
  datos_nuevos: object | null;
  fecha: Date;
}
