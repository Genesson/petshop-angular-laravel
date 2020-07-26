import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {TypeFurModel} from '../models/type-fur.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TypeFurResource {
    private typeFursUrl = `${environment.api}/pet-type-furs`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<TypeFurModel[]> {
        return this.http.get<TypeFurModel[]>(this.typeFursUrl);
    }

    findOne(payload: number): Observable<TypeFurModel> {
        return this.http.get<TypeFurModel>(`${this.typeFursUrl}/${payload}`);
    }

    create(payload: TypeFurModel): Observable<TypeFurModel> {
        return this.http.post<TypeFurModel>(this.typeFursUrl, payload);
    }

    update(payload: TypeFurModel): Observable<TypeFurModel> {
        return this.http.patch<TypeFurModel>(`${this.typeFursUrl}/${payload.id}`, payload);
    }

    destroy(payload: TypeFurModel) {
        return this.http.delete(`${this.typeFursUrl}/${payload.id}`);
    }
}
