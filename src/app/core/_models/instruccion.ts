import { Moneda } from "./moneda";
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
    moneda?: Moneda;
    noDocumento: string;
    tasa: number;
    selected: boolean = false;
    tipoRetencion: any = null;
    montoRetenido: number = 0;
    maximoAPagar: number = this.montoPendiente - this.montoRetenido;
    //Nota Credito
    montoDebitar: number = 0;
    valorPorcentual: number = 0;



    convertido(tasa: number, moneda: Moneda) {

        if (moneda && this.moneda.codigo == moneda.codigo) {
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