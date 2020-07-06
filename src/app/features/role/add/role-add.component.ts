import { Component, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint } from "../../../../environments/environment";
import { Helpers } from "../../../helpers";
import { HttpClient } from "@angular/common/http";
import { role } from "../../../core/_models/role.model";
import { AlertService } from "../../../core/_services/alert.service";
import { ThrowStmt } from "@angular/compiler";
import { RoleService } from '../../../core/_services/role.service';
import { permission } from "../../../core/_models/permission.model";


declare var swal: any;

@Component({
  selector: "app-role-add",
  templateUrl: "./role-add.component.html",
})
export class RoleAddComponent {
  role: role;
  permission: permission[];
  roleId: string
  roleName: string
  roleDescription: string
  roleStatus: Boolean
  item: any;
  title = "";
  

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    protected _http: HttpClient,
    private roleService: RoleService,
    private alertService: AlertService
  ) {
   
 
  }
  ngOnInit(){
    
    this.title = this.item != 0
      ? "Editar Rol de Usuario"
      : "Agregar nuevo Rol de Usuario";
    
    if (this.item != 0) {
      this.role = this.item; 
      this.roleId = this.item.id;
      this.roleName = this.item.name;
      this.roleDescription = this.item.description;
      this.roleStatus = this.item.status;
    } else {
      this.role = new role();
    }

    this.getPermission();
}
  save() {
    if(this.validate()) return this.alertService.error('Por favor completar todos los campos')    
    else this.add();
  }
  add() {
    const permissions = this.permission.filter(item => item.value);

    this.role.name = this.roleName;
    this.role.description = this.roleDescription;
    this.role.status = this.roleStatus;    

    if(this.role.id){
      this.roleService.updateRole(this.role, permissions).subscribe(
        (response) => {
          this.alertService.success("Rol actualizado exitosamente");
          this.notifyParent.emit();
          this.activeModal.close();
        },
        (error) => {
          
          this.alertService.error(error.error);
        }
      );
    }else {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));    
      
      this.role.createdDate = new Date();
      this.role.createdBy = currentUser.userName;      

      this.roleService.createRole(this.role, permissions).subscribe(
        (response) => {
          this.alertService.success("Rol creado exitosamente");
          this.notifyParent.emit();
          this.activeModal.close();
        },
        (error) => {
          
          this.alertService.error(error.error);
        }
      );
    }

  }
  validate(){
    return (!this.roleName || !this.roleDescription);
  }
  getPermission() {    
    this.roleService
          .getPermission(this.role.id ? this.role.id.toString() : '')
          .subscribe((res) => {          
            this.permission = res;            
          });    
  }
}
