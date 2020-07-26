import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {SizeModel} from '../models/size.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SizeResource {
    private sizesUrl = `${environment.api}/pet-sizes`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<SizeModel[]> {
        return this.http.get<SizeModel[]>(this.sizesUrl);
    }

    findOne(payload: number): Observable<SizeModel> {
        return this.http.get<SizeModel>(`${this.sizesUrl}/${payload}`);
    }

    create(payload: SizeModel): Observable<SizeModel> {
        return this.http.post<SizeModel>(this.sizesUrl, payload);
    }

    update(payload: SizeModel): Observable<SizeModel> {
        return this.http.patch<SizeModel>(`${this.sizesUrl}/${payload.id}`, payload);
    }

    destroy(payload: SizeModel) {
        return this.http.delete(`${this.sizesUrl}/${payload.id}`);
    }
}
