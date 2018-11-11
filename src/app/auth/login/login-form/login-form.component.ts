import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'app/auth/auth.service';

type loginErrors = { email: string[], password: string[] };

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loader: boolean = false;
  loginForm: FormGroup;
  loginErrors: loginErrors = {
    email:    [],
    password: []
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.buildLoginForm();
  }


	//==============================
  // GENERAL METHODS
  //==============================

  // BUILD LOGIN FORM
  buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email:      ['', [Validators.required, Validators.email]],
      password:   ['', [Validators.required, Validators.minLength(3)]],
      keepLogged: [false]
    });
  }


  // ON CLEAR LOGIN ERROR
  onClearLoginError(field, index) {
    field.splice(index, 1);
  }


  // ON SUBMIT LOGIN FORM
  onSubmitLoginForm(): void {
    // Activate loader
    this.loader = true;

    if (this.loginForm.get('email').value === 'demo@demo.com') {

      // Error simulation
      this.loginErrors = {
        email:    ['This e-mail already exists.'],
        password: ['Your password is too weak.']
      };

      // Deactivate loader
      this.loader = false;

    } else {

      this.authService.logIn(this.loginForm.value).subscribe(
        data => {
          // Store session data
          if (this.loginForm.get('keepLogged').value) {
            localStorage.setItem('authTokenAngularDemo', data.idToken);
            localStorage.setItem('expirationDateAngularDemo', new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000).toISOString());
          } else {
            sessionStorage.setItem('authTokenAngularDemo', data.idToken);
          }

          // Deactivate loader
          this.loader = false;

          // Redirect
          this.router.navigate(['/']);
        },
        error => {
          console.log(error);

          // Deactivate loader
          this.loader = false;
        }
      );

    }
  }
}
