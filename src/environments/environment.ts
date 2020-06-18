// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

export const environment: any = {
  production: false,
};

export const config: any = {
  apiUrl: "http://10.228.30.87:8001/api/", //"http://localhost:5000/api/",//"http://10.228.30.87:8001/api/", //"http://192.168.50.5:6001/api/",//  "http://192.168.50.5:6002/api/",
  mantenimientoUrl: "http://10.228.30.106:5600/api/",
  apiArchivo:'http://localhost:5000/api/',
  authentication: "http://10.228.30.87:8001/api/",
  serverUrl: "http://10.228.30.87:8025/",
  reportUrl: "http://mardom-qa-srv01/",
  reportServerUrl: "http://mardom-sql-srv01/ReportServer",
  diferenciaMinima: 100,
  modalConfig: <NgbModalOptions>{
    size: "lg",
    backdrop: "static",
    keyboard: false,
  },
};

export const endpoint: any = {
  companyUrl: config.apiArchivo + "company",
  bankUrl: config.apiArchivo + "bank",
  currencyUrl: config.apiArchivo + "currency",
  detail: config.apiArchivo + "bankFileDetail",
  listFile: config.apiArchivo + "ListFile",

  bankFiles: config.apiArchivo + "bankFile",


  transaccionUrl: config.apiUrl + "facturacion/Deposito/Transacciones/",
  depositsUrl: config.apiUrl + "facturacion/Deposito/",
  clienteUrl: config.apiUrl + "sistemas/clientes/",
  motivoAnulacion: config.apiUrl + "facturacion/AnularArchivo",
  monedaUrl: config.apiUrl + "Facturacion/Monedas",
  bancoUrl: config.apiUrl + "Facturacion/Bancos",
  authenticationUrl: config.authentication + "authentication/token",
  usuariosUrl: config.apiUrl + "sistemas/empleados",
  recibosUrl: config.apiUrl + "facturacion/ClientePagos",
  empresasUrl: config.apiUrl + "facturacion/empresas",
  tiposDePagoUrl: config.apiUrl + "facturacion/TipoPagos",
  lineaUrl: config.apiUrl + "facturacion/Linea",
  tiposReciboUrl: config.apiUrl + "facturacion/ClientePagosTipo",
  tiposClienteUrl: config.apiUrl + "sistemas/TiposClientes",
  facturacionUrl: config.apiUrl + "facturacion/InstruccionFacturacion",
  reciboIngresoUrl: config.apiUrl + "facturacion/ReciboIngresos/",
  conceptoUrl: config.apiUrl + "facturacion/ConceptoOtrosIngresos",
  instruccionPagoUrl: config.apiUrl + "facturacion/InstruccionPagos",
  notaCreditoSNUrl: config.apiUrl + "facturacion/NotaCreditoSinNCF",
  notasCreditoUrl: config.apiUrl + "facturacion/NotaCredito",
  notaPagoUrl: config.apiUrl + "facturacion/NotaPago",
  fileServiceUrl: config.mantenimientoUrl + "Documentos/",
  notaCreditoUrl: config.apiUrl + "facturacion/ReporteNotaCredito",
  notaCreditoMantenimientoUrl:
    config.apiUrl + "facturacion/NotaCreditoMantenimiento/",
  chequesDevueltosUrl: config.apiUrl + "facturacion/ChequeDevuelto/",
  motivosDevolucionUrl: config.apiUrl + "facturacion/MotivoDevolucion/",
  depositoAnulacionUrl: config.apiUrl + "facturacion/DepositoAnulacion/",
  categoriaFacturacionUrl: config.apiUrl + "facturacion/CategoriasFactura",
  movimientosUrl: config.apiUrl + "facturacion/MovimientoCliente",
  contactosUrl: config.apiUrl + "facturacion/ClienteEmail",
  estadoCuentaUrl: config.apiUrl + "facturacion/Clientes/EnviarEstadoDeCuenta",
};
