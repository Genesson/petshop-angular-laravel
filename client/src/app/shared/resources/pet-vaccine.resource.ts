import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {PetVaccineModel} from '../models/pet-vaccine.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PetVaccineResource {
    private petVaccinesUrl = `${environment.api}/pet-vaccines`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<PetVaccineModel[]> {
        return this.http.get<PetVaccineModel[]>(this.petVaccinesUrl);
    }

    findOne(payload: number): Observable<PetVaccineModel[]> {
        return this.http.get<PetVaccineModel[]>(`${this.petVaccinesUrl}/${payload}`);
    }

    create(payload: PetVaccineModel): Observable<PetVaccineModel> {
        return this.http.post<PetVaccineModel>(this.petVaccinesUrl, payload);
    }

    update(payload: PetVaccineModel): Observable<PetVaccineModel> {
        return this.http.patch<PetVaccineModel>(`${this.petVaccinesUrl}/${payload.id}`, payload);
    }

    destroy(payload: PetVaccineModel) {
        return this.http.delete(`${this.petVaccinesUrl}/${payload.id}`);
    }
}
