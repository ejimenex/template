import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ApiService } from '../../core/_services/api.service';
import { endpoint } from '../../../environments/environment';

@Component({
  selector: 'app-saldo-a-favor',
  templateUrl: './saldo-a-favor.component.html'
})
export class SaldoAFavorComponent implements OnInit, OnChanges {

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }
  @Input('clienteId') clienteId: number = undefined;

  ngOnChanges(changes: SimpleChanges) {
    const clienteId: SimpleChange = changes.clienteId;
    this.cargarSaldo(clienteId.currentValue);
  }

  saldoDop: number = 0;
  saldoUsd: number = 0;
  depositos: any[];

  cargarSaldo(clienteId: any): void {

    if (clienteId == undefined || clienteId == null) {
      return;
    }

    let fields = ['moneda', 'monto_Pendiente', 'id_Cliente'];
    let filtro = {};
    this.apiService.addFilter(filtro, "Estatus", "D");
    this.apiService.addFilter(filtro, "id_Cliente", clienteId);
    this.apiService.addSelection(filtro, fields);

    this.apiService.get(endpoint.transaccionUrl, filtro).subscribe(response => {
      this.depositos = response.data;
      this.saldoDop = this.getSaldo('DOP');
      this.saldoUsd = this.getSaldo('USD');
    });

  }

  getSaldo(moneda: string): number {
    if (this.depositos.length > 0) {
      return this.depositos.filter(x => x.moneda === moneda).map(x => x.monto_Pendiente).reduce(this.sumar);
    }
    else {
      return 0;
    }
  }

  sumar(a: number, b: number): number {
    return a + b;
  }

}
