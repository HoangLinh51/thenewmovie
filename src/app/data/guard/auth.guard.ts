import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";
import { IUser } from "../modal/user.modal";

export class AuthGuard implements CanActivate {
  public isAuthorized = false;
  user?: IUser | null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.user.subscribe((x) => (this.user = x));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.user === null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}