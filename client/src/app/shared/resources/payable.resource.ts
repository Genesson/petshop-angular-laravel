import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {PayableModel} from '../models/payable.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PayableResource {
    private payableUrl = `${environment.api}/unit-payables`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<PayableModel[]> {
        return this.http.get<PayableModel[]>(this.payableUrl);
    }

    findOne(payload: number): Observable<PayableModel> {
        return this.http.get<PayableModel>(`${this.payableUrl}/${payload}`);
    }

    create(payload: PayableModel): Observable<PayableModel> {
        return this.http.post<PayableModel>(this.payableUrl, payload);
    }

    update(payload: PayableModel): Observable<PayableModel> {
        return this.http.patch<PayableModel>(`${this.payableUrl}/${payload.id}`, payload);
    }

    destroy(payload: PayableModel) {
        return this.http.delete(`${this.payableUrl}/${payload.id}`);
    }
}
