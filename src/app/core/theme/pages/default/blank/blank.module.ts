import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../auth/_guards';
import { DefaultComponent } from '../default.component';
import { BlankComponent } from './blank.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../../layouts/layout.module';
import { SharedModule } from '../../../../../shared/shared.module';


const routes: Routes = [
    {
        'path': '',
        'canActivate': [AuthGuard],
        'component': DefaultComponent,
        'children': [
            {
                'path': '',
                'component': BlankComponent,
            }
        ],
    },
];

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes), LayoutModule
    ], exports: [
        RouterModule,
    ], declarations: [
        BlankComponent
    ],
})
export class BlankModule {
}