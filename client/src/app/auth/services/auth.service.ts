import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {map, catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {environment} from '../../../environments/environment';

import {SignInDto} from '../../shared/dtos/signin.dto';

import {UnitySandbox} from '../../unity/unity.sandbox';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private router: Router,
                private unitySandbox: UnitySandbox) {
    }

    checkUser(): boolean {
      if (localStorage.getItem('session.user')) {
          const userDate = JSON.parse(localStorage.getItem('session.user'));
          this.unitySandbox.selectUnity(userDate.unityFull);
          this.unitySandbox.selectCategories(userDate.categories);
          this.unitySandbox.selectServiceShower(userDate.serviceShower);
          this.unitySandbox.selectServiceOthers(userDate.serviceOthers);
          this.unitySandbox.selectServiceHotel(userDate.serviceHotel);
          this.unitySandbox.selectServiceSitter(userDate.serviceSitter);
          this.unitySandbox.selectServiceDaycare(userDate.serviceDaycare);
      }
      return localStorage.getItem('session.user') ? true : false;
    }

    signin(credentials: SignInDto): Observable<any> {
      return this.http.post<any>(`${environment.api}/auth/login`, credentials);
    }

    refreshToken(token: string) {
      return this.http.post<any>(`${environment.api}/auth/refresh`, { refreshToken: token }).pipe(
        map((response) => response),
        catchError((response) => throwError(response))
      );
    }

    logout(): void {
        this.http.get(`${environment.api}/auth/logout`).subscribe(() => {
            localStorage.clear();
            this.router.navigate(['/auth']);
        });
    }
}
