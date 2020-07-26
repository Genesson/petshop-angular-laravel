import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {PetDiseaseModel} from '../models/pet-disease.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PetDiseaseResource {
    private petDiseasesUrl = `${environment.api}/pet-diseases`;

    constructor(private http: HttpClient) {
    }

    find(payload: number): Observable<PetDiseaseModel[]> {
        return this.http.get<PetDiseaseModel[]>(`${this.petDiseasesUrl}/${payload}`);
    }

    findOne(payload: number): Observable<PetDiseaseModel> {
        return this.http.get<PetDiseaseModel>(`${this.petDiseasesUrl}/${payload}`);
    }

    create(payload: PetDiseaseModel): Observable<PetDiseaseModel> {
        return this.http.post<PetDiseaseModel>(this.petDiseasesUrl, payload);
    }

    update(payload: PetDiseaseModel): Observable<PetDiseaseModel> {
        return this.http.patch<PetDiseaseModel>(`${this.petDiseasesUrl}/${payload.id}`, payload);
    }

    destroy(payload: PetDiseaseModel) {
        return this.http.delete(`${this.petDiseasesUrl}/${payload.id}`);
    }
}
