import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { environment, endpoints } from 'environments/environment';
import { LoginModel } from 'app/auth/_models/login.model';
import { RegisterModel } from 'app/auth/_models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	constructor(private httpClient: HttpClient,
              private router: Router) { }


	//==============================
  // LOGIN
  //==============================

	// LOG IN
	logIn(payload): Observable<LoginModel> {
		return this.httpClient.post<LoginModel>(environment.mocky + endpoints.auth.login, payload);
	}


	//==============================
  // REGISTER
  //==============================

  // REGISTER
  register(payload): Observable<RegisterModel> {
    return this.httpClient.post<RegisterModel>(environment.mocky + endpoints.auth.register, payload);
  }


  //==============================
  // HEADER
  //==============================

  // LOG OUT
  logOut(): void {
    // Remove token
    sessionStorage.removeItem('authTokenAngularDemo');
    localStorage.removeItem('authTokenAngularDemo');
    localStorage.removeItem('expirationDateAngularDemo');

    // Redirect
    this.router.navigate(['/login']);
  }

}
