import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { config,endpoint } from "../../../environments/environment";
import { company } from '../_models/company.model';

@Injectable()
export class CompanyService extends BaseService<company, number> {

  constructor(_httpClient: HttpClient) {
          super(_httpClient,  endpoint.companyUrl);
  }
 getpaged(){}
}
