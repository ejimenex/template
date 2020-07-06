import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleAddComponent } from './add/role-add.component';
import { RoleListComponent } from './list/role-list.component';
import { DefaultComponent } from '../../core/theme/pages/default/default.component';


const routes: Routes = [
    {
      path: "",
      component: DefaultComponent,
      children: [
          {
              path: "",
              component: RoleListComponent,
          },
      ],
    }
  ];


  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RoleRoutingModule {}
  



