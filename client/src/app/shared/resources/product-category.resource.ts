import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ProductCategoryModel} from '../models/product-category.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductCategoryResource {
    private productCategoryUrl = `${environment.api}/product-categories`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<ProductCategoryModel[]> {
      return this.http.get<ProductCategoryModel[]>(this.productCategoryUrl);
    }

    findOne(payload: number): Observable<ProductCategoryModel> {
      return this.http.get<ProductCategoryModel>(`${this.productCategoryUrl}/${payload}`);
    }

    create(payload: ProductCategoryModel): Observable<ProductCategoryModel> {
      return this.http.post<ProductCategoryModel>(this.productCategoryUrl, payload);
    }

    update(payload: ProductCategoryModel): Observable<ProductCategoryModel> {
      return this.http.patch<ProductCategoryModel>(`${this.productCategoryUrl}/${payload.id}`, payload);
    }

    destroy(payload: ProductCategoryModel) {
      return this.http.delete(`${this.productCategoryUrl}/${payload.id}`);
    }
}
