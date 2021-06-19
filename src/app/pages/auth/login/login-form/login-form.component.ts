import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as AccountActions from 'app/core/ngrx/actions/account.actions';
import * as Helpers from 'app/shared/helpers';
import { AppState } from 'app/core/ngrx/reducers/store';
import { UserModel } from 'app/pages/account/_models/user.model';
import { AuthService } from 'app/pages/auth/auth.service';

const { required, email, minLength } = Validators;
const { SetUserData } = AccountActions;
const { getFieldClass, hasErrorMessages, getErrorMessageClass, clearFormMessage } = Helpers;

type loginFormErrors = {
  email: string[];
  password: string[];
};

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  isLoading: boolean = false;
  userData: UserModel;
  loginForm: FormGroup;
  loginFormErrors: loginFormErrors = {
    email: [],
    password: [],
  };
  clearFormMessage = clearFormMessage;
  getFieldClass = (formControlName: string, classNames?: string[]) =>
    getFieldClass(this.loginForm, formControlName, classNames);
  hasErrorMessages = (formControlName: string) => hasErrorMessages(this.loginForm, formControlName);
  getErrorMessageClass = (formControlName: string, validations: string[]) =>
    getErrorMessageClass(this.loginForm, formControlName, validations);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.buildLoginForm();
  }

  //==============================
  // METHODS
  //==============================

  buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [required, email]],
      password: ['', [required, minLength(3)]],
      keepLogged: [false],
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.loginFormErrors.email = [];
    this.loginFormErrors.password = [];

    this.authService.logIn(this.loginForm.value).subscribe(
      data => {
        if (this.loginForm.get('email').value === 'demo@demo.com') {
          // Error simulation
          this.loginFormErrors.email.push('This e-mail does not exists.');
          this.loginFormErrors.password.push('The password is incorrect.');

          this.isLoading = false;
        } else {
          if (this.loginForm.get('keepLogged').value) {
            localStorage.setItem('authTokenAngularDemo', data.idToken);
            localStorage.setItem(
              'expirationDateAngularDemo',
              new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000).toISOString(),
            );
          } else {
            sessionStorage.setItem('authTokenAngularDemo', data.idToken);
          }

          this.userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          };
          this.store.dispatch(new SetUserData(this.userData));
          this.isLoading = false;
          this.router.navigate(['/']);
        }
      },
      error => {
        console.error(error);
        this.isLoading = false;
      },
    );
  }
}
