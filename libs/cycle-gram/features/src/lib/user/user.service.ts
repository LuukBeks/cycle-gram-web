import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@cycle-gram-web-main/shared/api'; // Updated import
import { Injectable } from '@angular/core';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
    observe: 'body',
    responseType: 'json',
};

/**
 *
 *
 */
@Injectable()
export class UserService { // Updated service class name
    endpoint = 'http://localhost:3000/api/user'; // Updated endpoint

    constructor(private readonly http: HttpClient) {}

    /**
     * Get all items.
     *
     * @options options - optional URL queryparam options
     */
    public list(options?: any): Observable<IUser[] | null> { // Updated interface
        console.log(`list ${this.endpoint}`);

        return this.http
            .get<ApiResponse<IUser[]>>(this.endpoint, { // Updated interface
                ...options,
                ...httpOptions,
            })
            .pipe(
                map((response: any) => response.results as IUser[]), // Updated interface
                tap(console.log),
                catchError(this.handleError)
            );
    }

    /**
     * Get a single item from the service.
     *
     */
    public read(id: string | null, options?: any): Observable<IUser> { // Updated interface
        console.log(`read ${this.endpoint}`);
        return this.http
            .get<ApiResponse<IUser>>(this.endpoint, { // Updated interface
                ...options,
                ...httpOptions,
            })
            .pipe(
                tap(console.log),
                map((response: any) => response.results as IUser), // Updated interface
                catchError(this.handleError)
            );
    }

    /**
     * Handle errors.
     */
    public handleError(error: HttpErrorResponse): Observable<any> {
        console.log('handleError in UserService', error);

        return throwError(() => new Error(error.message));
    }
}
