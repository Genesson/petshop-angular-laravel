import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {TypeModel} from '../models/type.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TypeResource {
    private typesUrl = `${environment.api}/pet-types`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<TypeModel[]> {
        return this.http.get<TypeModel[]>(this.typesUrl);
    }

    findOne(payload: number): Observable<TypeModel> {
        return this.http.get<TypeModel>(`${this.typesUrl}/${payload}`);
    }

    create(payload: TypeModel): Observable<TypeModel> {
        return this.http.post<TypeModel>(this.typesUrl, payload);
    }

    update(payload: TypeModel): Observable<TypeModel> {
        return this.http.patch<TypeModel>(`${this.typesUrl}/${payload.id}`, payload);
    }

    destroy(payload: TypeModel) {
        return this.http.delete(`${this.typesUrl}/${payload.id}`);
    }
}
