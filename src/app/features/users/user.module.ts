import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LayoutModule } from "../../core/theme/layouts/layout.module";
import { AuthGuard } from "../../core/auth/_guards/auth.guard";
import { SharedModule } from "../../shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserAddComponent} from './add/user-add.component';
import { UserListComponent} from './list/user-list.component';
import { UserService} from '../../core/_services/user.service';
import { UserRoutingModule} from './user.route';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    LayoutModule,
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule], 
  declarations: [UserListComponent, UserAddComponent],
  entryComponents: [UserListComponent, UserAddComponent],
  providers: [UserService],
})
export class UserModule { 
  
}
