import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs';

import { clearStorageData } from 'app/core/ngrx/reducers/store';

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
      clearStorageData();
      this.router.navigate(['/login']);
    }
  }

}
