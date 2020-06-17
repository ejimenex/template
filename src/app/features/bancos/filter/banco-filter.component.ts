import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from '../../../core/_services/api.service';
import { Filter } from '../../../core/_models/filter';
import { CurrencyService } from '../../../core/_services/currency.service';
import { BankService } from '../../../core/_services/bank.service';
import { Currency } from '../../../core/_models/currency';
import { Bank } from '../../../core/_models/bank';
import { FilebankService } from '../../../core/_services/filebank.service';
import { HttpParams } from '@angular/common/http';

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
    filter: any={};
    currencyselect: any; 
    bankselect: number; 
    currency:Currency[]
    bank:Bank[]

    onLoad(){
        this.currencyService.getAll().subscribe(curr=> this.currency=curr)
        this.bankService.getAll().subscribe(curr=> this.bank=curr)
    }
    @Output()
    enviarFiltro: EventEmitter<any> = new EventEmitter();

    constructor(private apiService: ApiService,
               public currencyService: CurrencyService,
               public bankService: BankService,
               public fileBankServices : FilebankService) {
        this.fechaInicio.setDate(this.fechaFinal.getDate() - 90);//30
       // this.filter = new Filter();

        // this.filter.seleccionado = this.bancos[0];
    }
    
    ngOnInit() {
        this.currency=[]
        this.bank =[]
       
        this.onLoad()
        
        this.buscar()
    }

    onDateChange(data) {
    }

    buscar(): void {
        var data = {};
        //var data: any = {};
        // this.fileBankServices.orderBy(data, ["Id"], true);

        // this.enviarFiltro.emit(this.filter);
        // console.log(this.currencyselect);

        // if(this.currencyselect != null){
        //     this.fileBankServices.searchCurrency(this.currencyselect);
        }
    
        // if (this.fechaInicio && this.fechaFinal)
        //     //'yyyy-MM-dd'
        //     this.fileBankServices.search(data, "createdDate", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaFinal).format('YYYY-MM-DD') + " 23:59:59");

        // else if (this.fechaInicio)
        //     this.fileBankServices.search(data, "createdDate", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaInicio).format('YYYY-MM-DD') + " 23:59:59");
  
        // this.enviarFiltro.emit(data);
    //}
}