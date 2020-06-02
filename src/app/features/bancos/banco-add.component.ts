
import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { endpoint } from "../../../environments/environment";
import { Helpers } from '../../helpers';
import { HttpClient } from '@angular/common/http';

declare var swal: any;

@Component({
    selector: 'app-banco-add',
    templateUrl: './banco-add.component.html'
})
export class BancoAddComponent {

    bancoId: string = null;
    monedaId: string = null;
    comentario: string;
    file: any;
    bancos: any;
    monedas: any;
    inProgress: boolean = false;

    @Output() notifyParent: EventEmitter<any> = new EventEmitter();

    constructor(public activeModal: NgbActiveModal, protected _http: HttpClient) {

    }

    onFileChange(event: any) {
        let fi = event.srcElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            this.file = fi;
            let formData: FormData = new FormData();
        }

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


        this._http.post(endpoint.depositsUrl + `cargarArchivo`, formData)
            .subscribe(r => {

                this.activeModal.close('Automatic Close');
                swal("Los datos se guardaron correctamente.", "", "success");
                this.notifyParent.emit(r);
            }, err => {
                console.log(err);
                this.activeModal.close('Automatic Close');
                swal(err.error, "", "error");
                this.inProgress = false;
                Helpers.setLoading(false);
                return;
            });

    }


    private jwt(formData: FormData) {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.accessToken) {
            formData.append('Authorization', 'Bearer ' + currentUser.accessToken);
            formData.append('ApplicationUser', currentUser.userName);
        }

        //return formData;
    }
}