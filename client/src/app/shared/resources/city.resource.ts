import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {CityModel} from '../models/city.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CityResource {
    private citiesUrl = `${environment.api}/cities`;

    constructor(private http: HttpClient) {
    }

    find(payload: number): Observable<CityModel[]> {
        return this.http.get<CityModel[]>(`${this.citiesUrl}/${payload}`);
    }
}
