import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as moment from "moment";
import { endpoint } from "../../../environments/environment";
import { FilterService } from "../../core/_services/filter.service";
import { Helpers } from "../../helpers";
import { ApiService } from "../../core/_services/api.service";



@Component({
    selector: "app-deposito-List",
    templateUrl: "./depositoList.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DepositoListComponent implements OnInit {

    depositos: any[];

    page: number = 1;
    pageSize: number = 10;
    collectionSize: number;
    fechaInicio: Date = new Date();
    fechaFinal: Date = new Date();
    monedaSeleccionada: any;
    pendientes: boolean;
    apiUrl = "";
    data: any = {};
    filtro: any = {};

    monedas: any[] = [{ nombre: "TODAS", codigo: null }, { nombre: "DOMINICAN PESO", codigo: "DOP" }, { nombre: "US DOLLAR", codigo: "USD" }];
    filtros: any[] = [
        { label: "No.", field: "Id" },
        { label: "No. Depósito", field: "ArchivoDepositoId" },
        { label: "Cliente", field: "clienteNombre", operador: "'" },
        { label: "Banco", field: "bancoNombre", operador: "'" },
        { label: "Descripción", field: "descripcion", operador: "'" },
        { label: "No. Recibo", field: "noRecibo", operador: "'" },
        { label: "Monto", field: "monto_Ingreso", inputType: "number" },
        { label: "Rango de Monto", field: "monto_Ingreso", type: "RANGE", inputType: "number" }

    ];

    constructor(private apiService: ApiService, private filterService: FilterService) {
        this.fechaInicio.setDate(this.fechaFinal.getDate() - 90);// 30
    }

    ngOnInit() {

        this.apiUrl = endpoint.transaccionUrl;
        this.fechaInicio.setDate(this.fechaFinal.getDate() - 90);// 30
        this.getAll();
    }

    getAll() {
        Helpers.setLoading(true);
        if (!this.fechaInicio) { return; }



        this.apiService.addPagination(this.filtro, this.page, this.pageSize);
        this.apiService.orderBy(this.filtro, ["id"], true);

        if (this.filterService.isValid()) {
            this.apiService.addFilter(this.filtro, this.filterService.getField(), this.filterService.getValue());
        }

        if (this.monedaSeleccionada != null) {
            this.apiService.addFilter(this.filtro, "moneda", this.monedaSeleccionada);
        }

        if (this.fechaInicio && this.fechaFinal) {
            // 'yyyy-MM-dd'
            this.apiService.addFilter(this.filtro, "Fecha", moment(this.fechaInicio).format("YYYY-MM-DD") + "|" + moment(this.fechaFinal).format("YYYY-MM-DD") + " 23:59:59");
        } else if (this.fechaInicio) {
            this.apiService.addFilter(this.filtro, "Fecha", this.fechaInicio.toLocaleString("yyyy-MM-dd") + "|" + new DatePipe("en-US").transform(this.fechaInicio) + " 23:59:59");
        }

        if (this.pendientes) {
            this.apiService.addFilter(this.filtro, "Monto_Pendiente", ">0");
            this.apiService.addFilter(this.filtro, "Estatus", "D");
        }

        this.cargarAvances();
    }

    pageChange(data) {
        Helpers.setLoading(true);
        this.page = data;
        this.apiService.addPagination(this.filtro, this.page, this.pageSize);
        this.cargarAvances();
    }

    filterChange(data) {
        Helpers.setLoading(true);
        this.filtro = data;
        this.apiService.addPagination(this.filtro, this.page, this.pageSize);
        this.cargarAvances();
    }

    cargarAvances(): void {
        let promise: any = this.apiService.get(this.apiUrl, this.filtro);

        promise.subscribe(
            response => {
                this.depositos = response.data;
                this.collectionSize = response.count;
                Helpers.setLoading(false);
            },
            error => {
                Helpers.setLoading(false);
            }
        );
    }
}