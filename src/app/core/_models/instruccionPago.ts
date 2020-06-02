export class InstruccionPago {
    /**
     *
     */
    constructor(
        public instruccionfacturacionId: number = 0,
        public montoPagado: number = 0,
        public tasa: number = 1, public fecha: Date = new Date()) {


    }
}