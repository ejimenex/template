import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { config,endpoint } from "../../../environments/environment";
import { fileExport } from '../_models/fileExport';
import { extend, data } from "jquery";


@Injectable()
export class FileExportService extends BaseService<fileExport, number> {

  constructor(_httpClient: HttpClient) { 

    super(_httpClient, endpoint.listExport)
  }

  getPaged(filter:any,page:number){
    return this._httpClient.get<any>(endpoint.listExport+`?PageNumber=${page}&pageSize=10&bankId=${filter.idBank}&currencyId=${filter.idCurrency}&nameFile=${filter.nameBankFile}&dateExport=${filter.dataExport}&createDate=${filter.createdDate}`);
  }
}
