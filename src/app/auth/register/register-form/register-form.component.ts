import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'app/auth/auth.service';

type registerErrors = { email: string[], password: string[] };

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  loading: boolean = false;
  registerForm: FormGroup;
  registerErrors: registerErrors = {
    email:    [],
    password: []
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    console.log('Utilize o e-mail: demo@demo.com para ver os alertas de erro.');
    this.buildRegisterForm();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // BUILD REGISTER FORM
  buildRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName:  ['', [Validators.required]],
      lastName:   ['', [Validators.required]],
      email:      ['', [Validators.required, Validators.email]],
      password:   ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  // ON CLEAR LOGIN ERROR
  onClearRegisterError(field, index) {
    field.splice(index, 1);
  }


  // ON REGISTER LOGIN FORM
  onSubmitRegisterForm(): void {
    // Activate loader
    this.loading = true;

    if (this.registerForm.get('email').value === 'demo@demo.com') {

      // Error simulation
      this.registerErrors = {
        email:    ['This e-mail already exists.'],
        password: ['Your password is too weak.']
      };

      // Deactivate loader
      this.loading = false;

    } else {

      this.authService.register(this.registerForm.value).subscribe(
        data => {
          // Store session data
          sessionStorage.setItem('authTokenAngularDemo', data.token);

          // Deactivate loader
          this.loading = false;

          // Redirect
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);

          // Deactivate loader
          this.loading = false;
        }
      );

    }
  }
}
