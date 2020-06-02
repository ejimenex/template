
import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { endpoint, config } from "../../../environments/environment";
import { ApiService } from '../../core/_services/api.service';
import { BancoAnulacionComponent } from './banco-anular/banco-anular.component';

declare var swal: any;

@Component({
    selector: 'app-banco-detail',
    templateUrl: './banco-detail.component.html'
})
export class BancoDetailComponent {

    Ids: string = null;
    depositos: any[];
    motivos: any[];
    archivoUrl: string = endpoint.fileServiceUrl;//item.documentoId
    @Output()
    notifyParent: EventEmitter<any> = new EventEmitter();


    constructor(private modalService: NgbModal, private apiService: ApiService, public activeModal: NgbActiveModal) {

        this.apiService.get(endpoint.motivoAnulacion, {}).subscribe((response) => {
            this.motivos = response.data;
        });
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
        var data = {};
        this.apiService.orderBy(data, ["id"], true);
        data["id"] = this.Ids;

        this.apiService.addSelection(data, ["id", "fechaCreacion", "creadoPor", "cantidad", "monto", "comentario", "documentoId",
            "estatus"]);


        this.apiService.addFilter(data, "estatus", "A,D");

        var promise = this.apiService.get(endpoint.depositsUrl, data);

        promise.subscribe(response => {
            this.depositos = response.data;
        });
    }

}