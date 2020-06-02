
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { endpoint } from "../../../environments/environment";
import { ApiService } from "../../core/_services/api.service";
import { AlertService } from "../../core/auth/_services/alert.service";

declare var swal: any;

@Component({
    selector: "app-deposito-comment",
    templateUrl: "./deposito-comment.component.html"
})
export class DepositoCommentComponent {

    @Input()
    id: string;
    comentario: string;

    @Output() notifyParent: EventEmitter<any> = new EventEmitter();

    constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private alertService: AlertService) { }

    validarComentario(comentario: string) {
        if (!comentario) return "Comentario no válido";
        if (comentario.length > 1000) return "Comentario demasiado grande";
        return null;
    }

    guardarComentario(id: string, comentario: string) {
        var error = this.validarComentario(comentario);
        if (error)
            this.alertService.error(error);

        this.apiService.patchReplace(endpoint.depositsUrl + id, { comentario }).subscribe((response) => {
            this.alertService.success("El comentario se guardo correctamente.");
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
            }
        );
        this.activeModal.close("Automatic Close");

    }

}