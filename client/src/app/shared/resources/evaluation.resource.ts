import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {EvaluationModel} from '../models/evaluation.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EvaluationResource {
    private petsUrl = `${environment.api}/pet-evaluation`;

    constructor(private http: HttpClient) {
    }

    find(payload: number): Observable<EvaluationModel[]> {
        return this.http.get<EvaluationModel[]>(`${this.petsUrl}/${payload}/load-per-pet`);
    }

    findOne(payload: number): Observable<EvaluationModel> {
        return this.http.get<EvaluationModel>(`${this.petsUrl}/${payload}`);
    }

    create(payload: EvaluationModel): Observable<EvaluationModel> {
        return this.http.post<EvaluationModel>(this.petsUrl, payload);
    }

    update(payload: EvaluationModel): Observable<EvaluationModel> {
        return this.http.patch<EvaluationModel>(`${this.petsUrl}/${payload.id}`, payload);
    }

    destroy(payload: EvaluationModel) {
        return this.http.delete(`${this.petsUrl}/${payload.id}`);
    }
}
