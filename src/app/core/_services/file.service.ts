import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { config,endpoint } from "../../../environments/environment";
import { file } from '../_models/file.model';

@Injectable()
export class FileService extends BaseService<file, number>{

    constructor(_httpClient: HttpClient){
        super(_httpClient, endpoint.depositsUrl)

  
    }

    getpaged(){}

}










