import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import * as AccountActions from 'app/core/ngrx/actions/account.actions';
import * as Helpers from 'app/shared/helpers';
import { UserModel } from 'app/account/_models/user.model';
import { AuthService } from 'app/auth/auth.service';

type accountState = {
  userData: UserModel
};

type registerFormFeedback = {
  fieldsErrors: {
    email: string[],
    password: string[]
  }
};

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  loading: boolean = false;
  userData: UserModel;
  registerForm: FormGroup;
  registerFormFeedback: registerFormFeedback = {
    fieldsErrors: {
      email:    [],
      password: []
    }
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<accountState>,
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
      firstName:  ['', [Validators.required]],
      lastName:   ['', [Validators.required]],
      email:      ['', [Validators.required, Validators.email]],
      password:   ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  // REGISTER FORM

  // On Set Input Class
  onSetInputClass(formControlName: string, classNames?: string[]): string[] {
    return Helpers.setFieldClassName(this.registerForm, formControlName, classNames);
  }

  // On Show Field Errors
  onShowFieldErrors(formControlName: string): boolean {
    return Helpers.showFieldErrors(this.registerForm, formControlName);
  }

  // On Set First Name Error Class
  onSetFirstNameErrorClass(): string[] {
    return Helpers.setErrorClassName(this.registerForm.get('firstName').errors.required);
  }

  // On Set Last Name Error Class
  onSetLastNameErrorClass(): string[] {
    return Helpers.setErrorClassName(this.registerForm.get('lastName').errors.required);
  }

  // On Set Email First Error Class
  onSetEmailFirstErrorClass(): string[] {
    return Helpers.setErrorClassName(this.registerForm.get('email').errors.required);
  }

  // On Set Email Second Error Class
  onSetEmailSecondErrorClass(): string[] {
    return Helpers.setErrorClassName(this.registerForm.get('email').errors.email);
  }

  // On Set Password First Error Class
  onSetPasswordFirstErrorClass(): string[] {
    return Helpers.setErrorClassName(this.registerForm.get('password').errors.required);
  }

  // On Set Password Second Error Class
  onSetPasswordSecondErrorClass(): string[] {
    return Helpers.setErrorClassName(this.registerForm.get('password').errors.minlength);
  }

  // On Submit
  onSubmit(): void {
    // Activate loader
    this.loading = true;

    // Clear messages
    this.registerFormFeedback.fieldsErrors.email = [];
    this.registerFormFeedback.fieldsErrors.password = [];

    this.authService.register(this.registerForm.value).subscribe(
      data => {
        if (this.registerForm.get('email').value === 'demo@demo.com') {

          // Error simulation
          this.registerFormFeedback.fieldsErrors.email.push('This e-mail already exists.');
          this.registerFormFeedback.fieldsErrors.password.push('Your password is too weak.');

          // Deactivate loader
          this.loading = false;

        } else {

          // Store session data
          sessionStorage.setItem('authTokenAngularDemo', data.token);

          // Set User Data
          this.userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          };

          // Set data to reducer
          this.store.dispatch(new AccountActions.SetUserData(this.userData));

          // Deactivate loader
          this.loading = false;

          // Redirect
          this.router.navigate(['/']);

        }
      },
      error => {
        console.error(error);

        // Deactivate loader
        this.loading = false;
      }
    );
  }


  // ON CLEAR FORM MESSAGE
  onClearFormMessage(field: string[], index: number): void {
    field.splice(index, 1);
  }

}
