import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { config,endpoint } from "../../../environments/environment";
import { exportFile } from '../_models/exportFile';
import { extend, data } from "jquery";


@Injectable()
export class ExportfileService extends BaseService<exportFile, number> {

  constructor(_httpClient: HttpClient) { 
    super(_httpClient, endpoint.exportFile)
  }
  exportFile(data: FormData) {
    return this._httpClient.post(endpoint.exportFile + "/dynamicsExport", data);
  }

}
