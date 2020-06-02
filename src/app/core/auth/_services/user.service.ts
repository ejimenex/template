
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { User } from "../_models";
import { TokenService } from "../../_services/token.service";
import { endpoint } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UserService {

    private config: any;
    constructor(private http: HttpClient, private tokenService: TokenService) {
        this.config = { headers: this.jwt() };
    }

    verify(): boolean {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return currentUser != null && this.tokenService.isCurrentTokenValid();

    }

    getOne() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            return this.http.get(endpoint.usuariosUrl + "?codigo=" + currentUser.code, this.config);
        }
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.config);
    }

    forgotPassword(email: string) {
        return this.http.post('/api/forgot-password', JSON.stringify({ email }), this.config);
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.accessToken) {

            let headers = new HttpHeaders({
                "Authorization": "Bearer " + currentUser.accessToken,
                "ApplicationUser": currentUser.userName,
                "Content-Type": "application/json"
            });

            return headers;
        }
    }
}