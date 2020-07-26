import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {PackagePetModel} from '../models/package-pet.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PackagePetResource {
    private packagePetUrl = `${environment.api}/package-pets`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<PackagePetModel[]> {
        return this.http.get<PackagePetModel[]>(this.packagePetUrl);
    }

    findOne(payload: number): Observable<PackagePetModel> {
        return this.http.get<PackagePetModel>(`${this.packagePetUrl}/${payload}`);
    }

    create(payload: PackagePetModel): Observable<PackagePetModel> {
        return this.http.post<PackagePetModel>(this.packagePetUrl, payload);
    }

    update(payload: PackagePetModel): Observable<PackagePetModel> {
        return this.http.patch<PackagePetModel>(`${this.packagePetUrl}/${payload.id}`, payload);
    }

    destroy(payload: PackagePetModel) {
        return this.http.delete(`${this.packagePetUrl}/${payload.id}`);
    }
}
