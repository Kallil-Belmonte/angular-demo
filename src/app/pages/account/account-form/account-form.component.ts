import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import * as AccountActions from 'app/core/ngrx/actions/account.actions';
import * as Helpers from 'app/shared/helpers';
import { AppState } from 'app/core/ngrx/reducers/store';
import { UserModel } from 'app/pages/account/_models/user.model';

const { required, minLength, email } = Validators;
const { EditUserData } = AccountActions;
const { setFieldClassName, getFieldErrorMessages, setErrorClassName } = Helpers;

type accountFormMessages = {
  success: string[],
  error: string[],
};

type accountFormErrors = {
  email: string[],
}

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: []
})
export class AccountFormComponent implements OnInit {

  faUser = faUser;
  userData: UserModel;
  accountForm: FormGroup;
  accountFormMessages: accountFormMessages = {
    success: [],
    error: [],
  };
  accountFormErrors: accountFormErrors = {
    email: [],
  };

  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.buildAccountForm();
    this.getUserData();
  }

	//==============================
  // GENERAL METHODS
  //==============================

  // BUILD ACCOUNT FORM
  buildAccountForm(): void {
    this.accountForm = this.formBuilder.group({
      firstName: ['', [required, minLength(3)]],
      lastName:  ['', [required]],
      email:     ['', [required, email]],
    });
  }

  // GET USER DATA
  getUserData(): void {
    this.store.pipe(select((state: AppState) => state)).subscribe(
      ({ userData }) => {
        this.accountForm.setValue(userData);
      }
    );
  }

  // ACCOUNT FORM

  // On Set Input Class
  onSetInputClass(formControlName: string, classNames?: string[]): string[] {
    return setFieldClassName(this.accountForm, formControlName, classNames);
  }

  // On Show Field Errors
  onGetFieldErrorMessages(formControlName: string): boolean {
    return getFieldErrorMessages(this.accountForm, formControlName);
  }

  // On Set First Name First Error Class
  onSetFirstNameFirstErrorClass(): string[] {
    return setErrorClassName(this.accountForm.get('firstName').errors.required);
  }

  // On Set First Name Second Error Class
  onSetFirstNameSecondErrorClass(): string[] {
    return setErrorClassName(this.accountForm.get('firstName').errors.minlength);
  }

  // On Set Last Name Error Class
  onSetLastNameErrorClass(): string[] {
    return setErrorClassName(this.accountForm.get('lastName').touched && this.accountForm.get('lastName').invalid);
  }

  // On Set Email First Error Class
  onSetEmailFirstErrorClass(): string[] {
    return setErrorClassName(this.accountForm.get('email').errors.required);
  }

  // On Set Email Second Error Class
  onSetEmailSecondErrorClass(): string[] {
    return setErrorClassName(this.accountForm.get('email').errors.email);
  }

  // On Submit
  onSubmit(): void {
    const { value } = this.accountForm;
    this.accountFormMessages.success = [];
    this.accountFormMessages.error = [];
    this.accountFormErrors.email = [];

    if (value.email === 'john.doe@email.com') {
      this.accountFormErrors.email.push('This e-mail already exists.');
    }
    else if (value.email === 'demo@demo.com') {
      this.accountFormMessages.error.push('An error occurred, please try again later.');
    }
    else {
      this.userData = this.accountForm.value;
      this.store.dispatch(new EditUserData(this.userData));
      this.accountFormMessages.success.push('Account saved successfully.');
    }
  }

  // ON CLEAR FORM MESSAGE
  onClearFormMessage(field: string[], index: number): void {
    field.splice(index, 1);
  }

}
