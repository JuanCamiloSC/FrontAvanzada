export interface ReporteDTO {
[x: string]: any;
   id: string;
   titulo: string;
   descripcion: string;
   imagen: string;
   fecha: Date;
   categoria: string;
   estadoActual: string;
   ubicacion: UbicacionDTO;
   ciudad: string;
}


export interface UbicacionDTO {
   latitud: number;
   longitud: number;
}


