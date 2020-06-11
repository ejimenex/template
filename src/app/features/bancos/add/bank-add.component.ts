import { Component, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint } from "../../../../environments/environment";
import { Helpers } from "../../../helpers";
import { HttpClient } from "@angular/common/http";
import { CompanyService } from "../../../core/_services/company.service";
import { BankService } from "../../../core/_services/bank.service";
import { CurrencyService } from "../../../core/_services/currency.service";
import { async } from "rxjs/internal/scheduler/async";
import { company } from "../../../core/_models/company.model";
import { Currency } from "../../../core/_models/currency";
import { Bank } from "../../../core/_models/bank";

declare var swal: any;

@Component({
  selector: "app-bank-add",
  templateUrl: "./bank-add.component.html",
})
export class BankAddComponent {
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
    protected _http: HttpClient,
    public currencyService: CurrencyService,
    public bankService: BankService,
    public companyService: CompanyService
  ) {}
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
           
  }
  enviarArchivo() {
    this.inProgress = true;
    Helpers.setLoading(true);
    let formData: FormData = new FormData();

    if (!this.file) {
      swal("El archivo es obligatorio.", "", "error");
      this.inProgress = false;
      Helpers.setLoading(false);
      return;
    }

    if (!this.bancoId) {
      swal("El banco es obligatorio.", "", "error");
      this.inProgress = false;
      Helpers.setLoading(false);
      return;
    }

    if (!this.monedaId) {
      swal("La moneda es obligatoria.", "", "error");
      this.inProgress = false;
      Helpers.setLoading(false);
      return;
    }

    formData.append("bancoId", this.bancoId);
    formData.append("monedaId", this.monedaId);

    formData.append("comentario", this.comentario || "");
    var file = $("#file")[0];
    formData.append("archivo", this.file.files[0]);

    this.jwt(formData);

    this._http.post(endpoint.depositsUrl + `cargarArchivo`, formData).subscribe(
      (r) => {
        this.activeModal.close("Automatic Close");
        swal("Los datos se guardaron correctamente.", "", "success");
        this.notifyParent.emit(r);
      },
      (err) => {
        console.log(err);
        this.activeModal.close("Automatic Close");
        swal(err.error, "", "error");
        this.inProgress = false;
        Helpers.setLoading(false);
        return;
      }
    );
  }

  private jwt(formData: FormData) {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.accessToken) {
      formData.append("Authorization", "Bearer " + currentUser.accessToken);
      formData.append("ApplicationUser", currentUser.userName);
    }

    //return formData;
  }
}
