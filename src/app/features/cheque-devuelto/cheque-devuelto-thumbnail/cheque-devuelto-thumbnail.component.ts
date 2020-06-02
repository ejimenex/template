import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../../core/_services/api.service";
import { ChequeDevueltoEditComponent } from "../cheque-devuelto-edit/cheque-devuelto-edit.component";
import { config } from "../../../../environments/environment";


@Component({
  selector: "[app-cheque-devuelto-thumbnail]",
  templateUrl: "cheque-devuelto-thumbnail.component.html"
})
export class ChequeDevueltoThumbnailComponent implements OnInit {

  @Input()
  chequeDevuelto: any;

  @Output()
  notifyParent: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {

  }

  constructor(private modalService: NgbModal) {
  }


  modificar(): void {

    let modal: any = this.modalService.open(ChequeDevueltoEditComponent, config.modalConfig);
    modal.componentInstance.chequeDevuelto = this.chequeDevuelto;

    modal.componentInstance.notifyParent.subscribe(result => {
      this.notifyParent.emit();
    });
  }

}

