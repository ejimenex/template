
import { Injectable } from '@angular/core';
import { Helpers } from '../../helpers';
declare var swal: any;
@Injectable()
export class AlertService {
    constructor() { }
    error(message: any, title?: string): Promise<any> {
        Helpers.setLoading(false);
        return swal({
            title: title || 'Error',
            text: message.error || message,
            confirmButtonColor: '#EF5350',
            type: 'error'
        });
    }
    info(message: string, title?: string): Promise<any> {
        return swal({
            title: title || 'Info',
            text: message,
            confirmButtonColor: '#2196F3',
            type: 'info'
        });
    }
    warning(message: string, title?: string): Promise<any> {
        return swal({
            title: title || 'Peligro',
            text: message,
            confirmButtonColor: '#FF7043',
            type: 'warning'
        });
    }
    success(message: string, title?: string): Promise<any> {
        Helpers.setLoading(false);
        return swal({
            title: title || 'Realizado',
            text: message,
            confirmButtonColor: '#66BB6A',
            type: 'success'
        });
    }
    question(ok: () => void, message: string, title?: string) {
        swal(
            {
                title: title || '¿Está seguro?',
                text: message,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#EF5350',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                showLoaderOnConfirm: true,
                closeOnConfirm: false,
                closeOnCancel: true
            }).then(function (isConfirm) {
                if (isConfirm.value) {
                    ok();
                }
            });
    }
}
