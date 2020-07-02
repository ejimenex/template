import { ApiService } from "../../../core/_services/api.service";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import { endpoint, config } from "../../../../environments/environment";
import { Helpers } from "../../../helpers";
import { FileService } from "../../../core/_services/file.service";
import { fileExport } from "../../../core/_models/fileExport";
import { FileExportService } from "../../../core/_services/file-export.service";
import { Currency } from "../../../core/_models/currency";
import { Bank } from "../../../core/_models/bank";
import { CurrencyService } from "../../../core/_services/currency.service";
import { BankService } from "../../../core/_services/bank.service";
import { AlertService } from "../../../core/_services/alert.service";
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: "app-export-list",
  templateUrl: "./export-list.component.html"

})
export class ExportListComponent implements OnInit {

  @Input() filter: any = {};
  files: fileExport[];

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
    private filterService: FileExportService
  ) { }

  ngOnInit() {
    this.getAll(false);
    this.onLoad();
  }

  onLoad() {
    this.currencyService.getAll().subscribe((curr) => (this.currency = curr));
    this.bankService.getAll().subscribe((curr) => (this.bank = curr));
  }

  getAll(resetPage: boolean) {
    if (!this.filter.currencyId) this.filter.idCurrency = "0";
    if (!this.filter.bankId) this.filter.idBank = "0";
    if (!this.filter.nameBankFile)this.filter.nameBankFile = "";
    if (!this.filter.dataExport) this.filter.dataExport = "";
    this.filter.createdDate = !this.filter.createdDate ? "" : this.filter.createdDate;
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
}
