import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment, endpoints } from 'environments/environment';
import { LoginModel } from 'app/auth/_models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	constructor(private httpClient: HttpClient) { }

// LOG OUT
logOut(): void {
	window.sessionStorage.clear();
	window.location.replace('/');
}

	//==============================
  // LOGIN
  //==============================

	// LOG IN
	logIn(): Observable<LoginModel> {
		return this.httpClient.get<LoginModel>(environment.mocky + endpoints.auth.login);
	}


	//==============================
  // REGISTER
  //==============================


}
