import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {CashierModel} from '../models/cashier.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CashierResource {
    private cashiersUrl = `${environment.api}/unit-cashiers`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<CashierModel[]> {
        return this.http.get<CashierModel[]>(this.cashiersUrl);
    }

    findOne(payload: number): Observable<CashierModel> {
        return this.http.get<CashierModel>(`${this.cashiersUrl}/${payload}`);
    }

    create(payload: CashierModel): Observable<CashierModel> {
        return this.http.post<CashierModel>(this.cashiersUrl, payload);
    }
}
