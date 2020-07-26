import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ServiceModel} from '../models/service.model';
import {UnityModel} from '../models/unity.model';

import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ServiceResource {
    private servicesUrl = `${environment.api}/unit-services`;

    constructor(private http: HttpClient) {
    }

    find(): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(this.servicesUrl);
    }

    expectedTimeService(service: number, size: number): Observable<number> {
        return this.http.get<number>(`${this.servicesUrl}/${service}/${size}`);
    }

    findSubService(payload: UnityModel): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(`${this.servicesUrl}/${payload.id}/load-sub-service`);
    }

    findPerUnity(payload: UnityModel): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(`${this.servicesUrl}/${payload.id}/load-per-unity`);
    }

    findShowersPerUnity(payload: UnityModel): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(`${this.servicesUrl}/${payload.id}/load-showers`);
    }

    findSubShowersPerUnity(payload: UnityModel): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(`${this.servicesUrl}/${payload.id}/load-sub-showers`);
    }

    findTransportsPerUnity(payload: UnityModel): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(`${this.servicesUrl}/${payload.id}/load-transports`);
    }

    findPetSittersPerUnity(payload: UnityModel): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(`${this.servicesUrl}/${payload.id}/load-pet-sitters`);
    }

    findDayCaresPerUnity(payload: UnityModel): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(`${this.servicesUrl}/${payload.id}/load-day-cares`);
    }

    findHotelsPerUnity(payload: UnityModel): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(`${this.servicesUrl}/${payload.id}/load-hotels`);
    }

    findOthersPerUnity(payload: UnityModel): Observable<ServiceModel[]> {
        return this.http.get<ServiceModel[]>(`${this.servicesUrl}/${payload.id}/load-others`);
    }

    findOne(payload: number): Observable<ServiceModel> {
        return this.http.get<ServiceModel>(`${this.servicesUrl}/${payload}`);
    }

    create(payload: ServiceModel): Observable<ServiceModel> {
        return this.http.post<ServiceModel>(this.servicesUrl, payload);
    }

    update(payload: ServiceModel): Observable<ServiceModel> {
        return this.http.patch<ServiceModel>(`${this.servicesUrl}/${payload.id}`, payload);
    }

    updateStatus(payload) {
      return this.http.post(`${this.servicesUrl}/update-status`, payload);
    }

    destroy(payload: ServiceModel) {
        return this.http.delete(`${this.servicesUrl}/${payload.id}`);
    }
}
