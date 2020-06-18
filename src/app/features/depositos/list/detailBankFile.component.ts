import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import * as moment from "moment";
import { endpoint } from "../../../../environments/environment";
import { FilterService } from "../../../core/_services/filter.service";
import { Helpers } from "../../../helpers";
import { ApiService } from "../../../core/_services/api.service";
import {BankFilesDetailService} from '../../../core/_services/bankFilesDetail.service';
import { AlertService } from '../../../core/_services/alert.service';
import { bankFilesDetail } from '../../../core/_models/bankFileDetail.model';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';



@Component({
    selector: "app-bankFileList-List",
    templateUrl: "./detailBankFile.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DetailBankFileComponent implements OnInit {

    depositos: any[];
    detail:bankFilesDetail[];
    page: number = 1;
    filter:any={};
    dataPage:any={};
    status: any[] = [
        { label: "Anulada", field: "A" },
        { label: "Enviada", field: "E" },
        { label: "Disponible", field: "D" },

    ];

    constructor(private apiService: BankFilesDetailService, private alert:AlertService) {
    }

    ngOnInit() {
        this.getAll(false);
    }

    getAll(resetPage:boolean ) {
        
        // if(!this.filter.currencyId) this.filter.currencyId=''
        // if(!this.filter.bankId) this.filter.bankId=''
        // if(!this.filter.startDate) this.filter.startDate=''
        // this.filter.endDate=!this.filter.endDate?'':this.filter.endDate;
        if(resetPage) this.page=1
                this.apiService.getPaged(this.filter,this.page).subscribe(response => { 
     this.detail = response.data.map(res=>{
         switch (res['status'])
         {
             case 'A': res.statusName='Anulada';
                       res.class='badge badge-danger'
              break;
              case 'D': res.statusName='Disponible';
                        res.class='badge badge-success'
              break;
              case 'E': res.statusName='Enviada';
                        res.class='badge badge-primary'                        
              break;
         }
         return res
     });
     this.dataPage=response
     },error=>{
         this.alert.error(error.error)
     })       
}



 changePage(next:boolean){;
   this.page=next?this.page +=1:this.page -=1;
   if(this.page<0) this.page=0;
   this.getAll(false)
 }
}