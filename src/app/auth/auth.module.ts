import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { LoginComponent } from 'app/auth/login/login.component';
import { LoginFormComponent } from 'app/auth/login/login-form/login-form.component';
import { RegisterComponent } from 'app/auth/register/register.component';
import { RegisterFormComponent } from 'app/auth/register/register-form/register-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterFormComponent
  ]
})
export class AuthModule { }
