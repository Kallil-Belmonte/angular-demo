import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as UserDataActions from 'app/core/redux/actions/user-data.actions';
import { Utils } from 'app/shared/general/utils';
import { UserModel } from 'app/account/_models/user.model';
import { AuthService } from 'app/auth/auth.service';

type loginFormFeedback = {
  fieldsErrors: {
    email: string[],
    password: string[]
  }
};

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loading: boolean = false;
  userData: UserModel;
  loginForm: FormGroup;
  loginFormFeedback: loginFormFeedback = {
    fieldsErrors: {
      email:    [],
      password: []
    }
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<{userData}>,
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
      email:      ['', [Validators.required, Validators.email]],
      password:   ['', [Validators.required, Validators.minLength(3)]],
      keepLogged: [false]
    });
  }


  // LOGIN FORM

  // On Set Input Class
  onSetInputClass(formControlName, classNames?: string[]): string[] {
    return Utils.setInputClassName(this.loginForm, formControlName, classNames);
  }

  // On Show Field Errors
  onShowFieldErrors(formControlName): boolean {
    return Utils.showFieldErrors(this.loginForm, formControlName);
  }

  // On Set Email First Error Class
  onSetEmailFirstErrorClass(): string[] {
    return Utils.setErrorClassName(this.loginForm.get('email').errors.required);
  }

  // On Set Email Second Error Class
  onSetEmailSecondErrorClass(): string[] {
    return Utils.setErrorClassName(this.loginForm.get('email').errors.email);
  }

  // On Set Password First Error Class
  onSetPasswordFirstErrorClass(): string[] {
    return Utils.setErrorClassName(this.loginForm.get('password').errors.required);
  }

  // On Set Password Second Error Class
  onSetPasswordSecondErrorClass(): string[] {
    return Utils.setErrorClassName(this.loginForm.get('password').errors.email);
  }

  // On Submit
  onSubmit(): void {
    // Activate loader
    this.loading = true;

    if (this.loginForm.get('email').value === 'demo@demo.com') {

      // Error simulation
      this.loginFormFeedback = {
        fieldsErrors: {
          email:    ['This e-mail does not exists.'],
          password: ['The password is incorrect.']
        }
      };

      // Deactivate loader
      this.loading = false;

    } else {

      this.authService.logIn(this.loginForm.value).subscribe(
        data => {
          // Store session data
          if (this.loginForm.get('keepLogged').value) {
            localStorage.setItem('authTokenAngularDemo', data.idToken);
            localStorage.setItem('expirationDateAngularDemo', new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000).toISOString());
          } else {
            sessionStorage.setItem('authTokenAngularDemo', data.idToken);
          }

          // Set user data
          this.userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          };

          this.store.dispatch(new UserDataActions.SetUserData(this.userData));

          // Deactivate loader
          this.loading = false;

          // Redirect
          this.router.navigate(['/']);
        },
        error => {
          console.error(error);

          // Deactivate loader
          this.loading = false;
        }
      );

    }
  }


  // ON CLEAR FORM MESSAGE
  onClearFormMessage(field: string[], index: number): void {
    field.splice(index, 1);
  }

}
