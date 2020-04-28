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

type registerFormErrors = {
  email: string[],
  password: string[]
};

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  isLoading: boolean = false;
  userData: UserModel;
  registerForm: FormGroup;
  registerFormErrors: registerFormErrors = {
    email:    [],
    password: []
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<AppState>,
              private authService: AuthService) { }

  ngOnInit() {
    console.log('Utilize o e-mail: demo@demo.com para ver os alertas de erro.');
    this.buildRegisterForm();
  }

	//==============================
  // GENERAL METHODS
  //==============================

  // BUILD REGISTER FORM
  buildRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName:  ['', [required]],
      lastName:   ['', [required]],
      email:      ['', [required, email]],
      password:   ['', [required, minLength(3)]]
    });
  }

  // REGISTER FORM

  // On Set Input Class
  onSetInputClass(formControlName: string, classNames?: string[]): string[] {
    return setFieldClassName(this.registerForm, formControlName, classNames);
  }

  // On Show Field Errors
  onShowFieldErrors(formControlName: string): boolean {
    return showFieldErrors(this.registerForm, formControlName);
  }

  // On Set First Name Error Class
  onSetFirstNameErrorClass(): string[] {
    return setErrorClassName(this.registerForm.get('firstName').errors.required);
  }

  // On Set Last Name Error Class
  onSetLastNameErrorClass(): string[] {
    return setErrorClassName(this.registerForm.get('lastName').errors.required);
  }

  // On Set Email First Error Class
  onSetEmailFirstErrorClass(): string[] {
    return setErrorClassName(this.registerForm.get('email').errors.required);
  }

  // On Set Email Second Error Class
  onSetEmailSecondErrorClass(): string[] {
    return setErrorClassName(this.registerForm.get('email').errors.email);
  }

  // On Set Password First Error Class
  onSetPasswordFirstErrorClass(): string[] {
    return setErrorClassName(this.registerForm.get('password').errors.required);
  }

  // On Set Password Second Error Class
  onSetPasswordSecondErrorClass(): string[] {
    return setErrorClassName(this.registerForm.get('password').errors.minlength);
  }

  // On Submit
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
            email: data.email
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
