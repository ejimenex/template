import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../../../core/_services/api.service';
import { Filter } from '../../../core/_models/filter';
import { CurrencyService } from '../../../core/_services/currency.service';
import { BankService } from '../../../core/_services/bank.service';
import { Currency } from '../../../core/_models/currency';
import { Bank } from '../../../core/_models/bank';

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
    currency:Currency[]
    bank:Bank[]

    
    bancos: any [] = [
        { label: "BANCO POPULAR DOMINICANO", field: "popular", type: "SIMPLE", operador: "'" },
        { label: "SCOTIABANK", field: "progreso", type: "SIMPLE", operador: "'" },
        { label: "CITIBANK N.A", field: "citibank", type: "SIMPLE", operador: "'" },
        { label: "BANCO DE RESERVA", field: "banreserva", type: "SIMPLE", operador: "'" },
        { label: "BANCO BHD", field: "bhd", type: "SIMPLE", operador: "'" },

    ];

    onLoad(){
        this.currencyService.getAll().subscribe(curr=>{ 
            this.currency=curr;
        })
        this.bankService.getAll().subscribe(curr=> this.bank=curr)
    }
    @Output()
    enviarFiltro: EventEmitter<any> = new EventEmitter();

    constructor(private apiService: ApiService,
               public currencyService: CurrencyService,
               public bankService: BankService) {
        this.fechaInicio.setDate(this.fechaFinal.getDate() - 90);//30
        this.filter = new Filter();
        this.filter.seleccionado = this.bancos[0];
    }
    
    ngOnInit() {
        this.currency=[]
       
        this.onLoad()
    }

    onDateChange(data) {
    }

    buscar(): void {
        //var data = {};
        var data: any = {};
        this.apiService.orderBy(data, ["Id"], true);


        
        if (this.fechaInicio && this.fechaFinal)
            //'yyyy-MM-dd'
            this.apiService.addFilter(data, "createdDate", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaFinal).format('YYYY-MM-DD') + " 23:59:59");

        else if (this.fechaInicio)
            this.apiService.addFilter(data, "createdDate", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaInicio).format('YYYY-MM-DD') + " 23:59:59");
  
        this.enviarFiltro.emit(data);
    }
}