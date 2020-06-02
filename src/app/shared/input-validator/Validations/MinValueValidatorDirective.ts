import { IValidator } from './General/IValidator';
import { Input, OnInit } from '@angular/core';
import { Directive, ContentChild } from '@angular/core';
import { InputValidatorComponent } from '../input-validator.component';
import { IValidation } from './General/IValidation';

@Directive({ selector: 'input[min]' })
export class MinValueValidatorDirective implements OnInit, IValidator {
    @Input() min;
    @ContentChild(InputValidatorComponent, { static: true }) validator: InputValidatorComponent;
    validationMessage = "El valor no debe ser menor a: ";

    ngOnInit(): void {
        this.validator.onValidate.subscribe(t => {
            this.validate(t);
        });
    }

    validate(validation: IValidation) {
        var valid = +validation.value >= +this.min;
        if (valid) return;
        validation.errors.push(this.validationMessage + this.min);
    }

}

