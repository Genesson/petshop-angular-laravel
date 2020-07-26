import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ProductProviderModel} from '../models/product-provider.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductProviderResource {
    private productProviderUrl = `${environment.api}/product-providers`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<ProductProviderModel[]> {
      return this.http.get<ProductProviderModel[]>(this.productProviderUrl);
    }

    findOne(payload: number): Observable<ProductProviderModel> {
      return this.http.get<ProductProviderModel>(`${this.productProviderUrl}/${payload}`);
    }

    create(payload: ProductProviderModel): Observable<ProductProviderModel> {
      return this.http.post<ProductProviderModel>(this.productProviderUrl, payload);
    }

    update(payload: ProductProviderModel): Observable<ProductProviderModel> {
      return this.http.patch<ProductProviderModel>(`${this.productProviderUrl}/${payload.id}`, payload);
    }

    destroy(payload: ProductProviderModel) {
      return this.http.delete(`${this.productProviderUrl}/${payload.id}`);
    }

  uploadProductProviderCsv(payload: FormData) {
    return this.http.post(`${environment.api}/products-providers-csv-import`, payload);
  }
}
