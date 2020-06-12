import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CompanyListComponent } from "./list/company.list.component";
import { CompanyAddComponent } from "./add/company.add.component";
import { DefaultComponent } from "../../core/theme/pages/default/default.component";
import { CompanyService } from "../../core/_services/company.service";
import { LayoutModule } from "../../core/theme/layouts/layout.module";
import { AuthGuard } from "../../core/auth/_guards/auth.guard";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CompanyRoutingModule } from "./company.route";

@NgModule({
    
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    LayoutModule,
    CompanyRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  declarations: [CompanyAddComponent, CompanyListComponent],
  entryComponents: [CompanyAddComponent],
  providers: [CompanyService],
})
export class CompanyModule {}
