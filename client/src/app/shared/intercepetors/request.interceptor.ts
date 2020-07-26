import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {SessionSandbox} from '../../session/session.sandbox';

@Injectable({
    providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor(private sessionSandbox: SessionSandbox) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestUrl: Array<any> = request.url.split('/');
    const apiUrl: Array<any> = environment.api.split('/');
    const token = localStorage.getItem('session.accessToken');

    if (token && (requestUrl[2] === apiUrl[2])) {
      const newRequest = request.clone({ setHeaders: { Authorization: `Bearer ${this.sessionSandbox.accessToken}`}});
      return next.handle(newRequest);
    }
    return next.handle(request);
  }

}
