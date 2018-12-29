import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Utils } from 'app/shared/general/utils';
import { ThemeFunctions } from 'app/shared/general/theme-functions';
import { ContactService } from 'app/contact/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: []
})
export class ContactFormComponent implements OnInit {

  loading: boolean = true;
  contactForm: FormGroup;
  favoriteColors: string[];
  contactFormSuccessMessage: string;

  constructor(private formBuilder: FormBuilder,
              private contactService: ContactService) { }

  ngOnInit() {
    this.buildContactForm();
    this.getFavoriteColors();
  }

  ngAfterViewInit() {
    ThemeFunctions.jQueryMaskPlugin();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // BUILD CONTACT FORM
  buildContactForm(): void {
    this.contactForm = this.formBuilder.group({
      firstName:     ['', [Validators.required, Validators.minLength(3)]],
      lastName:      ['', [Validators.required]],
      email:         ['', [Validators.required, Validators.email]],
      telephone:     ['', [Validators.required]],
      sex:           [''],
      favoriteColor: ['select'],
      employed:      [false],
      message:       ['', [Validators.required]],
    });
  }


  // GET FAVORITE COLORS
  getFavoriteColors(): void {
    this.contactService.getFavoriteColors().subscribe(
      data => {
        // Data
        this.favoriteColors = data;

        // Deactivate loader
        this.loading = false;
      },
      error => {
        console.error(error);

        // Deactivate loader
        this.loading = false;
      }
    );
  }


  // CONTACT FORM

  // On Set Input Class
  onSetInputClass(formControlName, classNames?: string[]): string[] {
    return Utils.setInputClassName(this.contactForm, formControlName, classNames);
  }

  // On Show Field Errors
  onShowFieldErrors(formControlName): boolean {
    return Utils.showFieldErrors(this.contactForm, formControlName);
  }

  // On Set First Name First Error Class
  onSetFirstNameFirstErrorClass(): string[] {
    return Utils.setErrorClassName(this.contactForm.get('firstName').errors.required);
  }

  // On Set First Name Second Error Class
  onSetFirstNameSecondErrorClass(): string[] {
    return Utils.setErrorClassName(this.contactForm.get('firstName').errors.minlength);
  }

  // On Set Last Name Error Class
  onSetLastNameErrorClass(): string[] {
    return Utils.setErrorClassName(this.contactForm.get('lastName').touched && this.contactForm.get('lastName').invalid);
  }

  // On Set Email First Error Class
  onSetEmailFirstErrorClass(): string[] {
    return Utils.setErrorClassName(this.contactForm.get('email').errors.required);
  }

  // On Set Email Second Error Class
  onSetEmailSecondErrorClass(): string[] {
    return Utils.setErrorClassName(this.contactForm.get('email').errors.email);
  }

  // On Set Telephone Error Class
  onSetTelephoneErrorClass(): string[] {
    return Utils.setErrorClassName(this.contactForm.get('telephone').touched && this.contactForm.get('telephone').invalid);
  }

  // On Set Favorite Color Error Class
  onSetFavoriteColorErrorClass(): string[] {
    return Utils.setErrorClassName(this.contactForm.get('favoriteColor').touched && this.contactForm.get('favoriteColor').value === 'select');
  }

  // On Set Message Error Class
  onSetMessageErrorClass(): string[] {
    return Utils.setErrorClassName(this.contactForm.get('message').touched && this.contactForm.get('message').invalid);
  }

  // On Submit
  onSubmit(): void {
    console.log('Form submitted:', this.contactForm.value);

    // Set success message
    this.contactFormSuccessMessage = 'Message sent successfully.';

    // Reset form
    this.contactForm.reset();
  }


  // ON CLEAR SUCCESS MESSAGE
  onClearSuccessMessage(): void {
    this.contactFormSuccessMessage = null;
  }

}
