import { Moneda } from './moneda';
import { Helpers } from '../../helpers';

export class ChequeDevuelto {

    constructor(public montoAPagar: number = 0, public tasa: number = 1) {
    }
    //Agregar ChequeDevueltoPagos
    id: number;
    chequeNo: string;
    noRecibo: string;
    fechaDevolucion: Date;
    fechaCheque: Date;
    montoPagado: number;
    monto: number;
    comentario: string;
    bancoId: number;
    clienteId: number;
    monedaId: number;
    motivoDevolucionId: number;
    fechaCreacion: Date;
    creadoPor: string;
    fechaModificacion?: any;
    modificadoPor?: any;
    estado: boolean;
    bancoNombre: string;
    clienteNombre: string;
    clienteCodigo: string;
    monedaNombre: string;
    monedaCodigo: string;
    motivoDevolucionDescripcion: string;
    montoPendiente: number;
    selected: boolean = false;


    convertido(tasa: number, moneda: Moneda) {

        if (moneda && this.monedaCodigo == moneda.codigo) {
            this.tasa = 1;
            return this.montoAPagar;
        }
        else if (moneda && moneda.codigo == "DOP") {
            this.tasa = +tasa;
            return tasa * this.montoAPagar;
        }
        else if (moneda && (moneda.codigo == "USD" || moneda.codigo == "EUR")) {
            this.tasa = +tasa;
            return Helpers.roundTo(this.montoAPagar / tasa, 2);
        }
        else {
            return 0;
        }


    }
}