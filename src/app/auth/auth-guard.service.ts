import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
              routerStateSnapshot: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let authToken = sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
    let expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateAngularDemo'));

    if (authToken && !expiredSession) {
      return true;
    } else {
      // Remove token
      sessionStorage.removeItem('authTokenReactDemo');
      localStorage.removeItem('authTokenReactDemo');
      localStorage.removeItem('expirationDateAngularDemo');

      // Redirect
      this.router.navigate(['/login']);
    }
  }

}
