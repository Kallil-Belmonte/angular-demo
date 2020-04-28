import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as Helpers from 'app/shared/helpers';
import { ContactService } from 'app/pages/contact/contact.service';

const { required, minLength, email } = Validators;
const { setFieldClassName, showFieldErrors, setErrorClassName } = Helpers;

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: []
})
export class ContactFormComponent implements OnInit {

  isLoading: boolean = true;
  contactForm: FormGroup;
  favoriteColors: string[];
  contactFormSuccessMessage: string;

  constructor(private formBuilder: FormBuilder,
              private contactService: ContactService) { }

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
      firstName:     ['', [required, minLength(3)]],
      lastName:      ['', [required]],
      email:         ['', [required, email]],
      telephone:     ['', [required]],
      sex:           [''],
      favoriteColor: ['select'],
      employed:      [false],
      message:       ['', [required]],
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
      }
    );
  }

  // CONTACT FORM

  // On Set Input Class
  onSetInputClass(formControlName: any, classNames?: string[]): string[] {
    return setFieldClassName(this.contactForm, formControlName, classNames);
  }

  // On Show Field Errors
  onShowFieldErrors(formControlName: any): boolean {
    return showFieldErrors(this.contactForm, formControlName);
  }

  // On Set First Name First Error Class
  onSetFirstNameFirstErrorClass(): string[] {
    return setErrorClassName(this.contactForm.get('firstName').errors.required);
  }

  // On Set First Name Second Error Class
  onSetFirstNameSecondErrorClass(): string[] {
    return setErrorClassName(this.contactForm.get('firstName').errors.minlength);
  }

  // On Set Last Name Error Class
  onSetLastNameErrorClass(): string[] {
    return setErrorClassName(this.contactForm.get('lastName').touched && this.contactForm.get('lastName').invalid);
  }

  // On Set Email First Error Class
  onSetEmailFirstErrorClass(): string[] {
    return setErrorClassName(this.contactForm.get('email').errors.required);
  }

  // On Set Email Second Error Class
  onSetEmailSecondErrorClass(): string[] {
    return setErrorClassName(this.contactForm.get('email').errors.email);
  }

  // On Set Telephone Error Class
  onSetTelephoneErrorClass(): string[] {
    return setErrorClassName(this.contactForm.get('telephone').touched && this.contactForm.get('telephone').invalid);
  }

  // On Set Favorite Color Error Class
  onSetFavoriteColorErrorClass(): string[] {
    return setErrorClassName(this.contactForm.get('favoriteColor').touched && this.contactForm.get('favoriteColor').value === 'select');
  }

  // On Set Message Error Class
  onSetMessageErrorClass(): string[] {
    return setErrorClassName(this.contactForm.get('message').touched && this.contactForm.get('message').invalid);
  }

  // On Submit
  onSubmit(): void {
    console.log('Form submitted:', this.contactForm.value);
    this.contactFormSuccessMessage = 'Message sent successfully.';
    this.contactForm.reset();
  }

  // ON CLEAR SUCCESS MESSAGE
  onClearSuccessMessage(): void {
    this.contactFormSuccessMessage = null;
  }

}
