import { ApplicationUser } from '../_models/application-user';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenService {
    constructor(public jwtHelper: JwtHelperService) { }

    public setToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    public removeCurrentToken() {
        localStorage.removeItem('access_token');
    }

    public isCurrentTokenValid(): boolean {
        const token = this.jwtHelper.tokenGetter();
        return token && !this.jwtHelper.isTokenExpired();
    }

    public getUserToken(): ApplicationUser {
        if (!this.jwtHelper.tokenGetter()) {
            return null;
        }
        const tokenPayload = this.jwtHelper.decodeToken();
        if (!tokenPayload) {
            return null;
        }
        const user = new ApplicationUser();
        user.displayName = tokenPayload.displayName;
        user.roles = tokenPayload.roles;
        user.username = tokenPayload.username;
        return user;
    }

    public getPermissions(): string[] {
        if (!this.jwtHelper.tokenGetter()) {
            return [];
        }
        const tokenPayload = this.jwtHelper.decodeToken();
        if (!tokenPayload) {
            return [];
        }
        const permissions = tokenPayload.permissions as string[];
        return permissions;
    }
}
