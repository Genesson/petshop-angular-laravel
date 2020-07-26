import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {CardFlagModel} from '../models/cardFlag.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CardFlagResource {
    private regionUrl = `${environment.api}/unit-card-flags`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<CardFlagModel[]> {
        return this.http.get<CardFlagModel[]>(this.regionUrl);
    }

    findOne(payload: number): Observable<CardFlagModel> {
        return this.http.get<CardFlagModel>(`${this.regionUrl}/${payload}`);
    }

    create(payload: CardFlagModel): Observable<CardFlagModel> {
        return this.http.post<CardFlagModel>(this.regionUrl, payload);
    }

    update(payload: CardFlagModel): Observable<CardFlagModel> {
        return this.http.patch<CardFlagModel>(`${this.regionUrl}/${payload.id}`, payload);
    }

    destroy(payload: CardFlagModel) {
        return this.http.delete(`${this.regionUrl}/${payload.id}`);
    }
}
