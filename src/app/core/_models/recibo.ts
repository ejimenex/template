import { InstruccionPago } from "./instruccionPago";
import { ArrayNotEmpty, IsNumber, IsNotEmpty, IsOptional, Min, ValidateIf } from "class-validator";

const message = {
    required: "El campo $property es requerido",
}

export class Recibo {

    @IsNotEmpty({ message: "El campo $property es requerido" })
    cliente: any = {};

    @IsNotEmpty({ message: message.required })
    clienteId: number = 0;

    @IsNotEmpty({ message: message.required })
    clientePagosTipoId: number = 1;

    @IsNotEmpty({ message: message.required })
    clientePagosTipo: any = undefined;


    @IsNotEmpty({ message: message.required })
    moneda: any = undefined;

    @IsNotEmpty({ message: message.required })
    monedaId: number;

    @IsNotEmpty({ message: message.required })
    //@IsNumber(this, { message: "El monto pagado debe ser numerico." })
    @Min(1, { message: "El monto pagado debe ser mayor que: 1" })
    montoPagado: number = 0;

    @IsNotEmpty({ message: message.required })
    tasa: number = 1;

    @IsNotEmpty({ message: message.required })
    tipoPagoId: number = undefined;

    @ValidateIf(o => o.clientePagosTipo.codigo === "fac" || o.clientePagosTipo.codigo === "ree")
    @ArrayNotEmpty({ message: "No hay ninguna instruccion seleccionada para aplicar pago." })
    InstruccionPagos: Array<InstruccionPago> = [];


    @ValidateIf(o => o.clientePagosTipo.codigo === "rep")
    @ArrayNotEmpty({ message: "No hay ninguna instruccion seleccionada para aplicar pago." })
    ChequeDevueltoPagos: Array<any> = [];

    @IsNotEmpty({ message: message.required })
    empresaId: number = 6;

    @IsNotEmpty({ message: message.required })
    fecha: Date = new Date();

    @IsNotEmpty({ message: message.required })
    codigoEmpresa: string = "MARDOM";

    @IsOptional({ message: message.required })
    comentario: string;

    @ValidateIf(o => o.clientePagosTipo.codigo === "otr")
    @IsNotEmpty({ message: message.required })
    conceptoOtrosIngresosId: any = null;

    @ValidateIf(o => o.clientePagosTipo.codigo === "otr")
    @IsNotEmpty({ message: message.required })
    lineaId: number = null;

    @ValidateIf(o => o.tipoPagoId == 1 || o.tipoPagoId == 4)
    @IsNotEmpty({ message: message.required })
    bancoId: number = null;

    @ValidateIf(o => o.tipoPagoId == 1 || o.tipoPagoId == 4)
    @IsNotEmpty({ message: message.required })
    noReferencia: string = null;

    noDeposito: string = null;

    origenId: number = null;

    @IsNotEmpty({ message: message.required })
    fechaRecepcionCheque: Date = new Date();



}