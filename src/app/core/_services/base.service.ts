import { Injectable } from '@angular/core';
import { IService } from './Interface/IService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

export class BaseService<TEntity, TKey> implements IService<TEntity, TKey> {

  protected pageZise = 5;

  public get baseUrl(): string {
    return this._baseUrl;
  }
  public set baseUrl(value: string) {
    this._baseUrl = value;
  }
  public httpOptions = {  
    headers: this.jwt()
  };

  constructor(protected _httpClient: HttpClient, private _baseUrl: string) { }

  getAll(): Observable<TEntity[]> {
    console.log(this._httpClient);
    return this._httpClient.get<TEntity[]>(this.baseUrl, this.httpOptions);
    //return  this.requestResolver(data);
  }

  getById(id: TKey): Observable<TEntity> {
    return this._httpClient.get<TEntity>(this.baseUrl +'/'+ id, this.httpOptions);
  }

  post(entity: TEntity): Observable<Object> {
    return this._httpClient.post(this.baseUrl, entity, this.httpOptions);
  }
  insertArray(entity: TEntity[]): Observable<Object> {
    return this._httpClient.post(this.baseUrl, entity, this.httpOptions);
  }

  patch(entity: TEntity, id: TKey): Observable<Object> {
    return this._httpClient
      .patch(this.baseUrl + id, entity);
  }

  put(entity: TEntity,): Observable<Object> {
    return this._httpClient
      .put(this.baseUrl, entity);
  }

  delete(id: TKey): Observable<Object> {
    return this._httpClient.delete(this.baseUrl+'/'+ id, this.httpOptions);
  }

  search(propertyName: string, term: string, pageSize: number): Observable<Object> {
    if (term === '') {
      return of([]);
    }

    let params = new HttpParams()
    .set('pagesize', `${pageSize}`)
    .set(`${propertyName}`, `${term}`)

    var data =this._httpClient.get(this.baseUrl, {params: params, headers: this.jwt()});
    return  this.requestResolver(data);
  }


  requestResolver(request: any) : Observable<TEntity[]> {
    let entity = from<TEntity[][]>(request.pipe(map (d=> d["data"])))

    if(!(entity)) {
      return entity;
    }

    return request;
   }

   public jwt() {
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
