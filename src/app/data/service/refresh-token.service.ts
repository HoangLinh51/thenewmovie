import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, finalize, first, from, Observable, of, Subject, takeWhile, tap, throwError } from 'rxjs';;
import { AuthService } from './auth.service';
import { Credentials } from '../modal/auth.modal';
import { StorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})

export class RefreshTokenService {
  private apiUrls = 'https://inte-hrm-auth.nextgig.tech/api/'
  isRefreshTokenInProgress = false;
  private readonly refreshTokenSubject$ = new Subject<boolean>();
  constructor(private readonly authService: AuthService, private storageService: StorageService) {}

  shouldRefreshToken({ tokenExpiryTime, refreshTokenExpiryTime }: Credentials, url: string): boolean {
    const testTokenExpiryTime = 2 * 30 * 1000;
  
    if (!tokenExpiryTime || !refreshTokenExpiryTime || this.isIgnoreByUrl(url)) return false;
  
    const currentTime = Date.now();
    const tokenExpiryTimeMs = new Date(tokenExpiryTime).getTime();
    const refreshTokenExpiryTimeMs = new Date(refreshTokenExpiryTime).getTime();
  
    const isTokenExpiringSoon = tokenExpiryTimeMs - currentTime <= testTokenExpiryTime;
    const isRefreshTokenExpired = refreshTokenExpiryTimeMs < currentTime;
  
    if (!isTokenExpiringSoon || isRefreshTokenExpired) return false;
  
    return true;
  }
  
  handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isRefreshTokenInProgress) return this.keepOnGoingRequest(request, next);
    this.isRefreshTokenInProgress = true;
    return this.refreshToken(request, next);
  }

  // Don't refresh token for these api
  private isIgnoreByUrl(url: string): boolean {
    return [this.apiUrls + 'tokens/refresh'].some(api => url?.includes(api));
  }

  private refreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const storedCredentials = localStorage.getItem('credentials');
    const credentials = storedCredentials ? JSON.parse(storedCredentials) : null;

    if (!credentials) {
      return throwError(() => new Error('No credentials found in localStorage'));
    }

    return from(this.authService.refreshToken(credentials as Credentials)).pipe(
      finalize(() => (this.isRefreshTokenInProgress = false)),
      tap(newCredentials => {
        localStorage.setItem('credentials', JSON.stringify(newCredentials));
        this.refreshTokenSubject$.next(true);
      }),
      catchError(error => {
        this.refreshTokenSubject$.next(false);
        return throwError(() => error);
      }),
      concatMap(() => this.getAuthReq(request)),
      concatMap(req => next.handle(req))
    );
  }

  private keepOnGoingRequest(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.refreshTokenSubject$.pipe(
      takeWhile(success => success),
      first(),
      concatMap(this.getAuthReq.bind(this, request)),
      concatMap(req => next.handle(req))
    );
  }

  private getAuthReq(request: HttpRequest<unknown>): Observable<HttpRequest<unknown>> {
    const credentials: Credentials | null = this.storageService.get('credentials');
    if (!credentials) {
      return throwError(() => new Error('No credentials found in localStorage'));
    }

    const modifiedRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${credentials.token}` }
    });

    return of(modifiedRequest);
  }
}