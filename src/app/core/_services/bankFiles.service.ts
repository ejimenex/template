import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { config,endpoint } from "../../../environments/environment";
import { company } from '../_models/company.model';
import { bankFiles } from '../_models/bankfiles.model';

@Injectable()
export class BankFilesService extends BaseService<bankFiles, number> {

  constructor(_httpClient: HttpClient) {
          super(_httpClient,  endpoint.bankFiles);
  }
 uploadFile(data:FormData){
     return this._httpClient.post(endpoint.bankFiles+'/uploadFile',data);
 }
}
