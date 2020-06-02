
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs";
import { AuthenticationService } from "../_services";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService, private authenticationService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {


        if (!this._userService.verify()) {
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            this.authenticationService.logout();
            return false;
        }

        return this._userService.getOne().pipe(map(
            data => {
                if (data !== null) {
                    // logged in so return true
                    return true;
                }
                // error when verify so redirect to login page with the return url
                this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                this.authenticationService.logout();
                return false;
            },
            error => {
                // error when verify so redirect to login page with the return url
                this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                this.authenticationService.logout();
                return false;
            }));
    }
}