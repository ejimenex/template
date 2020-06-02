import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from '../../../layouts/layout.module';
import { DefaultComponent } from '../default.component';
import { NotFoundComponent } from './not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule,
  ], exports: [
    RouterModule,
  ], declarations: [
    NotFoundComponent, ErrorPageComponent
  ],
})
export class NotFoundModule {
}