import { ApiService } from "../../../core/_services/api.service";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { endpoint, config } from "../../../../environments/environment";
import { Helpers } from "../../../helpers";
import { FileService } from "../../../core/_services/file.service";
import { file } from "../../../core/_models/file.model";
import { BankAddComponent } from "../add/bank-add.component";
import { FilebankService } from "../../../core/_services/filebank.service";
import { Currency } from "../../../core/_models/currency";
import { Bank } from "../../../core/_models/bank";
import { CurrencyService } from "../../../core/_services/currency.service";
import { BankService } from "../../../core/_services/bank.service";
import { AlertService } from "../../../core/_services/alert.service";
import { BancoDetailComponent } from "../detail/banco-detail.component";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-banco-List",
  templateUrl: "./banco-list.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class BancoListComponent implements OnInit {
  @Input() filter: any = {};
  files: file[];

  currencyselect: any;
  seleccionado: any;
  currency: Currency[];
  bank: Bank[];
  page: number = 1;
  dataPage: any = {};
  banco: any;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,    
    private loading:NgxSpinnerService,
    public currencyService: CurrencyService,
    public bankService: BankService,
    private filterService: FilebankService
  ) {
  }

  ngOnInit() {
    this.getAll(false);
    this.onLoad();
  
  }

  agregarBanco() {
    var modal = this.modalService.open(BankAddComponent, config.modalConfig);
    modal.componentInstance.monedas = [];
    modal.componentInstance.notifyParent.subscribe((result) => {
      this.getAll(false);
    });
   }

  onLoad() {
    this.currencyService.getAll().subscribe((curr) => (this.currency = curr));
    this.bankService.getAll().subscribe((curr) => (this.bank = curr));
  }

  viewDetail(item) {
    var modal = this.modalService.open(
      BancoDetailComponent,
      config.modalConfig
    );
    modal.componentInstance.filter = item;
    modal.componentInstance.notifyParent.subscribe((result) => {
        this.getAll(false);
      });
  }

  

  getAll(resetPage: boolean) {
    if (!this.filter.currencyId) this.filter.currencyId = "0";
    if (!this.filter.bankId) this.filter.bankId = "0";
    if (!this.filter.startDate) this.filter.startDate = "";
    this.filter.endDate = !this.filter.endDate ? "" : this.filter.endDate;
    this.loading.show();
    if (resetPage) this.page = 1;
    this.filterService.getPaged(this.filter, this.page).subscribe(
      (response) => {
        this.files = response.data;
        this.dataPage = response;
        this.loading.hide();
      },
      (error) => {
        this.alertService.error(error.error);
        this.loading.hide();
      }
    );
  }
  changePage(next: boolean) {
    this.page = next ? (this.page += 1) : (this.page -= 1);
    if (this.page < 0) this.page = 0;
    this.getAll(false);
  }
  checkClaim(option: string) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    switch(option) {
        case 'Cancel':
        case 'See':
        case 'Download':
        case 'Upload':
        case 'Parameter':
        case 'ImportBankFile':
        case 'ExportBankFile':
        case 'DetailBankFile':
            let result = currentUser.claims.indexOf(option);
            if(result != -1) return true;
            else return false;        
                                    
        default:
            return true;
    }
  }
}