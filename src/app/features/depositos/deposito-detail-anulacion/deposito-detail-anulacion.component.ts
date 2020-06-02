import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deposito-detail-anulacion',
  templateUrl: './deposito-detail-anulacion.component.html'
})
export class DepositoDetailAnulacionComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  model: any;
  motivos: any[];

}
