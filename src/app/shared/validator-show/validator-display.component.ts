
import { Component, Input } from "@angular/core";

@Component({
    selector: 'validator-display',
    templateUrl: './validator-display.component.html'
})

export class ValidatorDisplayComponent {

    @Input("error")
    public set value(val: string) {
        this.error = val;
        this.transform();
    }
    error: any;

    errors: any = [];

    transform() {

        let message: string[] = [];

        for (let property in this.error) {
            if (this.error.hasOwnProperty("required")) {
                message.push("Este campo es requerido");
            }
            else if (this.error.hasOwnProperty("min")) {
                message.push("El valor no debe ser mayor a: " + this.error.min.min);
            }

            else if (this.error.hasOwnProperty(property)) {


                message.push(this.error[property]);

            }
            else {

            }
        }
        this.errors = message;
        return message;
    }

}