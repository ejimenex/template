import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BankFilesDetailService } from "../../../core/_services/bankFilesDetail.service";
import { AlertService } from "../../../core/_services/alert.service";
import { bankFilesDetail } from "../../../core/_models/bankFileDetail.model";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-bankFileList-List",
  templateUrl: "./detailBankFile.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class DetailBankFileComponent implements OnInit {
  depositos: any[];
  detail: bankFilesDetail[];
  page: number = 1;
  filter: any = {};
  dataPage: any = {};

  constructor(
    private apiService: BankFilesDetailService,
    private alert: AlertService,       
    private loading:NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.getAll(false, this.filter);
  }

  getAll(resetPage: boolean, filter: any) {
    filter.endDate = !this.filter.endDate ? "" : this.filter.endDate;
    filter.startDate = !this.filter.startDate ? "" : this.filter.startDate;
    filter.currencyId = !this.filter.currencyId ? 0 : this.filter.currencyId;
    filter.bankId = !this.filter.bankId ? 0 : this.filter.bankId;
    filter.companyId = !this.filter.companyId ? 0 : this.filter.companyId;
    filter.idHeader = !this.filter.idHeader ? "" : this.filter.idHeader;
    filter.idDetail = !this.filter.idDetail ? "" : this.filter.idDetail;
    filter.status = !this.filter.status ? "" : this.filter.status;
    this.loading.show();
    if (resetPage) this.page = 1;
    this.apiService.getPaged(filter, this.page).subscribe(
      (response) => {
        this.detail = response.data.map((res) => {
          switch (res["status"]) {
            case "A":
              res.statusName = "Anulada";
              res.class = "badge badge-danger";
              break;
            case "D":
              res.statusName = "Disponible";
              res.class = "badge badge-success";
              break;
            case "E":
              res.statusName = "Enviada";
              res.class = "badge badge-primary";
              break;
          }

          return res;
        });
        this.dataPage = response;
        this.loading.hide()
      },
      (error) => {
        this.alert.error(error.error);
        this.detail = [];
        this.dataPage = {};
        this.loading.hide()
      }
    );
  }
  reload() {
    this.filter = {};
    this.getAll(true, this.filter);
  }

  getAllByComponent(filter: any) {
    this.filter = filter;
    this.getAll(true, filter);
  }
  changePage(next: boolean) {
    this.page = next ? (this.page += 1) : (this.page -= 1);
    if (this.page < 0) this.page = 0;
    this.getAll(false, this.filter);
  }
}
