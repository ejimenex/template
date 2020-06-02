import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { BancoAddComponent } from "./banco-add.component";
import { BancoDetailComponent } from "./banco-detail.component";
import { bancoFilterComponent } from "./banco-filter.component";
import { BancoThumbnailComponent } from "./banco-thumbnail.component";
import { BancoListComponent } from "./banco-list.component";
import { DefaultComponent } from "../../core/theme/pages/default/default.component";
import { ApiService } from "../../core/_services/api.service";
import { LayoutModule } from "../../core/theme/layouts/layout.module";
import { AuthGuard } from "../../core/auth/_guards/auth.guard";
import { SharedModule } from '../../shared/shared.module';
import { BancoAnulacionComponent } from './banco-anular/banco-anular.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
    {
        "path": "",
        "canActivate": [AuthGuard],
        "component": DefaultComponent,
        "children": [
            {
                "path": "",
                "component": BancoListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, LayoutModule,
        SharedModule, ReactiveFormsModule
    ], exports: [
        RouterModule,
    ], declarations: [
        BancoListComponent, BancoAddComponent, BancoThumbnailComponent, bancoFilterComponent, BancoDetailComponent, BancoAnulacionComponent
    ],
    entryComponents: [BancoAddComponent, BancoDetailComponent, BancoAnulacionComponent],
    //providers: [ApiService]
})
export class BancoModule {
}