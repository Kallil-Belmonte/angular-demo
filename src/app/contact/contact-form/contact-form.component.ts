import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      firstName:      ['', [Validators.required, Validators.minLength(3)]],
      lastName:       ['', [Validators.required]],
      email:          ['', [Validators.required, Validators.email]],
      telephone:      ['', [Validators.required]],
      sex:            [''],
      favoriteColors: ['select'],
      employed:       [false],
      message:        ['', [Validators.required]],
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


  // ON RESET CONTACT FORM
  onResetContactForm(): void {
    this.contactForm.reset();
  }


  // ON SUBMIT CONTACT FORM
  onSubmitContactForm(): void {
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
