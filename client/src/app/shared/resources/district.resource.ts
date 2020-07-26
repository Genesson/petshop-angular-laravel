import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {DistrictModel} from '../models/district.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DistrictResource {
    private districtUrl = `${environment.api}/unit-districts`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<DistrictModel[]> {
        return this.http.get<DistrictModel[]>(this.districtUrl);
    }

    findOne(payload: number): Observable<DistrictModel> {
        return this.http.get<DistrictModel>(`${this.districtUrl}/${payload}`);
    }

    create(payload: DistrictModel): Observable<DistrictModel> {
        return this.http.post<DistrictModel>(this.districtUrl, payload);
    }

    update(payload: DistrictModel): Observable<DistrictModel> {
        return this.http.patch<DistrictModel>(`${this.districtUrl}/${payload.id}`, payload);
    }

    destroy(payload: DistrictModel) {
        return this.http.delete(`${this.districtUrl}/${payload.id}`);
    }
}
