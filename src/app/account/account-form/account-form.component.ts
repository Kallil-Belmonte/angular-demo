import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faUser } from '@fortawesome/free-solid-svg-icons';

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


  // ON RESET ACCOUNT FORM
  onResetAccountForm(): void {
    this.accountForm.reset();
  }


  // ON SUBMIT ACCOUNT FORM
  onSubmitAccountForm() {
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
