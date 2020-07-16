import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { config,endpoint } from "../../../environments/environment";
import { exportFile } from '../_models/exportFile';
import { extend, data } from "jquery";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable() 
export class ExportfileService extends BaseService<exportFile, number> {

  constructor(_httpClient: HttpClient) { 
    super(_httpClient, endpoint.exportFile)
  }

  // exportFile(item: any, userexport: any){
  //   const data = {
  //     BankId: item.bankId,
   //     currencyId: item.currencyId,
  //     companyId: item.companyId,
  //     id: item.id,
  //     userexport: userexport
  //   };
  //   return this._httpClient.post<any>(endpoint.exportFile +`/${item.bankId}/${item.currencyId}/${item.companyId}/${item.id}/${userexport}`, data)
  // }

  exportFile(item: any, userexport: any){
    return this._httpClient.get<any>(endpoint.exportFile +`${item.bankId}/${item.currencyId}/${item.companyId}/${item.id}/${userexport}`);
  }
}
    