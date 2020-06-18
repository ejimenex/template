
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AuthGuard } from "../../core/auth/_guards";
import { DepositoAnulacionComponent } from "./deposito-anular.component";
import { DepositoCommentComponent } from "./deposito-comment.component";
import { DepositoCostumerComponent } from "./deposito-costumer.component";
import { DepositoFilterComponent } from "./deposito-filter.component";
import { DetailThumbnailComponent } from "./detail/detail.thumbnail.component";
import { DetailBankFileComponent } from "./list/detailBankFile.component";
import { DefaultComponent } from "../../core/theme/pages/default/default.component";
import { LayoutModule } from '../../core/theme/layouts/layout.module';
import { DepositoDetailAnulacionComponent } from './deposito-detail-anulacion/deposito-detail-anulacion.component';
import { BankFilesDetailService } from '../../core/_services/bankFilesDetail.service';




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
        DetailBankFileComponent, DetailThumbnailComponent, DepositoFilterComponent, DepositoCommentComponent, DepositoCostumerComponent,
        DepositoAnulacionComponent, DepositoDetailAnulacionComponent
    ],
     providers: [BankFilesDetailService],
    entryComponents: [DepositoCommentComponent, DepositoCostumerComponent, DepositoAnulacionComponent, DepositoDetailAnulacionComponent]
})
export class DepositoModule {
}