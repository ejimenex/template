import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import {AlertService} from '../../../_services/alert.service';


declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {

    reciboPagoFull: string;
    mantenimientoUrl: string;

    constructor(private alertService:AlertService) {
        
    }
    ngOnInit() {

    }
    ngAfterViewInit() {
        mLayout.initAside();

    }
    exit(){
        this.alertService.question(()=>{location.href='/logout'},'Esta seguro que desea salir de la aplicación?')
    }

}