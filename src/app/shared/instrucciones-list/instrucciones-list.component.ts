import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Helpers } from "../../helpers";

@Component({
    selector: "app-instrucciones-list",
    templateUrl: "./instrucciones-list.component.html"
})
export class InstruccionesListComponent implements OnInit {

    @Input()
    instrucciones: any[] = [];

    @Input()
    facturas: any[] = [];
    cliente: any = {};

    page: number = 1;
    pageSize: number = 10;
    collectionSize: number = 2;

    @Output() notifyParent: EventEmitter<any> = new EventEmitter();

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }

    agregarInstrucciones(): void {
        let facturas = this.facturas.filter(x => x.selected);
        this.notifyParent.emit(facturas);
        this.activeModal.close("Automatic Close");
    }

    pageChange(data: any): void {
        Helpers.setLoading(true);
        this.page = data;
        var start = (this.page - 1) * this.pageSize;
        var end = start + this.pageSize;
        Array.prototype.splice.apply(this.facturas.slice(start, end), [0, this.instrucciones.length]).concat(this.instrucciones);
        this.instrucciones = this.facturas.slice(start, end);
        Helpers.setLoading(false);

    }

}
