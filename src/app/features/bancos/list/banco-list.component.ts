import { ApiService } from '../../../core/_services/api.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { endpoint, config } from "../../../../environments/environment";
import { Helpers } from '../../../helpers';
import { FileService} from '../../../core/_services/file.service';
import { file } from '../../../core/_models/file.model';
import { BankAddComponent } from '../add/bank-add.component';
import { Filter } from '../../../core/_models/filter';
import { FilterService } from '../../../core/_services/filter.service';
import{FilebankService} from '../../../core/_services/filebank.service';
import { Currency } from '../../../core/_models/currency';
import { Bank } from '../../../core/_models/bank';
import { CurrencyService } from '../../../core/_services/currency.service';
import { BankService } from '../../../core/_services/bank.service';
import { AlertService } from '../../../core/_services/alert.service';


@Component({
    selector: 'app-banco-List',
    templateUrl: './banco-list.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class BancoListComponent implements OnInit {

    @Input() filter:any={}
    files: file[];
   
    currencyselect: any; 
    seleccionado: any;
    currency:Currency[]
    bank:Bank[]
    page: number = 1;
    dataPage:any={};

    constructor(private modalService: NgbModal, 
                private alertService: AlertService    , 
                
               public currencyService: CurrencyService,
               public bankService: BankService,
                private filterService: FilebankService) {
      
    }


    ngOnInit() {
    
        this.getAll();
        this.onLoad();         
    }

    agregarBanco() {

        var modal = this.modalService.open(BankAddComponent, config.modalConfig);
        modal.componentInstance.monedas = [];
        modal.componentInstance.notifyParent.subscribe(result => {
            this.getAll();
        });
    }
   

    onLoad(){
        this.currencyService.getAll().subscribe(curr=> this.currency=curr)
        this.bankService.getAll().subscribe(curr=> this.bank=curr)
    }

    getAll( ) {
        
             if(!this.filter.currencyId) this.filter.currencyId=''
             if(!this.filter.bankId) this.filter.bankId=''
             if(!this.filter.startDate) this.filter.startDate=''
             this.filter.endDate=!this.filter.endDate?'':this.filter.endDate;
                     this.filterService.getPaged(this.filter,this.page).subscribe(response => { 
          this.files = response.data;
          this.dataPage=response
          },error=>{
              this.alertService.error(error.error)
          })       
 }

 

      changePage(next:boolean){;
        this.page=next?this.page +=1:this.page -=1;
        if(this.page<0) this.page=0;
        this.getAll()
      }

     

    /*getAll() {

        var data = {};

        if (this.filterService.isValid()) {
            this.apiService.addFilter(this.filter, this.filterService.getField(), this.filterService.getValue());
        }

        if (this.currencyselect != null) {
            this.apiService.addFilter(this.filter, "currencyId", this.currencyselect);
        }

        if (this.fechaInicio && this.fechaFinal)
            //'yyyy-MM-dd'
            this.apiService.addFilter(data, "createdDate", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaFinal).format('YYYY-MM-DD') + " 23:59:59");

        else if (this.fechaInicio)
            this.apiService.addFilter(data, "createdDate", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaInicio).format('YYYY-MM-DD') + " 23:59:59");


        var promise = this.apiService.get(endpoint.depositsUrl, data);
        
        

        promise.subscribe(
            response => {
                this.bancos = response.data;
                this.collectionSize = response.count;
                Helpers.setLoading(false);
            },
            error => {
                Helpers.setLoading(false);
            }
        );

    }*/

   /* filterChange(data) {
        Helpers.setLoading(true);
        //this.apiService.addPagination(data, this.page, this.pageSize);
        var promise = this.apiService.get(endpoint.depositsUrl, data);

        
        promise.subscribe(
            response => {
                this.bancos = response.data;
                this.collectionSize = parseInt(response.count, 10) / this.pageSize;
                Helpers.setLoading(false);
            },
            error => {
                Helpers.setLoading(false);
            }
        );
    }*/
}