import { Component, OnInit } from '@angular/core';
import { Helpers } from '../../helpers';
import { ApiService } from '../../core/_services/api.service';
import { endpoint, config } from '../../../environments/environment';
import { ChequeDevueltoAddComponent } from './cheque-devuelto-add/cheque-devuelto-add.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cheque-devuelto',
  templateUrl: 'cheque-devuelto.component.html'
})
export class ChequeDevueltoComponent implements OnInit {

  chequesDevueltos: any[];
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number;
  monedas: any[] = [];
  filtro: any = {};

  constructor(private apiService: ApiService, private modalService: NgbModal) {
  }

  agregar(): void {
    let modal: any = this.modalService.open(ChequeDevueltoAddComponent, config.modalConfig);

    modal.componentInstance.notifyParent.subscribe(result => {
      this.getAll();
    });
  }

  ngOnInit() {

    this.cargarMonedas();
    this.getAll();

  }

  getAll(t?): void {


    Helpers.setLoading(true);
    let data: any = this.filtro;
    this.apiService.orderBy(data, ["Id"], true);
    this.apiService.addPagination(data, this.page, this.pageSize);
    this.filtro = data;
    this.cargarChequesDevueltos();

  }

  pageChange(data: any): void {
    Helpers.setLoading(true);
    this.page = data;
    this.apiService.addPagination(this.filtro, this.page, this.pageSize);
    this.cargarChequesDevueltos();
  }

  filterChange(data): void {
    Helpers.setLoading(true);
    this.apiService.orderBy(data, ["Id"], true);
    this.apiService.addPagination(data, this.page, this.pageSize);
    this.filtro = data;
    this.cargarChequesDevueltos();
  }

  cargarMonedas(): void {

    let data: any = {};
    let selection = ["id", "codigo", "nombre"];
    this.apiService.addSelection(data, selection);

    this.apiService.get(endpoint.monedaUrl, data).subscribe(response => {
      this.monedas = [{ id: null, codigo: "TODAS", nombre: "TODAS" }].concat(response.data);
    });
  }

  cargarChequesDevueltos(): void {

    this.apiService.get(endpoint.chequesDevueltosUrl, this.filtro).subscribe(response => {
      this.chequesDevueltos = response.data;
      this.collectionSize = response.count;
      Helpers.setLoading(false);

    }, error => { Helpers.setLoading(false); });
  }

}
