import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DailyResource {
    private receivableUrl = `${environment.api}/daily-calcs`;

    constructor(private http: HttpClient) {
    }

    findOne(payload): Observable<any> {
        return this.http.post<any>(this.receivableUrl, payload);
    }
}
