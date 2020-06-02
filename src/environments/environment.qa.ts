import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

export const environment: any = {
    production: true,
    silent: false
};

export const config: any = {
    apiUrl: "http://10.228.30.87:8001/api/",// "http://localhost:5000/api/"
    mantenimientoUrl: "http://10.228.30.106:5600/api/",
    serverUrl: "http://10.228.30.87:8025/",
    reportUrl: "http://mardom-qa-srv01/",
    reportServerUrl: "http://mardom-sql-srv01/ReportServer",
    diferenciaMinima: 100,
    modalConfig: <NgbModalOptions>{ size: "lg", backdrop: "static", keyboard: false },
    retenciones: [
        { value: 0.00, label: "N/A", group: "N/A" },
        { value: 0.05, label: "5% ISR", group: "ISR" },
        { value: 0.02, label: "2% ITBIS", group: "ITBIS" },
        { value: 0.3, label: "30% ITBIS", group: "ITBIS" },
        { value: 1.00, label: "100% ITBIS", group: "ITBIS" }
    ],
    dias: 30,
    conceptos: ["Corrección", "Descuento", "Anulación"],
    motivos: [
        { id: 4, nombre: "Faltantes" },
        { id: 5, nombre: "Cargos Bancarios" },
        { id: 6, nombre: "Avances P. Anteriores" },
        { id: 12, nombre: "Cuentas Incobrables" },
        { id: 10, nombre: "Descargo Armadores" },
        { id: 11, nombre: "Cuenta Empleado" }
    ],
    reportes: [
        {
            Label: "Estado de cuenta",
            Url: "Global Mardom/ReportesFacturacion/Desarrollo/FacturasPendientesPorCliente",
            requiereCliente: true
        },
        {
            Label: "Saldo por antiguedad",
            Url: "Global Mardom/ReportesFacturacion/Desarrollo/FacturasPendientesPorCliente_SaldoPorAntiguedad",
            requiereCliente: false
        },
        {
            Label: "Saldo por antiguedad (detallado por facturas)",
            Url: "Global Mardom/ReportesFacturacion/Desarrollo/FacturasPendientesPorCliente_SaldoPorAntiguedad_Detallado",
            requiereCliente: true
        },
        {
            Label: "Movimiento Cliente",
            Url: "Global Mardom/ReportesFacturacion/Desarrollo/Reporte Movimiento",
            requiereCliente: true
        }
    ],
    mantenimientoGeneralUrl: "http://192.168.50.5:8084",
    firmaUsuario: `<br/><br/><img src='logo' width='140' height='68'  />  
                          <p style='font: bold 15px arial; color:#091b38'>
                            <usuario></usuario> | Marítima Dominicana, S.A.S.
                          </p>
                          <p>Main Switchboard(809) 539-6000 <br />Fax(809) 539-7338 <br/><a href='http://www.mardom.com' target='_blank'>http://www.mardom.com </a>
                          <br/>Our group email address is 
                          <br /><a href='&lt;facturacion@mardom.com&gt;' target='_blank' class=''>cobros@mardom.com</a></p>`
};

export const endpoint: any = {
    transaccionUrl: config.apiUrl + "facturacion/Deposito/Transacciones/",
    depositsUrl: config.apiUrl + "facturacion/Deposito/",
    clienteUrl: config.apiUrl + "sistemas/clientes/",
    motivoAnulacion: config.apiUrl + "facturacion/AnularArchivo",
    monedaUrl: config.apiUrl + "Facturacion/Monedas",
    bancoUrl: config.apiUrl + "Facturacion/Bancos",
    authenticationUrl: config.apiUrl + "authentication/token",
    usuariosUrl: config.apiUrl + "sistemas/empleados",
    recibosUrl: config.apiUrl + "facturacion/ClientePagos",
    empresasUrl: config.apiUrl + "facturacion/empresas",
    tiposDePagoUrl: config.apiUrl + "facturacion/TipoPagos",
    lineaUrl: config.apiUrl + "facturacion/Linea",
    tiposReciboUrl: config.apiUrl + "facturacion/ClientePagosTipo",
    facturacionUrl: config.apiUrl + "facturacion/InstruccionFacturacion",
    reciboIngresoUrl: config.apiUrl + "facturacion/ReciboIngresos/",
    conceptoUrl: config.apiUrl + "facturacion/ConceptoOtrosIngresos",
    instruccionPagoUrl: config.apiUrl + "facturacion/InstruccionPagos",
    notaCreditoSNUrl: config.apiUrl + "facturacion/NotaCreditoSinNCF",
    notasCreditoUrl: config.apiUrl + "facturacion/NotaCredito",
    notaPagoUrl: config.apiUrl + "facturacion/NotaPago",
    fileServiceUrl: config.mantenimientoUrl + "Documentos/",
    notaCreditoUrl: config.apiUrl + "facturacion/ReporteNotaCredito",
    notaCreditoMantenimientoUrl: config.apiUrl + "facturacion/NotaCreditoMantenimiento/",
    chequesDevueltosUrl: config.apiUrl + "facturacion/ChequeDevuelto/",
    motivosDevolucionUrl: config.apiUrl + "facturacion/MotivoDevolucion/",
    depositoAnulacionUrl: config.apiUrl + "facturacion/DepositoAnulacion/",
    categoriaFacturacionUrl: config.apiUrl + "facturacion/CategoriasFactura",
    movimientosUrl: config.apiUrl + "facturacion/MovimientoCliente",
    contactosUrl: config.apiUrl + "facturacion/ClienteEmail",
    estadoCuentaUrl: config.apiUrl + "facturacion/Clientes/EnviarEstadoDeCuenta",
    tiposClienteUrl: config.apiUrl + "sistemas/TiposClientes",
};


export const reports: any =
{
    recibo: config.reportUrl + "reports/report/Develop/rptReiboPago",
    reciboPagoFull: config.reportUrl + "reports/report/Develop/rptReciboPagoFull",
    notaCredito: config.reportUrl + "reports/report/Develop/ReciboNotaCredito",
    notaCreditoNCF: config.reportUrl + "Reports/report/Global%20Mardom/ReportesFacturacion/ReciboNotaCreditoConNCF",
    notaCreditoNCFResumido: config.reportUrl + "reports/report/Develop/ReporteNotaCreditoConNcfHeader",
    notaCreditoNCFDetallado: config.reportUrl + "reports/report/Develop/RepNCConNCF_Cobros",
    notaCreditoSinNCF: config.reportUrl + "reports/report/Develop/ReporteNotaCreditoSinNcfCobros)",
    notaPago: config.reportUrl + "ReportS/report/Global%20Mardom/ReportesFacturacion/Desarrollo/ReporteNotasDePago",
    depositos: config.reportUrl + "Reports/report/Global%20Mardom/ReportesFacturacion/ReporteIngresos",
    reciboPagoRango: config.reportUrl + "Reports/report/Global%20Mardom/ReportesFacturacion/rptReciboPagoRango",
    reciboPagoFullCaja: config.reportUrl + "Reports/report/Global%20Mardom/ReportesFacturacion/rptReciboPagoFullCaja",
    depositosCaja: config.reportServerUrl + "/Pages/ReportViewer.aspx?%2fGlobal+Mardom%2fFacturacion%2fDepositosPagadosCaja&rs:Command=Render",
    otrosIngresos: config.reportUrl + "Reports/report/Global%20Mardom/ReportesFacturacion/rptReciboPagoFullCajaOtros"
};

