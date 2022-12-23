
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaxValueValidatorDirective } from "./input-validator/Validations/MaxValueValidatorDirective";
import { InputValidatorComponent } from "./input-validator/input-validator.component";
import { MinValueValidatorDirective } from "./input-validator/Validations/MinValueValidatorDirective";
import { ValidatorDisplayComponent } from "./validator-show/validator-display.component";
import { FormDirective } from "./form/form.directive";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReportViewerComponent } from './reportviewer/reportviewer.component';

@NgModule({
    imports: [CommonModule, NgbModule.forRoot(), FormsModule, ReactiveFormsModule],
    declarations: [InputValidatorComponent, MaxValueValidatorDirective, MinValueValidatorDirective,
        ValidatorDisplayComponent, FormDirective,  ReportViewerComponent,
         ],
    exports: [InputValidatorComponent, MaxValueValidatorDirective, MinValueValidatorDirective, ValidatorDisplayComponent, FormDirective,
        CommonModule, FormsModule,  ReactiveFormsModule,
        NgbModule, ReportViewerComponent,  
    ]
})
export class SharedModule { }

