import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { StorageMap } from '@ngx-pwa/local-storage';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import * as AccountActions from 'app/core/ngrx/actions/account.actions';
import * as Helpers from 'app/shared/helpers';
import { UserModel } from 'app/account/_models/user.model';

type accountState = {
  userData: UserModel,
};

type accountFormFeedback = {
  messages: {
    success: string[],
    error: string[],
  },
  fieldsErrors: {
    email: string[],
  }
};

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: []
})
export class AccountFormComponent implements OnInit {

  faUser = faUser;
  userData: UserModel;
  accountForm: FormGroup;
  accountFormFeedback: accountFormFeedback = {
    messages: {
      success: [],
      error: [],
    },
    fieldsErrors: {
      email: [],
    },
  };

  constructor(private formBuilder: FormBuilder,
              private store: Store<accountState>,
              private storage: StorageMap) { }

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
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName:  ['', [Validators.required]],
      email:     ['', [Validators.required, Validators.email]],
    });
  }


  // GET USER DATA
  getUserData(): void {
    // Get User Data Reducer from local storage
    this.storage.get('userData').subscribe(
      (userData: UserModel) => {
        this.accountForm.setValue(userData);
      }
    );
  }


  // ACCOUNT FORM

  // On Set Input Class
  onSetInputClass(formControlName: string, classNames?: string[]): string[] {
    return Helpers.setInputClassName(this.accountForm, formControlName, classNames);
  }

  // On Show Field Errors
  onShowFieldErrors(formControlName: string): boolean {
    return Helpers.showFieldErrors(this.accountForm, formControlName);
  }

  // On Set First Name First Error Class
  onSetFirstNameFirstErrorClass(): string[] {
    return Helpers.setErrorClassName(this.accountForm.get('firstName').errors.required);
  }

  // On Set First Name Second Error Class
  onSetFirstNameSecondErrorClass(): string[] {
    return Helpers.setErrorClassName(this.accountForm.get('firstName').errors.minlength);
  }

  // On Set Last Name Error Class
  onSetLastNameErrorClass(): string[] {
    return Helpers.setErrorClassName(this.accountForm.get('lastName').touched && this.accountForm.get('lastName').invalid);
  }

  // On Set Email First Error Class
  onSetEmailFirstErrorClass(): string[] {
    return Helpers.setErrorClassName(this.accountForm.get('email').errors.required);
  }

  // On Set Email Second Error Class
  onSetEmailSecondErrorClass(): string[] {
    return Helpers.setErrorClassName(this.accountForm.get('email').errors.email);
  }

  // On Submit
  onSubmit(): void {
    // Clear messages
    this.accountFormFeedback.messages.success = [];
    this.accountFormFeedback.messages.error = [];
    this.accountFormFeedback.fieldsErrors.email = [];

    if (this.accountForm.value.email === 'john.doe@email.com') {
      // Set field error messages
      this.accountFormFeedback.fieldsErrors.email.push('This e-mail already exists.');
    }
    else if (this.accountForm.value.email === 'demo@demo.com') {
      // Set error messages
      this.accountFormFeedback.messages.error.push('An error occurred, please try again later.');
    }
    else {
      // Update User Data
      this.userData = this.accountForm.value;

      // Set data to reducer
      this.store.dispatch(new AccountActions.EditUserData(this.userData));

      // Set success message
      this.accountFormFeedback.messages.success.push('Account saved successfully.');
    }
  }


  // ON CLEAR FORM MESSAGE
  onClearFormMessage(field: string[], index: number): void {
    field.splice(index, 1);
  }

}
