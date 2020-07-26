import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ProvinceModel} from '../models/province.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProvinceResource {
    private provincesUrl = `${environment.api}/provinces`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<ProvinceModel[]> {
        return this.http.get<ProvinceModel[]>(this.provincesUrl);
    }
}
