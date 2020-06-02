import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../../core/_services/api.service";
import { endpoint } from "../../../../environments/environment";
import { AlertService } from "../../../core/_services/alert.service";

@Component({
  selector: "app-cheque-devuelto-edit",
  templateUrl: "cheque-devuelto-edit.component.html"
})
export class ChequeDevueltoEditComponent implements OnInit {


  chequeDevuelto: any = {};
  selection: string[] = ["Id,Nombre"];
  formatter = (result: any) => result.nombre;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, public apiService: ApiService, private alertService: AlertService) {
  }


  ngOnInit() {
  }

  modificar(): void {

    this.apiService.put(endpoint.chequesDevueltosUrl + this.chequeDevuelto.id, this.chequeDevuelto)
      .subscribe(response => {
        this.notifyParent.emit(response);
        this.activeModal.close("Automatic Click");
        this.alertService.success(`El cheque devuelto ${response.noRecibo} ha sido modificado correctamente.`);
      }, error => {
        let mensaje: any = error.error;
        this.alertService.error(mensaje);

      });
  }


}
