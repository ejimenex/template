import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../../core/_services/api.service';

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


    @Output()
    enviarFiltro: EventEmitter<any> = new EventEmitter();

    constructor(private apiService: ApiService) {
        this.fechaInicio.setDate(this.fechaFinal.getDate() - 90);//30
    }
    ngOnInit() {

    }

    onDateChange(data) {
    }

    buscar() {
        var data = {};

        if (this.fechaInicio && this.fechaFinal)
            //'yyyy-MM-dd'
            this.apiService.addFilter(data, "FechaCreacion", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaFinal).format('YYYY-MM-DD') + " 23:59:59");

        else if (this.fechaInicio)
            this.apiService.addFilter(data, "FechaCreacion", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaInicio).format('YYYY-MM-DD') + " 23:59:59");

        this.enviarFiltro.emit(data);
    }
}