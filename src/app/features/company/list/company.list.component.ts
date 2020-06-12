import { ApiService } from "../../../core/_services/api.service";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { endpoint, config } from "../../../../environments/environment";
import { Helpers } from "../../../helpers";
import { CompanyAddComponent } from "../add/company.add.component";
import { CompanyService } from "../../../core/_services/company.service";
import { company } from "../../../core/_models/company.model";
import { AlertService } from "../../../core/_services/alert.service";

@Component({
  selector: "company-List",
  templateUrl: "./company.list.component.html",
})
export class CompanyListComponent implements OnInit {
  @Input()
  companies: company[];

  constructor(
    private modalService: NgbModal,
    private alert: AlertService,
    private apiService: CompanyService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  confirmDelete(id) {
    this.alert.question(() => {
      this.delete(id);
    }, "Esta seguro que desea eliminar la empresa?");
  }
  delete(id) {
    this.apiService
      .delete(id)
      .subscribe((res) =>{ 
        this.getAll()  
        this.alert.success("Empresa eliminada con exito")});
  }
  editOrAddCompany(id: number) {
      
    var modal = this.modalService.open(CompanyAddComponent, config.modalConfig);
    modal.componentInstance.id = id;
    modal.componentInstance.notifyParent.subscribe((result) => {
      this.getAll();
    });
  }

  getAll() {
    this.apiService.getAll().subscribe(result => {
        this.companies = result});
       
  }
}
