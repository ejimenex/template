import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from "@angular/core";
import * as moment from "moment";
import { Filter } from "../../core/_models/filter";
import { FilterService } from "../../core/_services/filter.service";
import { ApiService } from "../../core/_services/api.service";
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { endpoint } from '../../../environments/environment';


@Component({
    selector: "app-deposito-filter",
    templateUrl: "./deposito-filter.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DepositoFilterComponent implements OnInit {

    page: number = 1;
    pageSize: number = 10;
    fechaInicio: Date = new Date();
    fechaFinal: Date = new Date();
    monedaSeleccionada: any;
    pendientes: boolean;
    clienteNoDefinido: boolean = false;
    filtro: Filter;
    seleccionado: any;
    private apiUrl = "";

    monedas: any[] = [{ nombre: "TODAS", codigo: null }, { nombre: "DOMINICAN PESO", codigo: "DOP" }, { nombre: "US DOLLAR", codigo: "USD" }];
    filtros: any[] = [
        { label: "No. Depósito", field: "Id", type: "SIMPLE" },
        { label: "Cliente", field: "clienteNombre", type: "SIMPLE", operador: "'" },
        { label: "Banco", field: "bancoNombre", type: "SIMPLE", operador: "'" },
        { label: "Descripción", field: "descripcion", type: "SIMPLE", operador: "'" },
        { label: "No. Recibo", field: "noRecibo", type: "SIMPLE", operador: "'" },
        { label: "Monto", field: "monto_Ingreso", type: "SIMPLE", inputType: "number" },
        { label: "Rango de Monto", field: "monto_Ingreso", type: "RANGE", inputType: "number" }

    ];

    formatter = (result: any) => result.nombre;

    @Output()
    enviarFiltro: EventEmitter<any> = new EventEmitter();

    constructor(private apiService: ApiService, public filterService: FilterService) {
        this.filtro = new Filter();
        this.filtro.seleccionado = this.filtros[0];
        this.monedaSeleccionada = this.monedas[0].codigo;
        this.fechaInicio.setDate(this.fechaFinal.getDate() - 90);// 30
    }
    ngOnInit() {
        this.filterService.setFilters(this.filtros);
    }

    onDateChange(data) {
    }

    buscar(): void {

        var data: any = {};

        this.apiService.orderBy(data, ["id"], true);

        if (this.monedaSeleccionada != null && this.monedaSeleccionada != "null") {
            this.apiService.addFilter(data, "moneda", this.monedaSeleccionada);
        }

        if (this.fechaInicio && this.fechaFinal) {
            // 'yyyy-MM-dd'
            this.apiService.addFilter(data, "Fecha", moment(this.fechaInicio).format("YYYY-MM-DD") + "|" + moment(this.fechaFinal).format("YYYY-MM-DD") + " 23:59:59");
        } else if (this.fechaInicio) {
            this.apiService.addFilter(data, "Fecha", moment(this.fechaInicio).format("YYYY-MM-DD") + "|" + moment(this.fechaInicio).format("YYYY-MM-DD") + " 23:59:59");
        }

        if (this.pendientes) {
            this.apiService.addFilter(data, "Monto_Pendiente", ">0");
            this.apiService.addFilter(data, "Estatus", "D");
        }

        if (this.clienteNoDefinido) {
            data["clienteNombre"] = null;
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