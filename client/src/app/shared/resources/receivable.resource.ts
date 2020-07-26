import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ReceivableModel} from '../models/receivable.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReceivableResource {
    private receivableUrl = `${environment.api}/unit-receivables`;

    constructor(private http: HttpClient) {
    }

    find(payload: string): Observable<ReceivableModel[]> {
        return this.http.get<ReceivableModel[]>(`${this.receivableUrl}/${payload}`);
    }

    findOne(): Observable<any> {
        return this.http.post<any>(`${this.receivableUrl}/totals`, null);
    }

    create(payload: ReceivableModel): Observable<ReceivableModel> {
        return this.http.post<ReceivableModel>(this.receivableUrl, payload);
    }

    update(payload: ReceivableModel): Observable<ReceivableModel> {
        return this.http.patch<ReceivableModel>(`${this.receivableUrl}/${payload.id}`, payload);
    }

    destroy(payload: ReceivableModel) {
        return this.http.delete(`${this.receivableUrl}/${payload.id}`);
    }
}
