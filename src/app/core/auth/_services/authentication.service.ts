
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { endpoint } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertService } from '../../_services/alert.service';

@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private _AlertService: AlertService) {
    }

    login(email: string, password: string) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

        return new Observable((subscriber) =>
            this.http.post(endpoint.authenticationUrl, JSON.stringify({ userName: email, password: password }), {headers: headers}).
                subscribe((response) => {                    
                    // login successful if there's a jwt token in the response
                    let user = response;

                    if (user) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes

                        localStorage.setItem('currentUser', JSON.stringify(user));                        
                        var data = this.jwtHelper.decodeToken();
                    }
                    subscriber.next(true);
                },
                (err) => {
                    subscriber.error(err);
                }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}