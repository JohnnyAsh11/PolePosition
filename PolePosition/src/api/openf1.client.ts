import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import * as Models from './openf1.models'
import { catchError, map, Observable, of, throwError, timeout } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenF1Client {
    private readonly httpClient = inject(HttpClient);

    // Generic Get method for easy interactions with the OpenF1 API.
    get<T>(endpoint: string, query: Record<string, number>) {
        const rateLimit = 25_000;
        const uri = `https://api.openf1.org/v1/${endpoint}`;

        var resp = this.httpClient.get<T[]>(uri, { params: new HttpParams({ fromObject: query }) })

        return resp.pipe(
            // Timeout according to the rate limit of the OpenF1 API.
            timeout(rateLimit),

            // Ensuring the response data it is valid.
            map((data) => {
                if (!Array.isArray(data)) {
                    throw new Error("The API returned an unexpected response.");
                }
                return data;
            }),

            // Performing smooth error handling.
            catchError((error: unknown) => {
                if (error instanceof HttpErrorResponse &&
                    error.status === 404 && 
                    error.error?.detail === 'No results found.') {
                    return of<T[]>([]);
                }
                return throwError(() => error);
            })
        );
    }

    // Test use of the Get method.
    sessions(year: number): Observable<Models.Session[]> {  
        var sessionsResp = this.get<Models.Session>('sessions', { year });

        sessionsResp = sessionsResp.pipe(
            map((rows) => rows.sort((a, b) => Date.parse(b.date_start) - Date.parse(a.date_start))),
        );

        return sessionsResp;
    }
}