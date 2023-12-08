import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ApiResponse, ICycleEvent } from '@cycle-gram-web-main/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@cycle-gram-web/shared/util-env';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class CycleEventService {
  endpoint = `${environment.backendUrl}/cycleevent`;

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<ICycleEvent[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<ICycleEvent[]>>(this.endpoint, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        map((response: any) => response.results as ICycleEvent[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<ICycleEvent> {
    console.log(`read ${this.endpoint}/${id}`);
    return this.http
      .get<ApiResponse<ICycleEvent>>(`${this.endpoint}/${id}`, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as ICycleEvent),
        catchError(this.handleError)
      );
  }

  public create(cycleevent: ICycleEvent): Observable<ICycleEvent> {
    console.log(`create ${this.endpoint}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<ApiResponse<ICycleEvent>>(this.endpoint, cycleevent, httpOptions)
      .pipe(
        tap(console.log),
        map((response: any) => response.results as ICycleEvent),
        catchError(this.handleError)
      );
  }

  public update(cycleevent: ICycleEvent): Observable<ICycleEvent> {
    return this.http
      .put<ApiResponse<ICycleEvent>>(`${this.endpoint}/${cycleevent.id}`, cycleevent)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public delete(cycleevent: ICycleEvent): Observable<ICycleEvent> {
    return this.http
      .delete<ApiResponse<ICycleEvent>>(`${this.endpoint}/${cycleevent.id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in CycleEventService', error);
    return throwError(() => new Error(error.message));
  }
}