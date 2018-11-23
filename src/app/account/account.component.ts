import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  loading: boolean = true;
  faUser = faUser;
  accountForm: FormGroup;
  accountFormSuccessMessage: string;

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

  }


  // ON CLEAR SUCCESS MESSAGE
  onClearSuccessMessage(): void {
    this.accountFormSuccessMessage = null;
  }
}
