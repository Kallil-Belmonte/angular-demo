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

type registerFormErrors = {
  email: string[];
  password: string[];
};

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  isLoading: boolean = false;
  userData: UserModel;
  registerForm: FormGroup;
  registerFormErrors: registerFormErrors = {
    email: [],
    password: [],
  };
  clearFormMessage = clearFormMessage;
  getFieldClass = (formControlName: string, classNames?: string[]) =>
    getFieldClass(this.registerForm, formControlName, classNames);
  hasErrorMessages = (formControlName: string) =>
    hasErrorMessages(this.registerForm, formControlName);
  getErrorMessageClass = (formControlName: string, validations: string[]) =>
    getErrorMessageClass(this.registerForm, formControlName, validations);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.buildRegisterForm();
  }

  //==============================
  // METHODS
  //==============================

  buildRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [required]],
      lastName: ['', [required]],
      email: ['', [required, email]],
      password: ['', [required, minLength(3)]],
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.registerFormErrors.email = [];
    this.registerFormErrors.password = [];

    this.authService.register(this.registerForm.value).subscribe(
      data => {
        if (this.registerForm.get('email').value === 'demo@demo.com') {
          // Error simulation
          this.registerFormErrors.email.push('This e-mail already exists.');
          this.registerFormErrors.password.push('Your password is too weak.');

          this.isLoading = false;
        } else {
          sessionStorage.setItem('authTokenAngularDemo', data.token);

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
