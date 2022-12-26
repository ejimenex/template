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

    checkClaim(option: string) {
        return true;
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        switch(option) {
            case 'Cancel':
            case 'See':
            case 'Download':
            case 'Upload':
            case 'Parameter':
            case 'ImportBankFile':
            case 'ExportBankFile':
            case 'DetailBankFile':
                let result = currentUser.claims.indexOf(option);
                if(result != -1) return true;
                else return false;
            break;
                                        
            default:
                return true;
        }
    }

}