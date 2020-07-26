import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ModuleHotelModel} from '../models/module-hotel.model';
import {UserModel} from '../models/user.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ModuleHotelResource {
    private url = `${environment.api}/resorts`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<ModuleHotelModel[]> {
        return this.http.get<ModuleHotelModel[]>(this.url);
    }

    findPerTutor(payload: UserModel): Observable<ModuleHotelModel[]> {
        return this.http.get<ModuleHotelModel[]>(`${this.url}/${payload.id}/load-per-tutor`);
    }

    findOne(payload: number): Observable<ModuleHotelModel> {
        return this.http.get<ModuleHotelModel>(`${this.url}/${payload}`);
    }

    create(payload: ModuleHotelModel): Observable<ModuleHotelModel> {
        return this.http.post<ModuleHotelModel>(this.url, payload);
    }

    update(payload: ModuleHotelModel): Observable<ModuleHotelModel> {
        return this.http.patch<ModuleHotelModel>(`${this.url}/${payload.id}`, payload);
    }

    destroy(payload: ModuleHotelModel) {
        return this.http.delete(`${this.url}/${payload.id}`);
    }
}
