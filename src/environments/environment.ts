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
  apiArchivo:'http://localhost:5000/api/',//'http://10.228.30.87:6500/api/',
  authentication: "http://localhost:5000/api/",
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
  detaild: config.apiArchivo + "bankFileDetail/print/",
  listFile: config.apiArchivo + "ListFile",
  bankFiles: config.apiArchivo + "bankFile",  
  cancellationReason: config.apiArchivo + "cancellationReason",
  roleUrl: config.authentication+ "Account/Roles",
  permissionUrl: config.authentication+ "Account/Permission",
  listExport: config.apiArchivo + "ListExportFile",
    
  authenticationUrl: config.authentication + "authentication/token",
  usuariosUrl: config.apiUrl + "sistemas/empleados",
  
};
