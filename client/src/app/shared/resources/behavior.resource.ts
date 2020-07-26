import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {BehaviorModel} from '../models/behavior.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BehaviorResource {
    private behaviorsUrl = `${environment.api}/pet-behaviors`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<BehaviorModel[]> {
        return this.http.get<BehaviorModel[]>(this.behaviorsUrl);
    }

    findOne(payload: number): Observable<BehaviorModel> {
        return this.http.get<BehaviorModel>(`${this.behaviorsUrl}/${payload}`);
    }

    create(payload: BehaviorModel): Observable<BehaviorModel> {
        return this.http.post<BehaviorModel>(this.behaviorsUrl, payload);
    }

    update(payload: BehaviorModel): Observable<BehaviorModel> {
        return this.http.patch<BehaviorModel>(`${this.behaviorsUrl}/${payload.id}`, payload);
    }

    destroy(payload: BehaviorModel) {
        return this.http.delete(`${this.behaviorsUrl}/${payload.id}`);
    }
}
