import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {PermissionModel} from '../models/permission.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PermissionResource {
    private permissionsUrl = `${environment.api}/permissions`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<PermissionModel[]> {
        return this.http.get<PermissionModel[]>(this.permissionsUrl);
    }

    findOne(payload: number): Observable<PermissionModel[]> {
        return this.http.get<PermissionModel[]>(`${this.permissionsUrl}/${payload}`);
    }

    create(payload: PermissionModel): Observable<PermissionModel> {
        return this.http.post<PermissionModel>(this.permissionsUrl, payload);
    }

    update(payload: PermissionModel): Observable<PermissionModel> {
        return this.http.patch<PermissionModel>(`${this.permissionsUrl}/${payload.id}`, payload);
    }

    destroy(payload: PermissionModel) {
        return this.http.delete(`${this.permissionsUrl}/${payload.id}`);
    }
}
