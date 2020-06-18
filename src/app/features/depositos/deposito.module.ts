
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AuthGuard } from "../../core/auth/_guards";
import { DepositoAnulacionComponent } from "./deposito-anular.component";
import { DepositoCommentComponent } from "./deposito-comment.component";
import { DepositoFilterComponent } from "./filter/deposito-filter.component";
import { DetailThumbnailComponent } from "./detail/detail.thumbnail.component";
import { DetailBankFileComponent } from "./list/detailBankFile.component";
import { DefaultComponent } from "../../core/theme/pages/default/default.component";
import { LayoutModule } from '../../core/theme/layouts/layout.module';
import { DepositoDetailAnulacionComponent } from './deposito-detail-anulacion/deposito-detail-anulacion.component';
import { BankFilesDetailService } from '../../core/_services/bankFilesDetail.service';
import { BankService } from '../../core/_services/bank.service';
import { CurrencyService } from '../../core/_services/currency.service';
import { CompanyService } from '../../core/_services/company.service';




const routes: Routes = [
    {
        "path": "",
        "canActivate": [AuthGuard],
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": DetailBankFileComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, LayoutModule
    ], exports: [
        RouterModule,
    ], declarations: [
        DetailBankFileComponent, DetailThumbnailComponent, DepositoFilterComponent, DepositoCommentComponent,
        DepositoAnulacionComponent, DepositoDetailAnulacionComponent
    ],
     providers: [BankFilesDetailService,BankService,CurrencyService,CompanyService],
    entryComponents: [DepositoCommentComponent,  DepositoAnulacionComponent, DepositoDetailAnulacionComponent]
})
export class DepositoModule {
}