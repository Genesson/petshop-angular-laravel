import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ProductModel} from '../models/product.model';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductResource {
  private productsUrl = `${environment.api}/products`;

  constructor(private http: HttpClient) {
  }

  find(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productsUrl);
  }

  findOne(payload: number): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.productsUrl}/${payload}`);
  }

  create(payload: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.productsUrl, payload);
  }

  update(payload: ProductModel): Observable<ProductModel> {
    return this.http.patch<ProductModel>(`${this.productsUrl}/${payload.id}`, payload);
  }

  destroy(payload: ProductModel) {
    return this.http.delete(`${this.productsUrl}/${payload.id}`);
  }

  uploadImage(payload: FormData) {
    return this.http.post(`${environment.api}/upload-image`, payload);
  }

  uploadProductCsv(payload: FormData) {
    return this.http.post(`${environment.api}/products-csv-import`, payload);
  }

  uploadProductProductProviderCsv(payload: FormData) {
    return this.http.post(`${environment.api}/products-products-providers-csv-import`, payload);
  }

}
