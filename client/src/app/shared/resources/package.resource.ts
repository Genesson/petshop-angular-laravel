import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {PackageModel} from '../models/package.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PackageResource {
    private packagesUrl = `${environment.api}/packages`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<PackageModel[]> {
        return this.http.get<PackageModel[]>(this.packagesUrl);
    }

    findOne(payload: number): Observable<PackageModel> {
        return this.http.get<PackageModel>(`${this.packagesUrl}/${payload}`);
    }

    create(payload: PackageModel): Observable<PackageModel> {
        return this.http.post<PackageModel>(this.packagesUrl, payload);
    }

    update(payload: PackageModel): Observable<PackageModel> {
        return this.http.patch<PackageModel>(`${this.packagesUrl}/${payload.id}`, payload);
    }

    destroy(payload: PackageModel) {
        return this.http.delete(`${this.packagesUrl}/${payload.id}`);
    }
}
