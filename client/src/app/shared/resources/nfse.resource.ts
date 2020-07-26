import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {NfseModel} from '../models/nfse.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NfseResource {
    private nfsesUrl = `${environment.api}/invoice`;

    constructor(private http: HttpClient) {}

    find(page: number): Observable<any> {
      return this.http.get<any>(`${this.nfsesUrl}?type=nfse&page=${page}`);
    }

    findOne(payload: number): Observable<NfseModel> {
        return this.http.get<NfseModel>(`${this.nfsesUrl}/${payload}`);
    }

    create(payload: NfseModel): Observable<NfseModel> {
        return this.http.post<NfseModel>(this.nfsesUrl, payload);
    }

    update(payload: any): Observable<NfseModel> {
        return this.http.patch<NfseModel>(
            `${this.nfsesUrl}/${payload.id}`,
            payload
        );
    }

    destroy(payload: NfseModel) {
        return this.http.delete(`${this.nfsesUrl}/${payload.id}`);
    }
}
