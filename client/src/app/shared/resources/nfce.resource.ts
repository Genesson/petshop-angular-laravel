import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {NfceModel} from '../models/nfce.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NfceResource {
    private nfcesUrl = `${environment.api}/invoice`;

    constructor(private http: HttpClient) {}

    find(page: number): Observable<any> {
      return this.http.get<any>(`${this.nfcesUrl}?type=nfce&page=${page}`);
    }

    findOne(payload: number): Observable<NfceModel> {
        return this.http.get<NfceModel>(`${this.nfcesUrl}/${payload}`);
    }

    create(payload: NfceModel): Observable<NfceModel> {
        return this.http.post<NfceModel>(this.nfcesUrl, payload);
    }

    update(payload: any): Observable<NfceModel> {
        return this.http.patch<NfceModel>(
            `${this.nfcesUrl}/${payload.id}`,
            payload
        );
    }

    destroy(payload: NfceModel) {
        return this.http.delete(`${this.nfcesUrl}/${payload.id}`);
    }
}
