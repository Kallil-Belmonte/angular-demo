import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate( ): Observable<boolean> | Promise<boolean> | boolean {
    const authToken = sessionStorage.getItem('authTokenAngularDemo') || localStorage.getItem('authTokenAngularDemo');
    const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateAngularDemo'));

    if (authToken && !expiredSession) {
      return true;
    } else {
      // Remove token
      sessionStorage.removeItem('authTokenAngularDemo');
      localStorage.removeItem('authTokenAngularDemo');
      localStorage.removeItem('expirationDateAngularDemo');

      // Redirect
      this.router.navigate(['/login']);
    }
  }

}
