import { ApiService } from '../../core/_services/api.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { endpoint, config } from "../../../environments/environment";
import { Helpers } from '../../helpers';
import { BancoAddComponent } from './banco-add.component';


@Component({
    selector: 'app-banco-List',
    templateUrl: './banco-list.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class BancoListComponent implements OnInit {

    @Input()
    bancos: any[];

    fechaInicio: Date = new Date();
    fechaFinal: Date = new Date();

    page: number = 1;
    pageSize: number = 10;
    collectionSize: number;

    constructor(private modalService: NgbModal, private apiService: ApiService) {
        this.fechaInicio.setDate(this.fechaFinal.getDate() - config.dias);//30
    }


    ngOnInit() {
        Helpers.setLoading(true);
        this.getAll();
    }

    agregarBanco() {

        var modal = this.modalService.open(BancoAddComponent, config.modalConfig);
        modal.componentInstance.monedas = [];

        var data = {};

        this.apiService.addFilter(data, "poseeCuentasContables", true);

        this.apiService.get(endpoint.bancoUrl, data).subscribe(response => {
            modal.componentInstance.bancos = response.data;
        });

        this.apiService.get(endpoint.monedaUrl, {}).subscribe(response => {
            modal.componentInstance.monedas = response.data;
        });

        modal.componentInstance.notifyParent.subscribe(result => {
            this.getAll();
        });

    }

    getAll() {

        var data = {};

        if (this.fechaInicio && this.fechaFinal)
            //'yyyy-MM-dd'
            this.apiService.addFilter(data, "FechaCreacion", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaFinal).format('YYYY-MM-DD') + " 23:59:59");

        else if (this.fechaInicio)
            this.apiService.addFilter(data, "FechaCreacion", moment(this.fechaInicio).format('YYYY-MM-DD') + "|" + moment(this.fechaInicio).format('YYYY-MM-DD') + " 23:59:59");


        var promise = this.apiService.get(endpoint.depositsUrl + "Resumen", data);

        promise.subscribe(
            response => {
                this.bancos = response.data;
                this.collectionSize = response.count;
                Helpers.setLoading(false);
            },
            error => {
                Helpers.setLoading(false);
            }
        );

    }

    filterChange(data) {
        Helpers.setLoading(true);
        //this.apiService.addPagination(data, this.page, this.pageSize);
        var promise = this.apiService.get(endpoint.depositsUrl + "Resumen", data);
        promise.subscribe(
            response => {
                this.bancos = response.data;
                this.collectionSize = parseInt(response.count, 10) / this.pageSize;
                Helpers.setLoading(false);
            },
            error => {
                Helpers.setLoading(false);
            }
        );
    }
}