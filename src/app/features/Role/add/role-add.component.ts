import { Component, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint } from "../../../../environments/environment";
import { Helpers } from "../../../helpers";
import { HttpClient } from "@angular/common/http";
import { role } from "../../../core/_models/role.model";
import { AlertService } from "../../../core/_services/alert.service";
import { ThrowStmt } from "@angular/compiler";
import { RoleService } from '../../../core/_services/role.service';

declare var swal: any;

@Component({
  selector: "app-role-add",
  templateUrl: "./role-add.component.html",
})
export class RoleAddComponent {
  role: role = new role();
  id: any;
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
    this.title = this.id
      ? "Editar Rol de Usuario"
      : "Agregar nuevo Rol de Usuario";
    if (this.id) {
        this.roleService
          .getById(this.id)
          .subscribe((res) => (this.role = res));
      }
}
  save() {
    if(this.validate()) return this.alertService.error('Por favor completar todos los campos')
    // if (this.id) this.edit();
    else this.add();
  }
  add() {
  
    this.roleService.post(this.role).subscribe(
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
  validate(){

    return (!this.role.Description || !this.role.Name )
  }



//   edit() {
//     this.alertService.question(() => {
//       this.companyService.put(this.company).subscribe(
//         (response) => {
//           this.alertService.success(
//             "Datos de la empresa modificados con exito."
//           );
//           this.notifyParent.emit();
//           this.activeModal.close();
//         },
//         (error) => {
//           this.alertService.error(error.error);
//         }
//       );
//     }, "Seguro que desea modificar la información de la empresa.");
//   }
}
