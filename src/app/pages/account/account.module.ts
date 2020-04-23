import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedModule } from 'app/shared/shared.module';
import { AccountComponent } from 'app/pages/account/account.component';
import { AccountFormComponent } from 'app/pages/account/account-form/account-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
  ],
  declarations: [
    AccountComponent,
    AccountFormComponent,
  ]
})
export class AccountModule { }
