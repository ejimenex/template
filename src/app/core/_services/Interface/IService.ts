import { Observable } from 'rxjs';

export interface IService<TEntity, TKey> {
  baseUrl: string;
  getAll(): Observable<TEntity[]>;
  getById(id: TKey): Observable<TEntity>;
  post(entity: TEntity): Observable<Object>;
  patch(entity: TEntity, id: TKey): Observable<Object>;
  put(entity: TEntity): Observable<Object>
  delete(id: TKey): Observable<Object>;
  search(propertyName: string, term: string,pageSize: number): Observable<Object>;
}
