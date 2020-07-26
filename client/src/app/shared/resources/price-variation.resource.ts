import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {PriceVariationModel} from '../models/price-variation.model';
import {UnityModel} from '../models/unity.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PriceVariationResource {
    private priceVariationsUrl = `${environment.api}/unit-price-variations`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<PriceVariationModel[]> {
        return this.http.get<PriceVariationModel[]>(this.priceVariationsUrl);
    }

    findPerUnity(payload: UnityModel): Observable<PriceVariationModel[]> {
        return this.http.get<PriceVariationModel[]>(`${this.priceVariationsUrl}/${payload.id}/load-per-unity`);
    }

    findOne(payload: number): Observable<PriceVariationModel> {
        return this.http.get<PriceVariationModel>(`${this.priceVariationsUrl}/${payload}`);
    }

    create(payload: PriceVariationModel): Observable<PriceVariationModel> {
        return this.http.post<PriceVariationModel>(this.priceVariationsUrl, payload);
    }

    update(payload: PriceVariationModel): Observable<PriceVariationModel> {
        return this.http.patch<PriceVariationModel>(`${this.priceVariationsUrl}/${payload.id}`, payload);
    }

    destroy(payload: PriceVariationModel) {
        return this.http.delete(`${this.priceVariationsUrl}/${payload.id}`);
    }
}
