import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../../core/_services/api.service";
import { endpoint } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from "rxjs/operators";
import { AlertService } from "../../../core/_services/alert.service";

@Component({
    selector: "app-cheque-devuelto-add",
    templateUrl: "cheque-devuelto-add.component.html"
})
export class ChequeDevueltoAddComponent implements OnInit {

    chequeDevuelto: any = {};
    motivos: any[] = [];
    bancos: any[] = [];
    monedas: any[] = [];
    selection: string[] = ["Id,Nombre"];

    formatter = (result: any) => result.nombre;

    @Output() notifyParent: EventEmitter<any> = new EventEmitter();

    constructor(public activeModal: NgbActiveModal, public apiService: ApiService, private alertService: AlertService) {
        this.cargarBancos();
        this.cargarMonedas();
        this.cargarMotivos();
    }


    ngOnInit() {
    }

    cargarBancos(): void {
        var data = {};

        var fields = ["Codigo"];
        let selection = this.selection.concat(fields);

        this.apiService.addSelection(data, selection);
        this.apiService.addFilter(data, "poseeCuentasContables", true);
        var promise = this.apiService.get(endpoint.bancoUrl, data);

        promise.subscribe(response => {
            this.bancos = response.data;
        }, error => {
        });
    }


    cargarMonedas(): void {
        var data = {};

        var fields = ["Principal", "Tasa", "Codigo"];
        let selection = this.selection.concat(fields);

        this.apiService.addSelection(data, selection);
        var promise = this.apiService.get(endpoint.monedaUrl, data);

        promise.subscribe(response => {
            this.monedas = response.data;
        }, error => {
        });
    }

    cargarMotivos(): void {
        var data = {};

        var fields = ["Descripcion"];
        let selection = this.selection.concat(fields);

        this.apiService.addSelection(data, selection);
        var promise = this.apiService.get(endpoint.motivosDevolucionUrl, data);

        promise.subscribe(response => {
            this.motivos = response.data;
        }, error => {
        });
    }

    guardar(): void {

        this.apiService.post(endpoint.chequesDevueltosUrl, this.chequeDevuelto)
            .subscribe(response => {
                this.notifyParent.emit(response);
                this.activeModal.close("Automatic Click");
                this.alertService.success(`El cheque devuelto ${response.noRecibo} ha sido generado correctamente.`);
            }, error => {
                let mensaje: any = error.error;
                this.alertService.error(mensaje);
            });
    }


    selectedCliente(data: any): void {
        this.chequeDevuelto.clienteId = data.item.id;
    }


    searchCliente = (text$: Observable<any[]>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term =>
                this.apiService.get(endpoint.clienteUrl + "?Fields=Id,Nombre&pagesize=6", { nombre: "'" + term }).pipe(map(x => x.data))),
            catchError(() => {
                return [];
            }))



}
