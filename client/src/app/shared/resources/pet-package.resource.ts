import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {PetPackageModel} from '../models/pet-package.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PetPackageResource {
    private petPackageUrl = `${environment.api}/pet-packages`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<PetPackageModel[]> {
        return this.http.get<PetPackageModel[]>(this.petPackageUrl);
    }

    findOne(payload: number): Observable<PetPackageModel> {
        return this.http.get<PetPackageModel>(`${this.petPackageUrl}/${payload}`);
    }

    create(payload: PetPackageModel): Observable<PetPackageModel> {
        return this.http.post<PetPackageModel>(this.petPackageUrl, payload);
    }

    update(payload: PetPackageModel): Observable<PetPackageModel> {
        return this.http.patch<PetPackageModel>(`${this.petPackageUrl}/${payload.id}`, payload);
    }

    destroy(payload: PetPackageModel) {
        return this.http.delete(`${this.petPackageUrl}/${payload.id}`);
    }

    dateIntervals(payload: any) {
        return this.http.post(`${environment.api}/date-intervals`, payload);
    }
}
