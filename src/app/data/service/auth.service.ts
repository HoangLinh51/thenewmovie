import { CSP_NONCE, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SingleResponse } from '../modal/http.models';
import { HttpService } from './http.service';
import { LoginFormValue, Credentials, ResetPasswordPayload } from '../modal/auth.modal';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { StorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrls = 'https://inte-hrm-auth.nextgig.tech/api/'

  constructor(private readonly httpService: HttpService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

  login(payload: LoginFormValue): Observable<Credentials> {
    return this.httpService.post<SingleResponse<Credentials>>(`${this.apiUrls}tokens`, payload)
      .pipe(map(({ data }) => data));
  }

  refreshToken(payload: Credentials): Observable<Credentials> {
    return this.httpService
      .post<SingleResponse<Credentials>>(`${this.apiUrls}tokens/refresh`, payload)
      .pipe(map(({ data }) => data));
  }

  logout(): Observable<void> {
    return this.httpService.post<void>(`${this.apiUrls}tokens/logout`, null);
  }

  getResetLink(email: string): Observable<void> {
    return this.httpService.post<void>(`${this.apiUrls}tokens/forgot-password`, { email });
  }

  resetPassword(payload: ResetPasswordPayload): Observable<void> {
    return this.httpService.post<void>(`${this.apiUrls}users/reset-password`, payload);
  }

  getPermissions(): Observable<string[]> {
    return this.httpService.get(`${this.apiUrls}personal/permissions`);
  }

  checkResetPasswordToken(payload: { passwordResetToken: string; email: string }): Observable<boolean> {
    return this.httpService
      .post<SingleResponse<boolean>>(`${this.apiUrls}users/reset-password/check-token`, payload)
      .pipe(map(({ data }) => data));
  }

  // destroyWhenUnauthorized() {
  //   return (source: Observable<any>) => {
  //     return source.pipe(
  //       takeUntil(this.actions$.pipe(ofType(authActions.logoutSuccess))),
  //       takeUntil(this.actions$.pipe(ofType(authActions.sessionExpired)))
  //     );
  //   };
  // }
}
