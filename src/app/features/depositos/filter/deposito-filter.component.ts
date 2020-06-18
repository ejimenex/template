import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from "@angular/core";
import * as moment from "moment";
import { Filter } from "../../../core/_models/filter";
import { FilterService } from "../../../core/_services/filter.service";
import { ApiService } from "../../../core/_services/api.service";
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { endpoint } from '../../../../environments/environment';
import { BankService } from '../../../core/_services/bank.service';
import { CurrencyService } from '../../../core/_services/currency.service';
import { CompanyService } from '../../../core/_services/company.service';
import { BankFilesDetailService } from '../../../core/_services/bankFilesDetail.service';


@Component({
    selector: "app-deposito-filter",
    templateUrl: "./deposito-filter.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DepositoFilterComponent implements OnInit {

    page: number = 1;
    filter: any={};
    currency=[]
    bank=[]
    company=[]

    @Output()
    enviarFiltro: EventEmitter<any> = new EventEmitter();

    constructor(private bankService: BankService,
        private currencyService:CurrencyService,
        private companyService: CompanyService,
        private detailService:BankFilesDetailService,
        public filterService: FilterService) {

    }
    ngOnInit() {
     this.onLoad();  
     this.filter.currencyId='0'     
     this.filter.bankId='0'     
     this.filter.companyId='0'
    }

     
    onLoad(){
        this.companyService.getAll().subscribe(resp=>this.company=resp)
        this.bankService.getAll().subscribe(resp=>this.bank=resp)
        this.currencyService.getAll().subscribe(resp=>this.currency=resp)
    }
    find(): void {
        this.enviarFiltro.emit(this.filter);
        
    }

}