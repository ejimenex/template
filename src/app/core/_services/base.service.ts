import { Injectable } from '@angular/core';
import { IService } from './Interface/IService';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

export class BaseService<TEntity, TKey> implements IService<TEntity, TKey> {

  protected pageZise = 5;

  public get baseUrl(): string {
    return this._baseUrl;
  }
  public set baseUrl(value: string) {
    this._baseUrl = value;
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected _httpClient: HttpClient, private _baseUrl: string) { }

  getAll(): Observable<TEntity[]> {
    return this._httpClient.get<TEntity[]>(this.baseUrl);
    //return  this.requestResolver(data);
  }

  getById(id: TKey): Observable<TEntity> {
    return this._httpClient.get<TEntity>(this.baseUrl + id);
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
    return this._httpClient.delete(this.baseUrl + id);
  }

  search(propertyName: string, term: string, pageSize: number): Observable<Object> {
    if (term === '') {
      return of([]);
    }

    let params = new HttpParams()
    .set('pagesize', `${pageSize}`)
    .set(`${propertyName}`, `${term}`)

    var data =this._httpClient.get(this.baseUrl, {params: params});
    return  this.requestResolver(data);

  }


  requestResolver(request: any) : Observable<TEntity[]> {
    let entity = from<TEntity[][]>(request.pipe(map (d=> d["data"])))

    if(!isNullOrUndefined(entity)) {
      return entity;
    }

    return request;
   }
}
