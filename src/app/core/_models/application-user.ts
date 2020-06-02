export class ApplicationUser {
    static currentUser: ApplicationUser;
    username: string;
    displayName: string;
    roles: string[];
}
