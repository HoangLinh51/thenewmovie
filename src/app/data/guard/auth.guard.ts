import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/data/service/auth.service';
import { StorageService } from '../service/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public isAuthorized = false;
  user: any;

  constructor(private router: Router, private storageService: StorageService) {
    this.user =this.storageService.get('user')
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.user === null) {
      this.router.navigate(['/sign-in']);
      return false;
    }
    return true;
  }
}
