import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { config,endpoint } from "../../../environments/environment";
import { user } from '../_models/user.model';

@Injectable()
export class UserService extends BaseService<user, number> {

  constructor(_httpClient: HttpClient) {
          super(_httpClient,  endpoint.companyUrl);
  }

  getUsers(){
    return this._httpClient.get<any>(endpoint.userUrl, {headers: this.jwt()});
  }

  validateUser(email: string) {
    if(email.indexOf('@') != -1){
      return this._httpClient.get<any>(`http://192.168.50.5:7001/api/sistemas/empleados?pagesize=3&pagenumber=1&email=${email}`);    
    }else{
      return this._httpClient.get<any>(`http://192.168.50.5:7001/api/sistemas/empleados?pagesize=3&pagenumber=1&nombre=%27${email}`);    
    }
  }

  createUser(user: user){
    return this._httpClient.post<any>(endpoint.userUrl, user, {headers: this.jwt()});
  }

  updateUser(user: user){
    return this._httpClient.put<any>(endpoint.userUrl, user, {headers: this.jwt()});
  }

  getRoles(){
    return this._httpClient.get<any>(endpoint.roleUrl, {headers: this.jwt()});
  }

  deleteUser(roleId: string){
    return this._httpClient.delete<any>(endpoint.userUrl+`/${roleId}`, {headers: this.jwt()});
  }
}
