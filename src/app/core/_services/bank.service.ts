import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { endpoint } from "../../../environments/environment";
import { Bank } from '../_models/bank';

@Injectable()
export class BankService extends BaseService<Bank, number> {

  constructor(_httpClient: HttpClient) {
          super(_httpClient,  endpoint.bankUrl);
  }
}
