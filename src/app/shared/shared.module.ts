
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaxValueValidatorDirective } from "./input-validator/Validations/MaxValueValidatorDirective";
import { InputValidatorComponent } from "./input-validator/input-validator.component";
import { MinValueValidatorDirective } from "./input-validator/Validations/MinValueValidatorDirective";
import { ValidatorDisplayComponent } from "./validator-show/validator-display.component";
import { FormDirective } from "./form/form.directive";
import { InstruccionesListComponent } from "./instrucciones-list/instrucciones-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReportViewerComponent } from './reportviewer/reportviewer.component';
import { AsignCostumerComponent } from './asign-costumer/asign-costumer.component';
import { SaldoAFavorComponent } from './saldo-a-favor/saldo-a-favor.component';

@NgModule({
    imports: [CommonModule, NgbModule.forRoot(), FormsModule, ReactiveFormsModule],
    declarations: [InputValidatorComponent, MaxValueValidatorDirective, MinValueValidatorDirective,
        ValidatorDisplayComponent, FormDirective, InstruccionesListComponent, ReportViewerComponent,
        AsignCostumerComponent, SaldoAFavorComponent],
    exports: [InputValidatorComponent, MaxValueValidatorDirective, MinValueValidatorDirective, ValidatorDisplayComponent, FormDirective,
        CommonModule, FormsModule, InstruccionesListComponent, ReactiveFormsModule,
        NgbModule, ReportViewerComponent, AsignCostumerComponent, SaldoAFavorComponent,
    ]
})
export class SharedModule { }

