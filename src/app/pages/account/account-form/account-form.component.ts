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
const { getFieldClass, getErrorClass, getFieldErrorMessages, clearFormMessage } = Helpers;

type accountFormMessages = {
  success: string[];
  error: string[];
};

type accountFormErrors = {
  email: string[];
};

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: [],
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
  clearFormMessage = clearFormMessage;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {}

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
      lastName: ['', [required]],
      email: ['', [required, email]],
    });
  }

  // GET USER DATA
  getUserData(): void {
    this.store.pipe(select((state: AppState) => state)).subscribe(({ userData }) => {
      this.accountForm.setValue(userData);
    });
  }

  // ACCOUNT FORM
  getInputClass(formControlName: string, classNames?: string[]): string[] {
    return getFieldClass(this.accountForm, formControlName, classNames);
  }

  hasErrorMessages(formControlName: string): boolean {
    return getFieldErrorMessages(this.accountForm, formControlName);
  }

  getErrorMessageClass(formControlName: string, validations: string[]): string[] {
    const { errors } = this.accountForm.get(formControlName);
    return getErrorClass(validations.every(key => errors[key]));
  }

  onSubmit(): void {
    const { value } = this.accountForm;
    this.accountFormMessages.success = [];
    this.accountFormMessages.error = [];
    this.accountFormErrors.email = [];

    if (value.email === 'john.doe@email.com') {
      this.accountFormErrors.email.push('This e-mail already exists.');
    } else if (value.email === 'demo@demo.com') {
      this.accountFormMessages.error.push('An error occurred, please try again later.');
    } else {
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
