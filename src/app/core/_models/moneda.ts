export interface Moneda {
    id: number;
    nombre: string;
    estado: boolean;
    fechaCreacion: Date;
    creadoPor: string;
    fechaModificacion?: any;
    modificadoPor?: any;
    version: number;
    codigo: string;
    codigoCobro: number;
    tasa?: any;
    principal: boolean;
    codigoMardom: string;
    tasaVenta: number;
}
