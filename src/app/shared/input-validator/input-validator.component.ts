import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ContentChild } from '@angular/core';
import { IValidation } from './Validations/General/IValidation';
import { IFormValidation } from '../form/IFormValidation';


@Component({
    selector: 'input:not([type="checkbox"]),[app-input]',
    templateUrl: './input-validator.component.html'
})
export class InputValidatorComponent implements OnInit, AfterViewInit {
    errors: string[] = [];
    @ContentChild(NgModel, { static: false }) input: NgModel;
    @ViewChild('validations', { static: true }) validationsContainer: ElementRef;

    onValidate = new EventEmitter<IValidation>();
    onFormValidate = new EventEmitter<IFormValidation>();

    constructor(private elementRef: ElementRef) {

    }

    ngAfterViewInit(): void {
        if (!this.input) { return; }
        this.input.update.subscribe((value) => {
            this.errors = [];
            let field = this.input.name;
            if (value == null) { return; }
            this.onValidate.emit({ value, errors: this.errors, field });
            this.onFormValidate.emit({ hasError: this.errors.length > 0, field: field })

        });
        $(this.elementRef.nativeElement).after(this.validationsContainer.nativeElement);
    }
    ngOnInit() {

    }
}

