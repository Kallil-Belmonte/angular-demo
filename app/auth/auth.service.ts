import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment, endpoints } from 'environments/environment';
import { LoginModel } from 'app/auth/_models/login.model';

// @Injectable()
export class AuthService {

	constructor(private httpClient: HttpClient) {
	}


	//==============================
  // GENERAL METHODS
  //==============================

	// LOG IN
	logIn(): Observable<LoginModel> {
		return this.httpClient.get<LoginModel>(environment.mocky + endpoints.auth.login);
	}


	// LOG OUT
	logOut(): void {
		window.sessionStorage.clear();
		window.location.replace('/');
	}

}
