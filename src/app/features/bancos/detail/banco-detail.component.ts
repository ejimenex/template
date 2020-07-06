import { Component, EventEmitter, Output } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint, config } from "../../../../environments/environment";
import { ApiService } from "../../../core/_services/api.service";
import { CancelFileComponent } from "../file-cancel/file-cancel.component";
import { FilebankService } from "../../../core/_services/filebank.service";
import { file } from '../../../core/_models/file.model';
import { AlertService } from "../../../core/auth/_services/alert.service";
import { exportFile } from '../../../core/_models/exportFile';
import { ExportfileService} from "../../../core/_services/exportfile.service";

declare var swal: any;

@Component({
  selector: "app-banco-detail",
  templateUrl: "./banco-detail.component.html",
})
export class BancoDetailComponent {
  Ids: string = null;
  depositos: any[];
  motivos: any[];
  exportFile : any={}; 
  file : any ={};
  files: file[];
  filter: any = {};
  archivoUrl: string = endpoint.fileServiceUrl; //item.documentoId
  dowloand: string = endpoint.detaild
  @Output()
  notifyParent: EventEmitter<any> = new EventEmitter();
  
   exportfileService: ExportfileService;

  constructor(
    private modalService: NgbModal,
    private filterService: FilebankService,
    private alertService: AlertService,
    private apiService: ApiService,
    public activeModal: NgbActiveModal
  ) {
    this.apiService.get(endpoint.motivoAnulacion, {}).subscribe((response) => {
      this.motivos = response.data;
    });
  }
  ngOnInit() {
    this.getAll();
  }
  cancel(bankFile: number) {
    var modal = this.modalService.open(CancelFileComponent, config.modalConfig);
    modal.componentInstance.cancel.bankFileId = bankFile;
    modal.componentInstance.motivos = this.motivos;

    modal.componentInstance.notifyParent.subscribe((result) => {
      this.getAll();
      this.notifyParent.emit(result);
      this.notifyParent.emit();
    });
  }
  close() {
    this.activeModal.close();
    this.notifyParent.emit();
  }

  exportFileShared(){
    let dataUser = JSON.parse(localStorage.getItem('currentUser'));
    let user = dataUser.userName;  
    this.exportFile.UserExport = user;

    let formData: FormData = new FormData(); 

    formData.append("company", this.file.companyId);
    formData.append("currency", this.file.currencyId);
    formData.append("bank", this.file.bankId);
    formData.append("bankfile", this.file.Id);
    formData.append("user", this.exportFile.UserExport);
    this.exportfileService.exportFile(formData)
    .subscribe(
      (r) => {
       this.activeModal.close();
        swal("Archivo Exportado con Éxito", "", "success");
        this.notifyParent.emit(r);
      },
      (err) => {
        console.log(err);
         this.activeModal.close();
        swal(err.error, "", "info");
        return;
      }
    );

  }
  getAll() {
    this.filterService.fileDetail(this.filter).subscribe(
      (resp) => {
        if (resp.length == 0) this.activeModal.close();
        this.files = resp;
        this.files.map(res=>{
          switch(res.status)
          {
            case 'D' : res.status='Disponible';
            break;
            case 'E' : res.status='Enviada';
            break;
          }
        })
      console.log(resp);
      },
      (error) => {
        this.alertService.error(error.error);
      }
    );
  }
}
