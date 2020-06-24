import { Component, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint } from "../../../../environments/environment";
import { Helpers } from "../../../helpers";
import { HttpClient } from "@angular/common/http";
import { CompanyService } from "../../../core/_services/company.service";
import { CurrencyService } from "../../../core/_services/currency.service";
import { async } from "rxjs/internal/scheduler/async";
import { company } from "../../../core/_models/company.model";
import { Currency } from "../../../core/_models/currency";
import { Bank } from "../../../core/_models/bank";
import {BankFilesService} from '../../../core/_services/bankFiles.service';
import { NgxSpinnerService } from "ngx-spinner";
import { BankService } from "../../../core/_services/bank.service";

declare var swal: any;

@Component({
  selector: "app-bank-add",
  templateUrl: "./bank-add.component.html",
})
export class BankAddComponent{
  bancoId: string = null;
  companies: company[];
  banks: Bank[];
  bankFile:any={}
  currencys: Currency[];
  monedaId: string = null;
  comentario: string;
  file: any;
  bancos: any;
  monedas: any;
  inProgress: boolean = false;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private loading:NgxSpinnerService,
    protected _http: HttpClient,
    public currencyService: CurrencyService,
    public bankService: BankService,
    public companyService: CompanyService,
    public bankFileService: BankFilesService
  ) {


  }
  ngOnInit() {
    this.onLoad();
  }

  onFileChange(event: any) {
    let fi = event.srcElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.file = fi;
      let formData: FormData = new FormData();

    
    }
  }

   onLoad() {
     this.bankService.getAll().subscribe(bank=> this.banks=bank);
        this.companyService.getAll().subscribe(com=>this.companies=com);
           this.currencyService.getAll().subscribe(currency=>this.currencys=currency); 
      
      let dataUser = JSON.parse(localStorage.getItem('currentUser'));
      let user = dataUser.userName;  
      this.bankFile.createdBy = user;
          
  }
  

  enviarArchivo() {
    this.inProgress = true;
    this.loading.show()
    let formData: FormData = new FormData(); 

    if (!this.file) {
      swal("El archivo es obligatorio.", "", "error");
      this.inProgress = false;
      this.loading.hide()
      return;
    }
debugger
    formData.append("company", this.bankFile.companyId);
    formData.append("currency", this.bankFile.currencyId);
    formData.append("bank", this.bankFile.bankId);
    formData.append("user", this.bankFile.createdBy);
    formData.append("commentary", this.bankFile.commentary=!this.bankFile.commentary?'':this.bankFile.commentary);
    var file = $("#file")[0];
    formData.append("archivo", this.file.files[0]);
    this.bankFileService.uploadFile(formData)
    .subscribe(
      (r) => {
       this.activeModal.close();
       this.loading.hide()
        swal("Los datos se guardaron correctamente.", "", "success");
        this.notifyParent.emit(r);
      },
      (err) => {
        console.log(err);
         this.activeModal.close();
        this.file=undefined
        this.loading.hide();
        swal(err.error, "", "info");
        this.inProgress = false;
        Helpers.setLoading(false);
        return;
      }
    );
  }
  
}
