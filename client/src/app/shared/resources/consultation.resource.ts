import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ConsultationModel} from '../models/consultation.model';
import {PetModel} from '../models/pet.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConsultationResource {
    private consultationsUrl = `${environment.api}/consultations`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<ConsultationModel[]> {
        return this.http.get<ConsultationModel[]>(this.consultationsUrl);
    }

    findPet(payload: PetModel): Observable<ConsultationModel[]> {
        return this.http.get<ConsultationModel[]>(`${this.consultationsUrl}/${payload.id}`);
    }

    findOne(payload: number): Observable<ConsultationModel> {
        return this.http.get<ConsultationModel>(`${this.consultationsUrl}/${payload}`);
    }

    create(payload: ConsultationModel): Observable<ConsultationModel> {
        return this.http.post<ConsultationModel>(this.consultationsUrl, payload);
    }

    update(payload: ConsultationModel): Observable<ConsultationModel> {
        return this.http.patch<ConsultationModel>(`${this.consultationsUrl}/${payload.id}`, payload);
    }

    destroy(payload: ConsultationModel) {
        return this.http.delete(`${this.consultationsUrl}/${payload.id}`);
    }
}
