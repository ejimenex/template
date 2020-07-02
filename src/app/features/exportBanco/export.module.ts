import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { ExportListComponent } from "./list/export-list.component";
import { DefaultComponent } from "../../core/theme/pages/default/default.component";
import { ApiService } from "../../core/_services/api.service";
import { LayoutModule } from "../../core/theme/layouts/layout.module";
import { AuthGuard } from "../../core/auth/_guards/auth.guard";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BankService } from "../../core/_services/bank.service";
import { CurrencyService } from "../../core/_services/currency.service";
import { FileExportService } from "../../core/_services/file-export.service";

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: DefaultComponent,
    children: [
      {
        path: "",
        component: ExportListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [  
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    LayoutModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  declarations: [
    ExportListComponent
  ], providers: [
    BankService,
    CurrencyService,
    FileExportService
  ]
})
export class ExportModule { }
