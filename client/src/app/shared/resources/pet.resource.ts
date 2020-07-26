import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {PetModel} from '../models/pet.model';
import {UserModel} from '../models/user.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PetResource {
    private petsUrl = `${environment.api}/pets`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<PetModel[]> {
        return this.http.get<PetModel[]>(this.petsUrl);
    }

    findPerTutor(payload: UserModel): Observable<PetModel[]> {
        return this.http.get<PetModel[]>(`${this.petsUrl}/${payload.id}/load-per-tutor`);
    }

    findOne(payload: number): Observable<PetModel> {
        return this.http.get<PetModel>(`${this.petsUrl}/${payload}`);
    }

    create(payload: PetModel): Observable<PetModel> {
        return this.http.post<PetModel>(this.petsUrl, payload);
    }

    update(payload: PetModel): Observable<PetModel> {
        return this.http.patch<PetModel>(`${this.petsUrl}/${payload.id}`, payload);
    }

    destroy(payload: PetModel) {
        return this.http.delete(`${this.petsUrl}/${payload.id}`);
    }

    uploadImage(payload: FormData) {
        return this.http.post(`${environment.api}/upload-image`, payload);
    }

  uploadPetCsv(payload: FormData) {
    return this.http.post(`${environment.api}/pets-csv-import`, payload);
  }
}
