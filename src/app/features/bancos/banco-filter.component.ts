import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../../core/_services/api.service';
import { Filter } from '../../core/_models/filter';
import { FilterService } from '../../core/_services/filter.service';

@Component({
    selector: 'app-banco-filter',
    templateUrl: './banco-filter.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class bancoFilterComponent implements OnInit {

    page: number = 1;
    pageSize: number = 10;
    fechaInicio: Date = new Date();
    fechaFinal: Date = new Date();
    currencyselect: any; 
    filter: Filter;
    seleccionado: any; 

    monedas: any[] = [{ nombre: "TODAS", codigo: null }, { nombre: "DOMINICAN PESO", codigo: "DOP" },
                   { nombre: "US DOLLAR", codigo: "USD" }, {nombre: "EURO", codigo: "EUR"}];

    bancos: any [] = [
        { label: "BANCO POPULAR DOMINICANO", field: "popular", type: "SIMPLE", operador: "'" },
        { label: "SCOTIABANK", field: "progreso", type: "SIMPLE", operador: "'" },
        { label: "CITIBANK N.A", field: "citibank", type: "SIMPLE", operador: "'" },
        { label: "BANCO DE RESERVA", field: "banreserva", type: "SIMPLE", operador: "'" },
        { label: "BANCO BHD", field: "bhd", type: "SIMPLE", operador: "'" },

    ];

    @Output()
    enviarFiltro: EventEmitter<any> = new EventEmitter();

    constructor(private apiService: ApiService,
               public filterService: FilterService) {
        this.fechaInicio.setDate(this.fechaFinal.getDate() - 90);//30
        this.filter = new Filter();
        this.filter.seleccionado = this.bancos[0];
        this.currencyselect = this.monedas[0].codigo;
    }
    
    ngOnInit() {
this.filterService.setFilters(this.bancos);
    }

    onDateChange(data) {
    }

    buscar(): void {
        //var data = {};
        var data: any = {};
        this.apiService.orderBy(data, ["Id"], true);


        if (this.currencyselect != null && this.currencyselect != "null") {
            this.apiService.addFilter(data, "currencyId", this.currencyselect);
        }

        if (this.fechaInicio && this.fechaFinal)
            //'yyyy-MM-dd'
            this.apiService.addFilter(data, "createdDate", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaFinal).format('YYYY-MM-DD') + " 23:59:59");

        else if (this.fechaInicio)
            this.apiService.addFilter(data, "createdDate", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaInicio).format('YYYY-MM-DD') + " 23:59:59");


            this.filterService.seleccionado = this.filter.seleccionado;
            this.filterService.values = this.filter.values;


            if (this.filterService.isValid()) {
                this.apiService.addFilter(data, this.filterService.getField(), this.filterService.getValue());
            
            }
            
        this.enviarFiltro.emit(data);
    }
}