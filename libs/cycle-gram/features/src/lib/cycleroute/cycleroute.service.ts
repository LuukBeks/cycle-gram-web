import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ApiResponse, ICycleRoute } from '@cycle-gram-web-main/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@cycle-gram-web/shared/util-env';
import { CycleRoute } from './cycleroute.model';
import { UserService } from '../user/user.service';

export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class CycleRouteService {
  private endpoint = 'http://localhost:3000/api/cycleroute';

  constructor(
    private http: HttpClient,
    private userService: UserService // Inject UserService
  ) {}

  public list(options?: any): Observable<ICycleRoute[] | null> {
    console.log(`list cycleroute ${this.endpoint}`);

    return this.http
      .get<ApiResponse<ICycleRoute[]>>(this.endpoint, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        map((response: any) => response.results as ICycleRoute[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public readAll(options?: any): Observable<CycleRoute[]> {
    console.log(`readAll ${this.endpoint}`);
    return this.http
      .get<ApiResponse<CycleRoute[]>>(`${this.endpoint}`, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as CycleRoute[]),
        catchError(this.handleError)
      );
  }
  
  public read(id: string | null, options?: any): Observable<ICycleRoute> {
    console.log(`read ${this.endpoint}/${id}`);
    return this.http
      .get<ApiResponse<ICycleRoute>>(`${this.endpoint}/${id}`, {
        ...options,
        observe: 'body',
        responseType: 'json',
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as ICycleRoute),
        catchError(this.handleError)
      );
  }

  public create(cycleroute: ICycleRoute): Observable<ICycleRoute> {
    console.log(`create ${this.endpoint}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<ApiResponse<ICycleRoute>>(this.endpoint, cycleroute, httpOptions)
      .pipe(
        tap(console.log),
        map((response: any) => response.results as ICycleRoute),
        catchError(this.handleError)
      );
  }

  public update(cycleroute: ICycleRoute): Observable<ICycleRoute> {
    return this.http
      .put<ApiResponse<ICycleRoute>>(`${this.endpoint}/${cycleroute.id}`, cycleroute)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public delete(cycleroute: ICycleRoute): Observable<ICycleRoute> {
    return this.http
      .delete<ApiResponse<ICycleRoute>>(`${this.endpoint}/${cycleroute.id}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public findUserByCycleRouteId(cycleRouteId: string): Observable<string | null> {
    return this.userService.list().pipe(
      map(users => {
        if (users) {
          const user = users.find(user => user.cycleRoutes && user.cycleRoutes.some(cycleRoute => cycleRoute.id === cycleRouteId));
          return user ? user.id : null;
        }
        return null;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in CycleRouteService', error);
    return throwError(() => new Error(error.message));
  }
}