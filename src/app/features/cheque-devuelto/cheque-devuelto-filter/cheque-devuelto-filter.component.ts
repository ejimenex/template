import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from "moment";
import { Filter } from '../../../core/_models/filter';
import { ApiService } from '../../../core/_services/api.service';
import { FilterService } from '../../../core/_services/filter.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { endpoint } from '../../../../environments/environment';

@Component({
  selector: 'app-cheque-devuelto-filter',
  templateUrl: 'cheque-devuelto-filter.component.html'
})
export class ChequeDevueltoFilterComponent implements OnInit {

  page: number = 1;
  pageSize: number = 10;

  monedaSeleccionada: any;
  filtro: Filter;
  seleccionado: any;

  filtros: any[] = [
    { label: "No. Registro", field: "noRecibo", operador: "'", type: "SIMPLE" },
    { label: "No. Cheque", field: "chequeNo", operador: "'", type: "SIMPLE" },
    { label: "Cliente", field: "cliente", operador: "'", type: "SIMPLE" },
    { label: "Monto Cheque", field: "monto", operador: "'", type: "SIMPLE" },

  ];

  @Input()
  monedas: any[];

  @Output()
  enviarFiltro: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService, public filterService: FilterService) {
    this.filtro = new Filter();
    this.filtro.seleccionado = this.filtros[0];
    this.monedaSeleccionada = 5;

  }
  ngOnInit(): void {
    this.filterService.setFilters(this.filtros);
  }

  formatter = (result: any) => result.nombre;

  buscar(): void {

    var data: any = {};

    this.apiService.orderBy(data, ["Id"], true);

    if (this.monedaSeleccionada != null && this.monedaSeleccionada !== "null") {
      this.apiService.addFilter(data, "monedaId", this.monedaSeleccionada);
    }

    this.filterService.seleccionado = this.filtro.seleccionado;
    this.filterService.values = this.filtro.values;

    if (this.filterService.isValid()) {
      this.apiService.addFilter(data, this.filterService.getField(), this.filterService.getValue());
    }


    this.enviarFiltro.emit(data);
  }

  searchCliente = (text$: Observable<any[]>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.apiService.get(endpoint.clienteUrl + "?Fields=Nombre&pagesize=6", { nombre: "'" + term }).pipe(map(x => x.data))),
      catchError(() => {
        return [];
      }))

}
