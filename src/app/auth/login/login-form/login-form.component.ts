import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'app/auth/auth.service';

type loginFormFeedback = {
  fieldsErrors: {
    email: string[],
    password: string[]
  }
};

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loading: boolean = false;
  loginForm: FormGroup;
  loginFormFeedback: loginFormFeedback = {
    fieldsErrors: {
      email:    [],
      password: []
    }
  };

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    console.log('Utilize o e-mail: demo@demo.com para ver os alertas de erro.');
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


  // ON SUBMIT LOGIN FORM
  onSubmitLoginForm(): void {
    // Activate loader
    this.loading = true;

    if (this.loginForm.get('email').value === 'demo@demo.com') {

      // Error simulation
      this.loginFormFeedback = {
        fieldsErrors: {
          email:    ['This e-mail does not exists.'],
          password: ['The password is incorrect.']
        }
      };

      // Deactivate loader
      this.loading = false;

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


  // ON CLEAR FORM MESSAGE
  onClearFormMessage(field: string[], index: number): void {
    field.splice(index, 1);
  }

}
