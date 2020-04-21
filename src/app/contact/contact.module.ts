import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule } from 'ngx-mask'

import { SharedModule } from 'app/shared/shared.module';
import { ContactComponent } from 'app/contact/contact.component';
import { ContactFormComponent } from 'app/contact/contact-form/contact-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
    SharedModule,
  ],
  declarations: [
    ContactComponent,
    ContactFormComponent,
  ]
})
export class ContactModule { }
