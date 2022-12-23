import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint, config } from "../../../../environments/environment";
import { AlertService } from "../../../core/_services/alert.service";
import * as dateFormater from 'moment';
import { UserAddComponent } from "../add/user-add.component";
import { UserService } from "../../../core/_services/user.service";


@Component({
  selector: "user-List",
  templateUrl: "./user-list.component.html",
})
export class UserListComponent implements OnInit {
  @Input()
  users=[];

  constructor(
    private modalService: NgbModal,
    private alert: AlertService,
    private apiService: UserService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  confirmDelete(id) {
    this.alert.question(() => {
      this.delete(id);
    }, "Esta seguro que desea eliminar el usuario?");
  }
  delete(id) {
    this.apiService
      .deleteUser(id)
      .subscribe((res) =>{ 
        this.getAll()  
        this.alert.success("Usuario eliminado con exito")});
  }
  editOrAddUser(item: any) {
      
    var modal = this.modalService.open(UserAddComponent, config.modalConfig);
    modal.componentInstance.item = item;
    modal.componentInstance.notifyParent.subscribe((result) => {
      this.getAll();
    });
  }

  getAll() {
    this.apiService.getUsers().subscribe(result => {
        this.users = result});       
  }

  dateFormat(dateToFormat: Date, format: string) {
    return dateFormater(dateToFormat).format(format);
  }
}
