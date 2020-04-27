import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { environment, endpoints } from 'environments/environment';
import { clearStorageData } from 'app/core/ngrx/reducers/store';
import { LoginModel } from 'app/pages/auth/_models/login.model';
import { RegisterModel } from 'app/pages/auth/_models/register.model';

const { mocky } = environment;
const { auth } = endpoints;

type authPayload = {
  email: string,
  password: string,
  keepLogged: boolean;
};

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
	logIn(payload: authPayload): Observable<LoginModel> {
		return this.httpClient.post<LoginModel>(`${mocky}${auth.login}`, payload);
	}


	//==============================
  // REGISTER
  //==============================

  // REGISTER
  register(payload: authPayload): Observable<RegisterModel> {
    return this.httpClient.post<RegisterModel>(`${mocky}${auth.register}`, payload);
  }


  //==============================
  // HEADER
  //==============================

  // LOG OUT
  logOut(): void {
    clearStorageData();
    this.router.navigate(['/login']);
  }

}
