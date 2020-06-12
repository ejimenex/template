
import { Helpers } from '../../helpers';

export class Instruccion {

    /**
     *
     */
    constructor(public montoAPagar: number = 0) {

    }
    id: number;
    codigoFile?: any;
    noFactura: string;
    empresaNombre: string;
    fechaSolicitudServicio: Date;
    fechaFacturacion: Date;
    subTotal: number;
    totalItbis: number;
    total: number;
    montoPagado: number;
    montoPendiente: number = 0;
    noDocumento: string;
    tasa: number;
    selected: boolean = false;
    tipoRetencion: any = null;
    montoRetenido: number = 0;
    maximoAPagar: number = this.montoPendiente - this.montoRetenido;
    //Nota Credito
    montoDebitar: number = 0;
    valorPorcentual: number = 0;


calcularRetencion() {

        if (this.tipoRetencion) {
            if (this.tipoRetencion === 0.05) {
                this.montoRetenido = Helpers.roundTo(this.tipoRetencion * this.subTotal, 2);
            } else {
                this.montoRetenido = Helpers.roundTo(this.tipoRetencion * this.totalItbis, 2);
            }

            let pendienteActual = this.montoPendiente - this.montoRetenido;
            this.montoAPagar = Helpers.roundTo(this.montoPendiente - this.montoRetenido, 2);

            this.maximoAPagar = Helpers.roundTo(this.montoPendiente - this.montoRetenido, 2);



        } else {

            let pendienteActual = this.montoPendiente - this.montoRetenido;
            this.montoAPagar = pendienteActual;
            this.maximoAPagar = (pendienteActual);
            this.montoRetenido = 0.00;
        }
    }
}