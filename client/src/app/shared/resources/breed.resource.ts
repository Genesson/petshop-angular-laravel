import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {BreedModel} from '../models/breed.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BreedResource {
    private breedsUrl = `${environment.api}/pet-breeds`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<BreedModel[]> {
        return this.http.get<BreedModel[]>(this.breedsUrl);
    }

    findOne(payload: number): Observable<BreedModel[]> {
        return this.http.get<BreedModel[]>(`${this.breedsUrl}/${payload}`);
    }

    create(payload: BreedModel): Observable<BreedModel> {
        return this.http.post<BreedModel>(this.breedsUrl, payload);
    }

    update(payload: BreedModel): Observable<BreedModel> {
        return this.http.patch<BreedModel>(`${this.breedsUrl}/${payload.id}`, payload);
    }

    destroy(payload: BreedModel) {
        return this.http.delete(`${this.breedsUrl}/${payload.id}`);
    }
}
