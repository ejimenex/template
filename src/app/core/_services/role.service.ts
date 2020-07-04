import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import { config,endpoint } from "../../../environments/environment";
import { role } from '../_models/role.model';
import { permission } from "../_models/permission.model";

@Injectable()
export class RoleService extends BaseService<role, number> {

  constructor(_httpClient: HttpClient) {
          super(_httpClient,  endpoint.companyUrl);
  }

  getRoles(){
    return this._httpClient.get<any>(endpoint.roleUrl, {headers: this.jwt()});
  }

  getRole(roleId: string){    
    return this._httpClient.get<role>(endpoint.roleUrl+`/${roleId}`, {headers: this.jwt()});
  }

  createRole(role: role, permissions: permission[]){    
    return this._httpClient.post<any>(endpoint.roleUrl, { role, permissions } , {headers: this.jwt()});
  }

  updateRole(role: role, permissions: permission[]){     
    const data = {
      id: role.id,
      name: role.name,
      description: role.description,
      status: role.status,
      permissions: permissions
    };    
    return this._httpClient.put<any>(endpoint.roleUrl, data , {headers: this.jwt()});
  }

  deleteRole(roleId: string){
    return this._httpClient.delete<any>(endpoint.roleUrl+`/${roleId}`, {headers: this.jwt()});
  }

  getPermission(roleId: string) {
    const url = roleId == '' ? endpoint.permissionUrl+'/0' : endpoint.permissionUrl+`/${roleId}`;
    return this._httpClient.get<permission[]>(url, {headers: this.jwt()});
  }

}
