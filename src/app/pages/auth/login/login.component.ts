import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Para logar utilize qualquer e-mail e senha.');
    console.log('Para ver os alertas de erro utilize o e-mail: demo@demo.com');
    this.redirectUser();
  }

  //==============================
  // GENERAL METHODS
  //==============================

  // REDIRECT USER
  redirectUser(): void {
    const authToken =
      sessionStorage.getItem('authTokenAngularDemo') ||
      localStorage.getItem('authTokenAngularDemo');
    const expiredSession =
      new Date().getTime() > Date.parse(localStorage.getItem('expirationDateAngularDemo'));

    if (authToken && !expiredSession) {
      this.router.navigate(['/']);
    }
  }
}
