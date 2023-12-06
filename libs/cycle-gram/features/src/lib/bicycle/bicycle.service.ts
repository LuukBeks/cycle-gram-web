import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ApiResponse, IBicycle } from '@cycle-gram-web-main/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@cycle-gram-web/shared/util-env';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class BicycleService {
  endpoint = `${environment.backendUrl}/bicycle`;

  constructor(private readonly http: HttpClient) {}

  public list(options?: any): Observable<IBicycle[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IBicycle[]>>(this.endpoint, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        map((response: any) => response.results as IBicycle[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IBicycle> {
    console.log(`read ${this.endpoint}/${id}`);
    return this.http
      .get<ApiResponse<IBicycle>>(`${this.endpoint}/${id}`, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IBicycle),
        catchError(this.handleError)
      );
  }

  public create(bicycle: IBicycle): Observable<IBicycle> {
    console.log(`create ${this.endpoint}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<ApiResponse<IBicycle>>(this.endpoint, bicycle, httpOptions)
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IBicycle),
        catchError(this.handleError)
      );
  }

  public update(bicycle: IBicycle): Observable<IBicycle> {
    return this.http
      .put<ApiResponse<IBicycle>>(`${this.endpoint}/${bicycle.id}`, bicycle)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public delete(bicycle: IBicycle): Observable<IBicycle> {
    return this.http
      .delete<ApiResponse<IBicycle>>(`${this.endpoint}/${bicycle.id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in BicycleService', error);
    return throwError(() => new Error(error.message));
  }
}