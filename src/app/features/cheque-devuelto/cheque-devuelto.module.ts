import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChequeDevueltoComponent } from "./cheque-devuelto.component";
import { RouterModule, Routes } from "@angular/router";
import { DefaultComponent } from "../../core/theme/pages/default/default.component";
import { AuthGuard } from "../../core/auth/_guards/auth.guard";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LayoutModule } from "../../core/theme/layouts/layout.module";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ChequeDevueltoThumbnailComponent } from "./cheque-devuelto-thumbnail/cheque-devuelto-thumbnail.component";
import { ChequeDevueltoFilterComponent } from "./cheque-devuelto-filter/cheque-devuelto-filter.component";
import { ChequeDevueltoAddComponent } from "./cheque-devuelto-add/cheque-devuelto-add.component";
import { ChequeDevueltoEditComponent } from "./cheque-devuelto-edit/cheque-devuelto-edit.component";

const routes: Routes = [
  {
    "path": "",
    "canActivate": [AuthGuard],
    "component": DefaultComponent,
    "children": [
      {
        "path": "",
        "component": ChequeDevueltoComponent,
      },
    ],


  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, SharedModule, LayoutModule
  ],
  declarations: [ChequeDevueltoComponent, ChequeDevueltoThumbnailComponent, ChequeDevueltoFilterComponent,
    ChequeDevueltoAddComponent, ChequeDevueltoEditComponent],
  entryComponents: [ChequeDevueltoAddComponent, ChequeDevueltoEditComponent]
})
export class ChequeDevueltoModule { }
