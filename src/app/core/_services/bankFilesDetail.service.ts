import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { config,endpoint } from "../../../environments/environment";
import { company } from '../_models/company.model';
import { bankFilesDetail } from '../_models/bankFileDetail.model';

@Injectable()
export class BankFilesDetailService extends BaseService<bankFilesDetail, number> {

  constructor(_httpClient: HttpClient) {
          super(_httpClient,  endpoint.detail);
  }
  getPaged(filter:any,page:number){
    return this._httpClient.get<any>(endpoint.detail+`/getPaged?PageNumber=${page}&pageSize=10&bankId=${filter.bankId}&currencyId=${filter.currencyId}&companyId=${filter.companyId}&idHeader=${filter.idHeader}&idDetail=${filter.idDetail}&status=${filter.status}&startDate=${filter.startDate}&endDate=${filter.endDate}`,
                                    {headers: this.jwt()});
  }  
}
