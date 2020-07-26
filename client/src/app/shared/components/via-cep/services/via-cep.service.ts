import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ViaCepService {

    private url = `${environment.api}/cep`;

    constructor(private http: HttpClient) {
    }

    find(cep): Observable<any> {
        return this.http.get(`${this.url}/${cep}`);
    }
}
