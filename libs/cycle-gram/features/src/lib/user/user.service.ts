// user.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@cycle-gram-web/shared/util-env';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IUser, ApiResponse } from '@cycle-gram-web-main/shared/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly endpoint = `${environment.backendUrl}/user`;
  private readonly jwtHelper = new JwtHelperService();
  private readonly tokenKey = 'auth_token'; // <-- Add this property

  constructor(private readonly http: HttpClient, private router: Router) {}

  public list(options?: any): Observable<IUser[] | null> {
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IUser[]>>(this.endpoint, {
        ...options,
        observe: 'body',
        responseType: 'json',
        headers: this.createAuthHeaders(),
      })
      .pipe(
        map((response: any) => response.results as IUser[]),
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IUser> {
    console.log(`read ${this.endpoint}/${id}`);
    return this.http
      .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
        ...options,
        observe: 'body',
        responseType: 'json',
        headers: this.createAuthHeaders(),
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  public create(user: IUser): Observable<IUser> {
    console.log(`create ${this.endpoint}`);

    return this.http
      .post<ApiResponse<IUser>>(this.endpoint, user, {
        observe: 'body',
        responseType: 'json',
        headers: this.createAuthHeaders(),
      })
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser),
        catchError(this.handleError)
      );
  }

  public update(user: IUser): Observable<IUser> {
    return this.http
      .put<ApiResponse<IUser>>(`${this.endpoint}/${user.id}`, user, {
        observe: 'body',
        responseType: 'json',
        headers: this.createAuthHeaders(),
      })
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public delete(user: IUser): Observable<IUser> {
    return this.http
      .delete<ApiResponse<IUser>>(`${this.endpoint}/${user.id}`, {
        observe: 'body',
        responseType: 'json',
        headers: this.createAuthHeaders(),
      })
      .pipe(tap(console.log), catchError(this.handleError));
  }
  
  public login(credentials: { email: string; password: string }): Observable<IUser | null> {
    const endpoint = `${this.endpoint}/login`;
    
    return this.http.post<{ results: IUser }>(endpoint, credentials).pipe(
      map((response) => {
        if (response && response.results && response.results.token) {
          localStorage.setItem(this.tokenKey, response.results.token);
          return response.results;
        } else {
          console.error('Invalid response structure:', response);
          return null;
        }
      }),
      catchError(this.handleError)
    );
  }

  public logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem(this.tokenKey);

  }

  public isAuthenticated(): boolean {
    const token = this.getAuthToken();
  
    if (!token) {
      // Token is missing
      return false;
    }
  
    try {
      // Attempt to decode and check expiration
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      // Token is invalid
      console.error('Error decoding token:', error);
      return false;
    }
  }

  private getAuthToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    return token;
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  public getLoggedInUserId(): string | null {
    const token = this.getAuthToken();
    if (!token) {
      return null;
    }
  
    try {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      console.log('Decoded token:', decodedToken.sub);

      return decodedToken.sub; // Use the correct field name
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  public getLoggedInUser(): IUser | null {
    const token = this.getAuthToken();
    if (!token) {
      return null;
    }
  
    try {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      console.log('Decoded token:', decodedToken.sub);

      return decodedToken.sub; // Use the correct field name
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in UserService', error);
    return throwError(() => new Error(error.message));
  }
  
}
