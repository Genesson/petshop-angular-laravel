import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {XmlModel} from '../models/xml.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class XmlResource {
    private cashiersUrl = `${environment.api}/invoice`;

    constructor(private http: HttpClient) {
    }

    find(payload: string): Observable<XmlModel> {
        return this.http.post<XmlModel>(`${this.cashiersUrl}/find`, {path: payload});
    }

    uploadXml(payload: FormData) {
        return this.http.post(`${environment.api}/upload-xml`, payload);
    }

    create(payload: XmlModel): Observable<XmlModel> {
        return this.http.post<XmlModel>(this.cashiersUrl, payload);
    }
}
