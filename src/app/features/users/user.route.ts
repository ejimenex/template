import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './list/user-list.component';
import { DefaultComponent } from '../../core/theme/pages/default/default.component';


const routes: Routes = [
    {
      path: "",
      component: DefaultComponent,
      children: [
          {
              path: "",
              component: UserListComponent,
          },
      ],
    }
  ];


  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule {}
  



