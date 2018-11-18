import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from 'app/account/account.component';
import { AccountFormComponent } from 'app/account/account-form/account-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AccountComponent,
    AccountFormComponent
  ]
})
export class AccountModule { }
