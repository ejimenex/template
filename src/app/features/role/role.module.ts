import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LayoutModule } from "../../core/theme/layouts/layout.module";
import { AuthGuard } from "../../core/auth/_guards/auth.guard";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RoleAddComponent} from './add/role-add.component';
import { RoleListComponent} from './list/role-list.component';
import { RoleService} from '../../core/_services/role.service';
import { RoleRoutingModule} from './role.route';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        LayoutModule,
        CommonModule,
        RoleRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
    exports: [RouterModule],
    declarations: [RoleListComponent, RoleAddComponent],
    providers: [RoleService]
})
export class RoleModule{ 
  
}
