
import { switchMap, debounceTime, distinctUntilChanged, tap, catchError, map } from 'rxjs/operators';

import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { endpoint } from "../../../environments/environment";
import { ApiService } from "../../core/_services/api.service";
import { AlertService } from "../../core/auth/_services/alert.service";

declare var swal: any;


@Component({
    selector: 'app-deposito-costumer',
    templateUrl: './deposito-costumer.component.html'
})
export class DepositoCostumerComponent {
    id: string;
    clienteId: string = null;
    cliente: any;
    deposito: any;
    searching = false;
    searchFailed = false;
    hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

    formatter = (result: any) => {
        return result.nombre;
    }
    documentoformatter = (result: any) => result.documento;

    generalFormatter = (result: any) => result.documento + " " + result.nombre;

    @Output() notifyParent: EventEmitter<any> = new EventEmitter();

    constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private alertService: AlertService) { }


    guardarCliente() {
        if (!this.deposito.id || !this.cliente.id) return;

        this.apiService.post(endpoint.depositsUrl + this.deposito.id + "/SetCliente/" + this.cliente.codigo, "").subscribe((response) => {
            this.notifyParent.emit(response);
        },
            error => {

                let mensaje = error.error.text != null ? error.error.text : error.error;

                if (error.status !== 200)
                    this.alertService.error(mensaje);
                else {
                    this.alertService.success("El cliente se asigno correctamente.");
                }
                this.notifyParent.emit(mensaje);
            });
        this.activeModal.close('Automatic Close');

    }
    //?Fields=Id,Nombre,Documento,TipoCliente.Nombre,Codigo&pagesize=6
    search = (text$: Observable<any[]>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => this.searching = true),
            switchMap(term =>
                this.apiService.get(endpoint.clienteUrl + "?Fields=Nombre,Id,Documento,Codigo&pagesize=6", { nombre: "'" + term }).pipe(map(x => x.data))),
            tap(() => this.searchFailed = false),
            catchError(() => {
                this.searchFailed = true;
                return [];
            }),
            tap(() => this.searching = false))


    searchDocumento = (text$: Observable<any[]>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => this.searching = true),
            switchMap(term =>
                this.apiService.get(endpoint.clienteUrl + "?Fields=Nombre,Id,Documento,Codigo&pagesize=6", { documento: "'" + term }).pipe(map(x => x.data))),
            tap(() => this.searchFailed = false),
            catchError(() => {
                this.searchFailed = true;
                return [];
            }),
            tap(() => this.searching = false))


}