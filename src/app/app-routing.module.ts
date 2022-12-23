import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ThemeComponent } from './core/theme/theme.component';
import { LogoutComponent } from './core/auth/logout/logout.component';
import { AuthGuard } from './core/auth/_guards/auth.guard';



const routes: Routes = [
    { path: "login", loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule) },
    { path: "logout", component: LogoutComponent },
    { path: "", redirectTo: "index", pathMatch: "full" },
    {
        path: "",
        component: ThemeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "index",
                loadChildren: () => import('./core/theme/pages/default/blank/blank.module').then(m => m.BlankModule),
            },
          
            
            {
                path: "role",
                loadChildren: () => import('./features/role/role.module').then(m => m.RoleModule)
            },
            {
                path: "user",
                loadChildren: () => import('./features/users/user.module').then(m => m.UserModule)
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
        loadChildren: () => import('./core/theme/pages/default/not-found/not-found.module').then(m => m.NotFoundModule),
        pathMatch: "full",
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }