import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './list/company.list.component';
import { DefaultComponent } from '../../core/theme/pages/default/default.component';
const routes: Routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
        {
            path: "",
            component: CompanyListComponent,
        },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
