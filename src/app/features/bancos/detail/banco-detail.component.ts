
import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { endpoint, config } from "../../../../environments/environment";
import { ApiService } from '../../../core/_services/api.service';
import { BancoAnulacionComponent } from '../banco-anular/banco-anular.component';
import { FilebankService } from '../../../core/_services/filebank.service';
import { file } from '../../../core/_models/file.model';
import { AlertService } from '../../../core/auth/_services/alert.service';

declare var swal: any;

@Component({
    selector: 'app-banco-detail',
    templateUrl: './banco-detail.component.html'
})
export class BancoDetailComponent {

    Ids: string = null;
    depositos: any[];
    motivos: any[];
    files: file[];
    filter:any={}
    archivoUrl: string = endpoint.fileServiceUrl;//item.documentoId
    @Output()
    notifyParent: EventEmitter<any> = new EventEmitter();


    constructor(private modalService: NgbModal, 
        private filterService: FilebankService,
        private alertService: AlertService ,
        private apiService: ApiService, public activeModal: NgbActiveModal) {

        this.apiService.get(endpoint.motivoAnulacion, {}).subscribe((response) => {
            this.motivos = response.data;
        });
    }
ngOnInit(){
    this.getAll()
}
    anular(banco: any) {

        var modal = this.modalService.open(BancoAnulacionComponent, config.modalConfig);
        modal.componentInstance.banco = banco;
        modal.componentInstance.motivos = this.motivos;

        modal.componentInstance.notifyParent.subscribe(result => {
            this.getAll();
            this.notifyParent.emit(result);
        });
    }


    getAll() {
        this.filterService.fileDetail(this.filter).subscribe(resp => { 
            this.files = resp;
          
            },error=>{
                this.alertService.error(error.error)
            })       

    }

}