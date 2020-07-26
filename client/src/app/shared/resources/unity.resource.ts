import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {UnityModel} from '../models/unity.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UnityResource {
    private unitsUrl = `${environment.api}/units`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<UnityModel[]> {
        return this.http.get<UnityModel[]>(this.unitsUrl);
    }

    findOne(payload: number): Observable<UnityModel> {
        return this.http.get<UnityModel>(`${this.unitsUrl}/${payload}`);
    }

    create(payload: UnityModel): Observable<UnityModel> {
        return this.http.post<UnityModel>(this.unitsUrl, payload);
    }

    update(payload: UnityModel): Observable<UnityModel> {
        return this.http.patch<UnityModel>(`${this.unitsUrl}/${payload.id}`, payload);
    }

    destroy(payload: UnityModel) {
        return this.http.delete(`${this.unitsUrl}/${payload.id}`);
    }

    disable(payload: UnityModel) {
        return this.http.post(`${this.unitsUrl}/disable`, payload);
    }

    uploadImage(payload: FormData) {
        return this.http.post(`${environment.api}/upload-image`, payload);
    }
}
