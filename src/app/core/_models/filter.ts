export class Filter {
    types = { SIMPLE: "SIMPLE", RANGE: "RANGE" };
    values = [];
    filters = [];
    seleccionado: any = {};


    constructor() {

    }
    public isType(type) {
        return this.seleccionado.type === type;
    }
}