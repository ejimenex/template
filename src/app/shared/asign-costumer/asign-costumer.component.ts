import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { switchMap, debounceTime, distinctUntilChanged, tap, catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../core/_services/api.service';
import { AlertService } from '../../core/auth/_services';
import { endpoint } from '../../../environments/environment';

@Component({
  selector: 'app-asign-costumer',
  templateUrl: './asign-costumer.component.html'
})
export class AsignCostumerComponent implements OnInit {

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  id: string;
  clienteId: string = null;
  cliente: any;
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

  asignarCliente() {
    if (!this.cliente.id) return;

    let data = { item: this.cliente };

    this.notifyParent.emit(data);
    this.activeModal.close();


  }

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
        this.apiService.get(endpoint.clienteUrl + "??Fields=Nombre,Id,Documento,Codigo&pagesize=6", { documento: "'" + term }).pipe(map(x => x.data))),
      tap(() => this.searchFailed = false),
      catchError(() => {
        this.searchFailed = true;
        return [];
      }),
      tap(() => this.searching = false))


}
