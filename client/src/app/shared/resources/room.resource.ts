import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {RoomModel} from '../models/room.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoomResource {
    private roomsUrl = `${environment.api}/unit-rooms`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<RoomModel[]> {
        return this.http.get<RoomModel[]>(this.roomsUrl);
    }

    findOne(payload: number): Observable<RoomModel> {
        return this.http.get<RoomModel>(`${this.roomsUrl}/${payload}`);
    }

    create(payload: RoomModel): Observable<RoomModel> {
        return this.http.post<RoomModel>(this.roomsUrl, payload);
    }

    update(payload: RoomModel): Observable<RoomModel> {
        return this.http.patch<RoomModel>(`${this.roomsUrl}/${payload.id}`, payload);
    }

    destroy(payload: RoomModel) {
        return this.http.delete(`${this.roomsUrl}/${payload.id}`);
    }
}
