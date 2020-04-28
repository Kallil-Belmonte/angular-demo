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
const { setFieldClassName, showFieldErrors, setErrorClassName } = Helpers;

type loginFormErrors = {
  email: string[],
  password: string[],
};

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  isLoading: boolean = false;
  userData: UserModel;
  loginForm: FormGroup;
  loginFormErrors: loginFormErrors = {
    email:    [],
    password: [],
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<AppState>,
              private authService: AuthService) { }

  ngOnInit() {
    console.log('Utilize o e-mail: demo@demo.com para ver os alertas de erro.');
    this.buildLoginForm();
  }

	//==============================
  // GENERAL METHODS
  //==============================

  // BUILD LOGIN FORM
  buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email:      ['', [required, email]],
      password:   ['', [required, minLength(3)]],
      keepLogged: [false],
    });
  }

  // LOGIN FORM

  // On Set Input Class
  onSetInputClass(formControlName: string, classNames?: string[]): string[] {
    return setFieldClassName(this.loginForm, formControlName, classNames);
  }

  // On Show Field Errors
  onShowFieldErrors(formControlName: string): boolean {
    return showFieldErrors(this.loginForm, formControlName);
  }

  // On Set Email First Error Class
  onSetEmailFirstErrorClass(): string[] {
    return setErrorClassName(this.loginForm.get('email').errors.required);
  }

  // On Set Email Second Error Class
  onSetEmailSecondErrorClass(): string[] {
    return setErrorClassName(this.loginForm.get('email').errors.email);
  }

  // On Set Password First Error Class
  onSetPasswordFirstErrorClass(): string[] {
    return setErrorClassName(this.loginForm.get('password').errors.required);
  }

  // On Set Password Second Error Class
  onSetPasswordSecondErrorClass(): string[] {
    return setErrorClassName(this.loginForm.get('password').errors.email);
  }

  // On Submit
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
            localStorage.setItem('expirationDateAngularDemo', new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000).toISOString());
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
      }
    );
  }

  // ON CLEAR FORM MESSAGE
  onClearFormMessage(field: string[], index: number): void {
    field.splice(index, 1);
  }

}
