
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { endpoint } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    }

    login(email: string, password: string) {
        return this.http.post(endpoint.authenticationUrl, JSON.stringify({ Username: email, Password: password })).pipe(
            map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response;

                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    localStorage.setItem('currentUser', JSON.stringify(user));
                    var data = this.jwtHelper.decodeToken();
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}