import { Component, Host, Input, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { endpoint, config } from "../../../environments/environment";
import { BancoDetailComponent } from './banco-detail.component';
import { BancoListComponent } from './list/banco-list.component';
import { ApiService } from '../../core/_services/api.service';
import { BancoAnulacionComponent } from './banco-anular/banco-anular.component';


@Component({
    selector: '[app-banco-thumbnail]',
    templateUrl: './banco-thumbnail.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class BancoThumbnailComponent implements OnInit {

    private id: any;

    @Input()
    banco: any;


    @Output()
    notifyParent: EventEmitter<any> = new EventEmitter();

    constructor(private modalService: NgbModal, private apiService: ApiService) {

    }
    ngOnInit() {
    }

    verDetalles() {

        let data = {};
        this.apiService.orderBy(data, ["Id"], true);
        data["Id"] = this.banco.archivoBancoIds.join(",");

        this.apiService.addSelection(data, ["Id", "createdDate", "createdBy", "quantity", "totalAmount", "commentary", "documentoId",
            "estatus"]);


        this.apiService.addFilter(data, "estatus", "D");

        var promise = this.apiService.get(endpoint.depositsUrl, data);

        promise.subscribe(response => {
            var modal = this.modalService.open(BancoDetailComponent, config.modalConfig);
            modal.componentInstance.depositos = response.data;
            modal.componentInstance.Ids = this.banco.archivoBancoIds.join(",");

        }, error => {
        });

    }

}
