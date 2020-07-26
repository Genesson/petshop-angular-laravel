import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {CategoryModel} from '../models/category.model';
import {UnityModel} from '../models/unity.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryResource {
    private categoriesUrl = `${environment.api}/unit-categories`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<CategoryModel[]> {
        return this.http.get<CategoryModel[]>(this.categoriesUrl);
    }

    findPerUnity(payload: UnityModel): Observable<CategoryModel[]> {
        return this.http.get<CategoryModel[]>(`${this.categoriesUrl}/${payload.id}/load-per-unity`);
    }

    findOne(payload: number): Observable<CategoryModel> {
        return this.http.get<CategoryModel>(`${this.categoriesUrl}/${payload}`);
    }

    create(payload: CategoryModel): Observable<CategoryModel> {
        return this.http.post<CategoryModel>(this.categoriesUrl, payload);
    }

    update(payload: CategoryModel): Observable<CategoryModel> {
        return this.http.patch<CategoryModel>(`${this.categoriesUrl}/${payload.id}`, payload);
    }

    destroy(payload: CategoryModel) {
        return this.http.delete(`${this.categoriesUrl}/${payload.id}`);
    }
}
