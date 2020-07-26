import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {CheckModel} from '../models/check.model';
import {UnityModel} from '../models/unity.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CheckResource {
    private checksUrl = `${environment.api}/unit-checks`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<CheckModel[]> {
        return this.http.get<CheckModel[]>(this.checksUrl);
    }

    findPerUnity(payload: UnityModel): Observable<CheckModel[]> {
        return this.http.get<CheckModel[]>(`${this.checksUrl}/${payload.id}/load-per-unity`);
    }

    findOne(payload: number): Observable<CheckModel> {
        return this.http.get<CheckModel>(`${this.checksUrl}/${payload}`);
    }

    create(payload: CheckModel): Observable<CheckModel> {
        return this.http.post<CheckModel>(this.checksUrl, payload);
    }

    update(payload: CheckModel): Observable<CheckModel> {
        return this.http.patch<CheckModel>(`${this.checksUrl}/${payload.id}`, payload);
    }

    destroy(payload: CheckModel) {
        return this.http.delete(`${this.checksUrl}/${payload.id}`);
    }
}
