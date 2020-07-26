import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {HolidayModel} from '../models/holiday.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HolidayResource {
    private holidayUrl = `${environment.api}/holidays`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<HolidayModel[]> {
        return this.http.get<HolidayModel[]>(`${this.holidayUrl}/load-unity`);
    }

    findOne(payload: number): Observable<HolidayModel> {
        return this.http.get<HolidayModel>(`${this.holidayUrl}/${payload}`);
    }

    create(payload: HolidayModel): Observable<HolidayModel[]> {
        return this.http.post<HolidayModel[]>(this.holidayUrl, payload);
    }

    update(payload: HolidayModel): Observable<HolidayModel> {
        return this.http.patch<HolidayModel>(`${this.holidayUrl}/${payload.id}`, payload);
    }

    destroy(payload: HolidayModel) {
        return this.http.delete(`${this.holidayUrl}/${payload.id}`);
    }
}
