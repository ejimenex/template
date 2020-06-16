import { Component, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint } from "../../../../environments/environment";
import { Helpers } from "../../../helpers";
import { HttpClient } from "@angular/common/http";
import { CompanyService } from "../../../core/_services/company.service";
import { company } from "../../../core/_models/company.model";
import { AlertService } from "../../../core/_services/alert.service";
import { ThrowStmt } from "@angular/compiler";

declare var swal: any;

@Component({
  selector: "app-company-add",
  templateUrl: "./company.add.component.html",
})
export class CompanyAddComponent {
  company: company = new company();
  id: any;
  title = "";

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    protected _http: HttpClient,
    private companyService: CompanyService,
    private alertService: AlertService
  ) {
   
 
  }
  ngOnInit(){
    this.title = this.id
      ? "Editar Información de la empresa"
      : "Agregar nueva empresa";
    if (this.id) {
        this.companyService
          .getById(this.id)
          .subscribe((res) => (this.company = res));
      }
}
  save() {
    if(this.validate()) return this.alertService.error('Por favor completar todos los campos')
    if (this.id) this.edit();
    else this.add();
  }
  add() {
  
    this.companyService.post(this.company).subscribe(
      (response) => {
        this.alertService.success("Empresa creada exitosamente");
        this.notifyParent.emit();
        this.activeModal.close();
      },
      (error) => {
        
        this.alertService.error(error.error);
      }
    );
  }
  validate(){
    return (!this.company.documentNumber || !this.company.name || !this.company.code)
  }
  edit() {
    this.alertService.question(() => {
      this.companyService.put(this.company).subscribe(
        (response) => {
          this.alertService.success(
            "Datos de la empresa modificados con exito."
          );
          this.notifyParent.emit();
          this.activeModal.close();
        },
        (error) => {
          this.alertService.error(error.error);
        }
      );
    }, "Seguro que desea modificar la información de la empresa.");
  }
}
