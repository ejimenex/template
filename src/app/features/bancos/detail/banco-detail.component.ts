
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
import * as fileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';

declare var swal: any;

@Component({
  selector: "app-banco-detail",
  templateUrl: "./banco-detail.component.html",
})
export class BancoDetailComponent {
  Ids: string = null;
  depositos: any[];
  motivos: any[];
  // exportFile : any={}; 
  bankFile:any={};
  file : any ={};
  files: file[];
  filter: any = {};
  archivoUrl: string = endpoint.fileServiceUrl; //item.documentoId
  dowloand: string = endpoint.detaild
  export: string = endpoint.exportFile
  userexport: any;
  @Output()
  notifyParent: EventEmitter<any> = new EventEmitter();     

  constructor(
    private modalService: NgbModal,
    private filterService: FilebankService,
    private exportfileService: ExportfileService,
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
    this.onLoad();
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
    //this.notifyParent.emit();
  }

  onLoad (){
    let dataUser = JSON.parse(localStorage.getItem('currentUser'));
    let user = dataUser.userName;  
    this.userexport = user;
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
            case 'E' : res.status='Exportado';
            break;
          }
        })
     
      },
      (error) => {
        this.alertService.error(error.error);
      }
    );
  }

  exportFile(item: any){
    this.exportfileService.exportFile(item, this.userexport).subscribe(
      () => {
        this.activeModal.close(); 
        this.notifyParent.emit("success");
          
      },
      () => {
        this.activeModal.close();  
        this.notifyParent.emit("error");

      }
    );
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
        break;
                                    
        default:
            return false;
    }
  }
}
