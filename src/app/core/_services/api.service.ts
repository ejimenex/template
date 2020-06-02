
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class ApiService {
    private config: any;

    constructor(protected _http: HttpClient) {
        this.config = { headers: this.jwt() };
    }

    get(url, data): Observable<any> {

        let datos = {};
        datos["params"] = data
        datos["headers"] = this.jwt();
        return this._http.get(url, datos);
    }

    addPagination(data: any, page: number, pageSize: number): any {
        data.page = page;
        data.pageSize = pageSize;
        return data;
    }

    addFilter(data: any, property, value): any {
        if (value != null) {
            data[property] = value;
        }
        return data;
    }

    orderBy(data: any, fields, descending) {
        if (fields) {
            data["orderBy"] = fields.join();
            data.descending = descending == true;
        }
        return data;
    }

    addSelection(data: any, values) {
        if (values != null && values.length > 0) {
            data.fields = values.join();
        }
        return data;
    }

    post(url, data): Observable<any> {
        return this._http.post(url, data, this.config);
    }

    delete(url, data): Observable<any> {
        data["headers"] = this.jwt();
        return this._http.delete(url, data);
    }

    put(url, data): Observable<any> {
        return this._http.put(url, data, this.config);
    }

    patch(url, data) {
        return this._http.patch(url, data, this.config);
    }

    patchReplace(url, obj) {
        var data = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                data.push({ op: "replace", path: "/" + key, value: obj[key] });
        }
        return this.patch(url, data);
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
