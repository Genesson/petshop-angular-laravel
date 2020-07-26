import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {PetMedicineModel} from '../models/pet-medicine.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PetMedicineResource {
    private petMedicinesUrl = `${environment.api}/pet-medicines`;

    constructor(private http: HttpClient) {
    }

    find(payload: number): Observable<PetMedicineModel[]> {
        return this.http.get<PetMedicineModel[]>(`${this.petMedicinesUrl}/${payload}`);
    }

    findOne(payload: number): Observable<PetMedicineModel> {
        return this.http.get<PetMedicineModel>(`${this.petMedicinesUrl}/${payload}`);
    }

    create(payload: PetMedicineModel): Observable<PetMedicineModel> {
        return this.http.post<PetMedicineModel>(this.petMedicinesUrl, payload);
    }

    update(payload: PetMedicineModel): Observable<PetMedicineModel> {
        return this.http.patch<PetMedicineModel>(`${this.petMedicinesUrl}/${payload.id}`, payload);
    }

    destroy(payload: PetMedicineModel) {
        return this.http.delete(`${this.petMedicinesUrl}/${payload.id}`);
    }
}
