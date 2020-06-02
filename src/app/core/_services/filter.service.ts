import { Injectable } from '@angular/core';
import { Filter } from '../_models/filter';

@Injectable()
export class FilterService {
    types = { SIMPLE: "SIMPLE", RANGE: "RANGE" };
    values = [];
    filters = [];
    seleccionado: any = {};


    constructor() {

    }

    setFilters(filters) {
        this.filters = filters;
        this.filters.forEach(function (filter) {
            filter.type = filter.type || this.types.SIMPLE;
        });
        this.seleccionado = this.filters[0];
    }
    getValue() {
        switch (this.seleccionado.type) {

            case "SIMPLE":
                return (this.seleccionado.operador || "") + this.values[0];//=
            case "RANGE":
                return this.values[0] + (this.seleccionado.operador || "|") + this.values[1];
            default: return false;
        }

    }

    getField() {
        return this.seleccionado.field;
    }

    public isType(type) {
        return this.seleccionado.type === type;
    }

    isValid() {
        switch (this.seleccionado.type) {
            case this.types.SIMPLE:
                return this.seleccionado.field && this.values[0];

            case this.types.RANGE:
                return this.seleccionado.field && this.values[0] && this.values[1];
        }
    }
}
