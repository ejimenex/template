import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { config,endpoint } from "../../../environments/environment";
import { fileBank } from '../_models/fileBank.model';
import { extend, data } from "jquery";
import { Observable } from "rxjs";
import { Filter } from '../_models/filter';


@Injectable()

export class FilebankService extends BaseService<fileBank, number> {

  constructor(_httpClient: HttpClient) {
      super(_httpClient, endpoint.listFile)
   }

  getPaged(filter:any,page:number){
    return this._httpClient.get<any>(endpoint.listFile+`?PageNumber=${page}&pageSize=10&bankId=${filter.bankId}&currencyId=${filter.currencyId}&startDate=${filter.startDate}&endDate=${filter.endDate}`, 
                                      {headers: this.jwt()});
  }
  fileDetail(filter: any){
    return this._httpClient.get<any>(endpoint.bankFiles+`/${filter.bankId}/${filter.currencyId}/${filter.date}`, {headers: this.jwt()})
  }
}



