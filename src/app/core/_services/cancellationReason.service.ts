import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { endpoint } from "../../../environments/environment";
import { CancellationReason } from '../_models/cancellationReason.model';

@Injectable()
export class CancelationReasonService extends BaseService<CancellationReason, number> {

  constructor(_httpClient: HttpClient) {
          super(_httpClient,  endpoint.cancellationReason);
  }
}
