import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as Models from '../data_models/openf1.models'
import { Observable, timeout } from 'rxjs';

// TODO: REMOVE THIS.  For debugging.
import { Console } from 'console';

export class OpenF1Client {
    private readonly httpClient = inject(HttpClient);

    // Generic Get method for easy interactions with the OpenF1 API.
    get<T>(endpoint: string, query: Record<string, number>) {
        const rateLimit = 25_000;
        const uri = `/api/openf1/${endpoint}`;

        var resp = this.httpClient.get<T[]>(uri, { params: new HttpParams({ fromObject: query }) })

        return resp.pipe(
            timeout(rateLimit)
        );
    }

    // Test use of the Get method.
    // sessions(year: number): Observable<Models.Session[]> {
    //     var sessionsResp = this.get<Models.Session>('sessions', { year });
    //     Console.Log(sessionsResp);
    // }
}