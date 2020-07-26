import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';

import {DreModel} from '../models/dre.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DreResource {
    private dresUrl = `${environment.api}/dres`;

    constructor(private http: HttpClient) {}

    pdf(payload: string): Observable<string> {
        return this.http.get<string>(`${environment.api}/pdf-dre/${payload}`);
    }

    find(payload: string): Observable<DreModel> {
        return this.http.get<DreModel>(`${this.dresUrl}/${payload}`);
    }

    findOne(payload: number): Observable<DreModel> {
        return this.http.get<DreModel>(`${this.dresUrl}/${payload}`);
    }

    create(payload: DreModel): Observable<DreModel> {
        return this.http.post<DreModel>(this.dresUrl, payload);
    }

    update(payload: any): Observable<DreModel> {
        return this.http.patch<DreModel>(
            `${this.dresUrl}/${payload.id}`,
            payload
        );
    }

    destroy(payload: DreModel) {
        return this.http.delete(`${this.dresUrl}/${payload.id}`);
    }
}
