
import { Observable, catchError, from, throwError } from 'rxjs';
import { RefreshTokenService } from '../service/refresh-token.service';
import { HttpRequest, HttpEvent, HttpInterceptor, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../modal/auth.modal';
import { StorageService } from '../service/localstorage.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private refreshTokenService: RefreshTokenService,
    private storageService: StorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const credentials: Credentials | null = this.storageService.get('credentials');

    if (!credentials) {
      const modifiedReq = req.clone({
        headers: req.headers.append('tenant', 'restaff')
      });
      return next.handle(modifiedReq);
    }

    return from(this.handleToken(req, next, credentials)).pipe(
      catchError(error => {
        console.error('error', error);
        return throwError(() => error);
      })
    );
  }

  private handleToken(req: HttpRequest<any>, next: HttpHandler, credentials: Credentials): Observable<HttpEvent<any>> {
    let modifiedReq = req.clone({
      // headers: req.headers.append('tenant', 'restaff')
    });

    if (this.refreshTokenService.shouldRefreshToken(credentials, req.url)) {
      return this.refreshTokenService.handleRefreshToken(modifiedReq, next);
    }

    if (!this.refreshTokenService.isRefreshTokenInProgress) {
      modifiedReq = modifiedReq.clone({
        // headers: modifiedReq.headers.append('Authorization', `Bearer ${credentials.token}`)
      });
    }

    return next.handle(modifiedReq);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];