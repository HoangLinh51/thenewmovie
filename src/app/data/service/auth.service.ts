import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../modal/user.modal';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:4000';
  private userSubject: BehaviorSubject<IUser | null>;
  public user: Observable<IUser | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<IUser>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/settings/sign-in']).then(() => window.location.reload())
  }

  register(user: IUser) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getAll() {
    return this.http.get<IUser[]>(`${this.apiUrl}/users`);
  }

  getById(id: string) {
    return this.http.get<IUser>(`${this.apiUrl}/users/${id}`);
  }

  update(id: number, params: any) {
    return this.http.put(`${this.apiUrl}/users/${id}`, params).pipe(
      map((x) => {
        if (id == this.userValue?.id) {
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }
        return x;
      })
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`).pipe(
      map((x) => {
        if (id == this.userValue?.id) {
          this.logout();
        }
        return x;
      })
    );
  }
}
