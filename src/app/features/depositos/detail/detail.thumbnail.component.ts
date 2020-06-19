import { Component, Host, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint, config } from "../../../../environments/environment";
import { CancelDetailComponent } from "../cancel-file/cancel-detail.component";
import { DepositoCommentComponent } from "../deposito-comment.component";
import { DetailBankFileComponent } from "../list/detailBankFile.component";
import { ApiService } from "../../../core/_services/api.service";
import { DepositoDetailAnulacionComponent } from '../deposito-detail-anulacion/deposito-detail-anulacion.component';
import { AlertService } from '../../../core/_services/alert.service';


@Component({
    selector: "[app-detail-thumbnail]",
    templateUrl: "./detail.thumbnail.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DetailThumbnailComponent implements OnInit {

    private id: any;

    @Input()
    deposito: any;

    @Output()
    notifyParent: EventEmitter<any> = new EventEmitter();

    motivos: any[];

    constructor(private modalService: NgbModal, @Host() private parent: DetailBankFileComponent,
        private apiService: ApiService, private alertService: AlertService) {
    }
    ngOnInit() {
    }

   
    agregarComentario(id: any, comentario: any) {

        var modal = this.modalService.open(DepositoCommentComponent, config.modalConfig);
        modal.componentInstance.id = id;
        modal.componentInstance.comentario = comentario;

        modal.componentInstance.notifyParent.subscribe(result => {
          
            this.notifyParent.emit(result);
        });

    }

    cancelFile() {

        this.apiService.get(endpoint.motivoAnulacion, {}).subscribe((response) => {

            var modal = this.modalService.open(CancelDetailComponent, config.modalConfig);
            modal.componentInstance.deposito = this.deposito;
            modal.componentInstance.motivos = response.data;
         
            modal.componentInstance.notifyParent.subscribe(result => {
               // this.parent.getAll(false);
                this.notifyParent.emit(result);
            });
        });

    }

    verAnulacion() {

        let data = {}

        this.apiService.addFilter(data, 'depositoId', this.deposito.id);

        this.apiService.get(endpoint.depositoAnulacionUrl, data).subscribe((response) => {

            let model = response.data.length > 0 ? response.data[0] : null;

            if (model) {
                var modal = this.modalService.open(DepositoDetailAnulacionComponent, config.modalConfig);
                modal.componentInstance.model = response.data.length > 0 ? response.data[0] : null;

                this.apiService.get(endpoint.motivoAnulacion, {}).subscribe((response) => {
                    modal.componentInstance.motivos = response.data;
                });
            } else {
                this.alertService.info(`No hay información disponible del deposito # ${this.deposito.id}`);
            }


        });

    }


}