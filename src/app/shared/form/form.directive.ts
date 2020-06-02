import { Directive, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AfterViewInit } from '@angular/core';
import { ContentChild } from '@angular/core';
import { InputValidatorComponent } from '../input-validator/input-validator.component';
import { IFormValidation } from './IFormValidation';
import { Input } from "@angular/core";
import { Output } from "@angular/core";
import { AlertService } from "../../core/_services/alert.service";


@Directive({
    selector: "form([onSubmit])",
    exportAs: "appForm"
})

export class FormDirective implements AfterViewInit {
    @ContentChild(NgForm, { static: false }) form: NgForm;
    @ContentChildren(InputValidatorComponent) inputs: QueryList<InputValidatorComponent>;
    @Input() validations: any;
    @Input() url: string;
    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();


    constructor(private alert: AlertService) {

    }

    ngAfterContentInit() {
        this.inputs.changes.subscribe((list) => {
            list._results.filter(e => e.onFormValidate.observers.length == 0).forEach(element => {
                element.onFormValidate.subscribe((x) => this.validate(x))
            });

        });
    }

    validate(formValidation: IFormValidation) {

        setTimeout(() => {
            if (formValidation.hasError) {
                this.form.controls[formValidation.field].setErrors({ "invalid": formValidation.hasError });
            }
        }, 5);
    }

    ngAfterViewInit() {

        this.form.ngSubmit.subscribe(() => { this.submit(); });

        // this.inputs.forEach(e => e.onFormValidate.subscribe((e) => this.validate(e)));
    }

    submit() {
        //Mark Controls as Dirty

        Object.keys(this.form.controls).forEach(e => this.form.controls[e].markAsDirty())
        if (this.form.invalid) {
            this.alert.error("Favor verificar los campos indicados");
            return;
        }
        if (this.validations) {
            let validation = this.validations(this.form.value);
            if (!validation.valid) {
                this.alert.error(validation.message, "Error");
                return;
            }
        }
        else {
            this.onSubmit.emit(this.form.value);
        }

    }
}


