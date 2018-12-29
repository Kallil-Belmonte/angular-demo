import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Utils } from 'app/shared/general/utils';

type accountFormFeedback = {
  messages: {
    success: string[],
    error: string[]
  },
  fieldsErrors: {
    email: string[]
  }
};

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: []
})
export class AccountFormComponent implements OnInit {

  faUser = faUser;
  accountForm: FormGroup;
  accountFormFeedback: accountFormFeedback = {
    messages: {
      success: [],
      error: []
    },
    fieldsErrors: {
      email: []
    }
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildAccountForm();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // BUILD ACCOUNT FORM
  buildAccountForm(): void {
    this.accountForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName:  ['', [Validators.required]],
      email:     ['', [Validators.required, Validators.email]]
    });
  }


  // ACCOUNT FORM

  // On Set Input Class
  onSetInputClass(formControlName, classNames?: string[]): string[] {
    return Utils.setInputClassName(this.accountForm, formControlName, classNames);
  }

  // On Show Field Errors
  onShowFieldErrors(formControlName): boolean {
    return Utils.showFieldErrors(this.accountForm, formControlName);
  }

  // On Set First Name First Error Class
  onSetFirstNameFirstErrorClass(): string[] {
    return Utils.setErrorClassName(this.accountForm.get('firstName').errors.required);
  }

  // On Set First Name Second Error Class
  onSetFirstNameSecondErrorClass(): string[] {
    return Utils.setErrorClassName(this.accountForm.get('firstName').errors.minlength);
  }

  // On Set Last Name Error Class
  onSetLastNameErrorClass(): string[] {
    return Utils.setErrorClassName(this.accountForm.get('lastName').touched && this.accountForm.get('lastName').invalid);
  }

  // On Set Email First Error Class
  onSetEmailFirstErrorClass(): string[] {
    return Utils.setErrorClassName(this.accountForm.get('email').errors.required);
  }

  // On Set Email Second Error Class
  onSetEmailSecondErrorClass(): string[] {
    return Utils.setErrorClassName(this.accountForm.get('email').errors.email);
  }

  // On Submit
  onSubmit(): void {
    if (this.accountForm.value.email === 'john.doe@email.com') {
      // Set field error messages
      this.accountFormFeedback.fieldsErrors.email.push('This e-mail already exists.');
    }
    else if (this.accountForm.value.email === 'demo@demo.com') {
      // Set error messages
      this.accountFormFeedback.messages.error.push('An error occurred, please try again later.');
    }
    else {
      // Handle edit account
      // this.props.handleEditAccount(values);

      // Set success message
      this.accountFormFeedback.messages.success.push('Account saved successfully.');
    }
  }


  // ON CLEAR FORM MESSAGE
  onClearFormMessage(field: string[], index: number): void {
    field.splice(index, 1);
  }

}
