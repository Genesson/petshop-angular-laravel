import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {RegionModel} from '../models/region.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegionResource {
    private regionUrl = `${environment.api}/unit-regions`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<RegionModel[]> {
        return this.http.get<RegionModel[]>(this.regionUrl);
    }

    findOne(payload: number): Observable<RegionModel> {
        return this.http.get<RegionModel>(`${this.regionUrl}/${payload}`);
    }

    create(payload: RegionModel): Observable<RegionModel[]> {
        return this.http.post<RegionModel[]>(this.regionUrl, payload);
    }

    update(payload: RegionModel): Observable<RegionModel[]> {
        return this.http.patch<RegionModel[]>(`${this.regionUrl}/${payload.id}`, payload);
    }

    destroy(payload: RegionModel) {
        return this.http.delete(`${this.regionUrl}/${payload.id}`);
    }
}
