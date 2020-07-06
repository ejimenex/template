import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ThemeComponent } from './core/theme/theme.component';
import { LogoutComponent } from './core/auth/logout/logout.component';
import { AuthGuard } from './core/auth/_guards/auth.guard';


const routes: Routes = [
    { path: "login", loadChildren: "./core/auth/auth.module#AuthModule" },
    { path: "logout", component: LogoutComponent },
    { path: "", redirectTo: "index", pathMatch: "full" },
    {
        path: "",
        component: ThemeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "index",
                loadChildren: ".\/core\/theme\/pages\/default\/blank\/blank.module#BlankModule",
            },
            {
                path: "depositos",
                loadChildren: ".\/features\/depositos\/deposito.module#DepositoModule",
            },
            {
                path: "archivosBanco",
                loadChildren: ".\/features\/bancos\/banco.module#BancoModule",
            },
            {
                path: "company",
               loadChildren: ".\/features\/company\/company.module#CompanyModule"
                //loadChildren: () => import('.\/features\/company\/company.module').then(m => m.CompanyModule)
            },
            {
                path:"export",
                loadChildren: ".\/features\/exportBanco\/export.module#ExportModule"
            },  
            {
                path: "",
                redirectTo: "index",
                pathMatch: "full",
            },
        ],
    },
    {
        path: "**",
        loadChildren: ".\/core\/theme\/pages\/default\/not-found\/not-found.module#NotFoundModule",
        pathMatch: "full",
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }