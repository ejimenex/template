import { IValidator } from './General/IValidator';
import { Input, OnInit } from '@angular/core';
import { Directive, ContentChild } from '@angular/core';
import { InputValidatorComponent } from '../input-validator.component';
import { IValidation } from './General/IValidation';

@Directive({ selector: 'input[max]' })
export class MaxValueValidatorDirective implements OnInit, IValidator {
    @Input() max;
    @ContentChild(InputValidatorComponent, { static: true }) validator: InputValidatorComponent;
    validationMessage = "El valor no debe ser mayor a: ";
    constructor() {

    }

    ngOnInit(): void {
        this.validator.onValidate.subscribe(t => {
            this.validate(t);
        });
    }

    validate(validation: IValidation) {
        var valid = +validation.value <= +this.max;
        if (valid) return;
        validation.errors.push(this.validationMessage + this.max);
    }

}

