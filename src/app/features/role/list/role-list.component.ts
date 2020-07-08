import { ApiService } from "../../../core/_services/api.service";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { endpoint, config } from "../../../../environments/environment";
import { Helpers } from "../../../helpers";
import { RoleAddComponent } from "../add/role-add.component";
import { CompanyService } from "../../../core/_services/company.service";
import { company } from "../../../core/_models/company.model";
import { AlertService } from "../../../core/_services/alert.service";
import { role } from "../../../core/_models/role.model";
import { RoleService } from "../../../core/_services/role.service";
import * as dateFormater from 'moment';


@Component({
  selector: "role-List",
  templateUrl: "./role-list.component.html",
})
export class RoleListComponent implements OnInit {
  @Input()
  roles: role[];

  constructor(
    private modalService: NgbModal,
    private alert: AlertService,
    private apiService: RoleService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  confirmDelete(id) {
    this.alert.question(() => {
      this.delete(id);
    }, "Esta seguro que desea eliminar el role?");
  }
  delete(id) {
    this.apiService
      .deleteRole(id)
      .subscribe((res) =>{ 
        this.getAll()  
        this.alert.success("Role eliminado con exito")});
  }
  editOrAddRole(item: any) {
      
    var modal = this.modalService.open(RoleAddComponent, config.modalConfig);
    modal.componentInstance.item = item;
    modal.componentInstance.notifyParent.subscribe((result) => {
      this.getAll();
    });
  }

  getAll() {
    this.apiService.getRoles().subscribe(result => {
        this.roles = result});       
  }

  dateFormat(dateToFormat: Date, format: string) {
    return dateFormater(dateToFormat).format(format);
  }
}
