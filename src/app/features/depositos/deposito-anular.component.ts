
import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { endpoint } from "../../../environments/environment";
import { ApiService } from "../../core/_services/api.service";
import { AlertService } from "../../core/_services/alert.service";


@Component({
    selector: 'app-deposito-anulacion',
    templateUrl: './deposito-anular.component.html'
})
export class DepositoAnulacionComponent {

    deposito: any;
    motivo: any;
    motivos: any[];
    comentario: any = "";

    ngOnInit() {

        this.motivo = this.motivos[0];
    }

    @Output() notifyParent: EventEmitter<any> = new EventEmitter();

    constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private alertService: AlertService) { }

    guardarMotivoAnulacion() {
        if (this.comentario == "" && this.motivo.requiereComentario) {
            this.alertService.error("El comentario es obligatorio.");
            return;
        }

        var data = {
            anularArchivoId: this.motivo.id,
            comentario: this.comentario,
        };
        let request: any = {
            headers: this.jwt(),
            body: data
        };

        this.apiService.delete(endpoint.transaccionUrl + this.deposito.id, request).subscribe((response) => {
            this.alertService.success("El deposito se anulo correctamente.");
            this.notifyParent.emit(response);
        },
            error => {
                let mensaje = error.error.text != null ? error.error.text : error.error;

                if (error.status !== 200)
                    this.alertService.error(mensaje);
                else {
                    this.alertService.success(mensaje);
                }
                this.notifyParent.emit(mensaje);
            });
        this.activeModal.close('Automatic Close');

    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.accessToken) {

            let headers: any = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.accessToken,
                'ApplicationUser': currentUser.userName
            });

            return headers;

        }
    }

}