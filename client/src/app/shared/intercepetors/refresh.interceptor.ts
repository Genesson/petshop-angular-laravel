import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RefreshInterceptor implements HttpInterceptor {

  constructor(private store: Store) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.store.dispatch(new Navigate([`/auth`]));
        } else {
          return throwError(error);
        }
      })
    );
  }

}
