import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { endpoint } from "../../../environments/environment";

import { Currency } from '../_models/currency';

@Injectable()
export class CurrencyService extends BaseService<Currency, number> {

  constructor(_httpClient: HttpClient) {
          super(_httpClient,  endpoint.currencyUrl);
  }
}
