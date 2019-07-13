import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {


  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }

  canActivate(state: RouterStateSnapshot) {
    return this.authservice.user$
      .pipe(
        tap(user => {
          if (user) {
            return true;
          } else {
            this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
            return false;
          }
        }));


  }

}
