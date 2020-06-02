import { Component, Host, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint, config } from "../../../environments/environment";
import { DepositoAnulacionComponent } from "./deposito-anular.component";
import { DepositoCommentComponent } from "./deposito-comment.component";
import { DepositoCostumerComponent } from "./deposito-costumer.component";
import { DepositoListComponent } from "./depositoList.component";
import { ApiService } from "../../core/_services/api.service";
import { DepositoDetailAnulacionComponent } from './deposito-detail-anulacion/deposito-detail-anulacion.component';
import { AlertService } from '../../core/_services/alert.service';


@Component({
    selector: "[app-deposito-thumbnail]",
    templateUrl: "./deposito.thumbnail.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DepositoThumbnailComponent implements OnInit {

    private id: any;

    @Input()
    deposito: any;

    @Output()
    notifyParent: EventEmitter<any> = new EventEmitter();

    motivos: any[];

    constructor(private modalService: NgbModal, @Host() private parent: DepositoListComponent,
        private apiService: ApiService, private alertService: AlertService) {
    }
    ngOnInit() {
    }

    asignarCliente(id: any, clienteId: any) {

        if (clienteId == null) {
            this.abrirModal(null);
            return;
        }
        var promise = this.apiService.get(endpoint.clienteUrl + clienteId, {});

        promise.subscribe(
            response => {
                this.abrirModal(response);
            });


    }

    abrirModal(response) {
        var modal = this.modalService.open(DepositoCostumerComponent, config.modalConfig);
        modal.componentInstance.id = this.deposito.id;
        // modal.componentInstance.clienteId = clienteId;
        modal.componentInstance.deposito = this.deposito;
        if (response != null) {
            modal.componentInstance.cliente = response;
        }

        modal.componentInstance.notifyParent.subscribe(result => {
            this.notifyParent.emit(result);
            this.parent.getAll();
        });
    }
    agregarComentario(id: any, comentario: any) {

        var modal = this.modalService.open(DepositoCommentComponent, config.modalConfig);
        modal.componentInstance.id = id;
        modal.componentInstance.comentario = comentario;

        modal.componentInstance.notifyParent.subscribe(result => {
            this.parent.getAll();
            this.notifyParent.emit(result);
        });

    }

    anularDeposito() {

        this.apiService.get(endpoint.motivoAnulacion, {}).subscribe((response) => {

            var modal = this.modalService.open(DepositoAnulacionComponent, config.modalConfig);
            modal.componentInstance.deposito = this.deposito;
            modal.componentInstance.motivos = response.data;

            modal.componentInstance.notifyParent.subscribe(result => {
                this.parent.getAll();
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