import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as Helpers from 'app/shared/helpers';
import { ContactService } from 'app/pages/contact/contact.service';

const { required, minLength, email } = Validators;
const { getFieldClass, getFieldErrorMessages, getErrorClass, clearFormMessage } = Helpers;

type contactFormMessages = {
  success: string[];
};

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: [],
})
export class ContactFormComponent implements OnInit {
  isLoading: boolean = true;
  contactForm: FormGroup;
  favoriteColors: string[];
  contactFormMessages: contactFormMessages = {
    success: [],
  };
  clearFormMessage = clearFormMessage;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) {}

  ngOnInit() {
    this.buildContactForm();
    this.getFavoriteColors();
  }

  //==============================
  // GENERAL METHODS
  //==============================

  // BUILD CONTACT FORM
  buildContactForm(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', [required, minLength(3)]],
      lastName: ['', [required]],
      email: ['', [required, email]],
      telephone: ['', [required]],
      sex: ['male'],
      favoriteColor: ['select'],
      employed: [false],
      message: ['', [required]],
    });
  }

  // GET FAVORITE COLORS
  getFavoriteColors(): void {
    this.contactService.getFavoriteColors().subscribe(
      data => {
        this.favoriteColors = data;
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      },
    );
  }

  // CONTACT FORM
  getInputClass(formControlName: string, classNames?: string[]): string[] {
    return getFieldClass(this.contactForm, formControlName, classNames);
  }

  hasErrorMessages(formControlName: string): boolean {
    return getFieldErrorMessages(this.contactForm, formControlName);
  }

  getErrorMessageClass(formControlName: string, validations: string[]): string[] {
    const { errors } = this.contactForm.get(formControlName);
    return getErrorClass(validations.every(key => errors[key]));
  }

  onSubmit(): void {
    console.log('Form submitted:', this.contactForm.value);
    this.contactFormMessages.success.push('Message sent successfully.');
    this.contactForm.reset();
  }
}
