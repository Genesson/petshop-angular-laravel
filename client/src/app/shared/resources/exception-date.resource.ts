import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ExceptionDateModel} from '../models/exception-date.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExceptionDateResource {
    private exceptionDatesUrl = `${environment.api}/unit-exception-dates`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<ExceptionDateModel[]> {
        return this.http.get<ExceptionDateModel[]>(this.exceptionDatesUrl);
    }

    findOne(payload: number): Observable<ExceptionDateModel> {
        return this.http.get<ExceptionDateModel>(`${this.exceptionDatesUrl}/${payload}`);
    }

    create(payload: ExceptionDateModel): Observable<ExceptionDateModel> {
        return this.http.post<ExceptionDateModel>(this.exceptionDatesUrl, payload);
    }

    update(payload: ExceptionDateModel): Observable<ExceptionDateModel> {
        return this.http.patch<ExceptionDateModel>(`${this.exceptionDatesUrl}/${payload.id}`, payload);
    }

    destroy(payload: ExceptionDateModel) {
        return this.http.delete(`${this.exceptionDatesUrl}/${payload.id}`);
    }
}
